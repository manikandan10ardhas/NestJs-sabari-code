import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import * as JWT from 'jsonwebtoken';
import { UniqueConstraintError } from 'sequelize';

import { sendLoginSecretEmail } from './auth.mail';
import { ListUsersDto, LoginDto, LoginSecretDto, OTPLoginDto, RefreshTokenDto, SignUpDto } from './dto';
import { AUTH_SCHEME_NAME, OTP, ROLES, USER_STATUS } from '@constants/index';
import { verifyOtpToken } from '@core/jwt';
import { validateIsActiveUserAccount } from '@core/utils';
import {
  DateFormat,
  addPeriodToDate,
  diffDateFrom,
  getCurrentDate,
  getCurrentMillis,
  parseDateFromMillis,
  parseDateToMillis
} from '@helpers/date-helper';
import { sec2time } from '@helpers/util';
import { UserRepository } from '@modules/api/v1/user/user.repository';
import { IUserAttributes } from '@repo/sequelize/models/';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private secretToken;

  private secretTokenExpiresIn;

  private secretRefreshToken;

  private secretRefreshTokenExpiresIn;

  private userNotFound = 'translations.auth.errors.USER_NOT_FOUND';

  constructor(private config: ConfigService, private jwt: JwtService, private userRepository: UserRepository) {
    this.secretToken = this.config.get('jwt.secret');
    this.secretTokenExpiresIn = +this.config.get('jwt.secretTokenExpiresIn');
    this.secretRefreshToken = this.config.get('jwt.secretRefreshToken');
    this.secretRefreshTokenExpiresIn = +this.config.get('jwt.secretRefreshTokenExpiresIn');
  }

  async signin(dto: LoginDto) {
    const user: IUserAttributes | null = await this.userRepository.getUserRoledetails({
      email: dto.email,
      roleId: ROLES.ADMIN
    });

    if (!user || (user && !user.password)) {
      throw new NotFoundException(this.userNotFound);
    }

    if (!user?.userRole?.roleId) {
      throw new NotFoundException('translations.auth.errors.USER_ROLE_NOT_FOUND');
    }

    const pwMatches = await argon.verify(user.password as string, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('translations.auth.errors.INCORRECT_PASSWORD');

    this.logger.log({
      fn: 'signin',
      resp: 'success',
      userId: user.id
    });

    const token = await this.signToken({
      userId: user.id as number,
      roles: [user.userRole.roleId],
      secret: this.secretToken,
      expiresIn: this.secretTokenExpiresIn
    });
    const refreshToken = await this.signToken({
      userId: user.id as number,
      roles: [user.userRole.roleId],
      secret: this.secretRefreshToken,
      expiresIn: this.secretRefreshTokenExpiresIn
    });
    return { token, refreshToken };
  }

  async signup(dto: SignUpDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.userRepository.create({
        email: dto.email,
        password: hash
      });

      await this.userRepository.createUserRoles({
        userId: user?.id as number,
        roleId: ROLES.ADMIN
      });

      const token = await this.signToken({
        userId: user.id as number,
        roles: [ROLES.ADMIN],
        secret: this.secretToken,
        expiresIn: this.secretTokenExpiresIn
      });
      const refreshToken = await this.signToken({
        userId: user.id as number,
        roles: [ROLES.ADMIN],
        secret: this.secretRefreshToken,
        expiresIn: this.secretRefreshTokenExpiresIn
      });
      return { token, refreshToken };
    } catch (error) {
      this.logger.error(error);

      if (error instanceof UniqueConstraintError) {
        throw new ForbiddenException('translations.auth.errors.EMAIL_EXIST');
      }
      throw error;
    }
  }

  async loginSecret({ email }: LoginSecretDto) {
    try {
      let user = null;
      let otp = 111;
      const isMaxUse = Math.abs(OTP.secretOTPMaxReuse);
      const expiresIn = sec2time(OTP.secretOTPExpiresIn);
      let token = null;

      user = await this.userRepository.getUser({ email });

      if (!user) {
        const newRecord = await this.userRepository.create({
          email
        });

        await this.userRepository.createUserRoles({
          userId: newRecord?.id as number,
          roleId: ROLES.ADMIN
        });

        if (newRecord) {
          user = await this.userRepository.getUser({ email });
        }
      }

      if (!user) {
        throw new Error(this.userNotFound);
      }

      const expiredSeconds = user?.resendToken
        ? diffDateFrom({ inputDt: user.resendToken as unknown as Date, period: 'seconds' })
        : 0;

      if (expiredSeconds && Math.floor(expiredSeconds) > 0 && Math.abs(expiredSeconds) < Math.abs(OTP.secretOTPExpiresIn)) {
        throw new Error(`Resend code after waiting for ${sec2time(expiredSeconds)}`);
      }

      const jwtHash = (await verifyOtpToken({ token: user.authToken as string, validateIsFalse: true })) as {
        otp: number;
        reissueUntil: number;
      };
      const currentTime = getCurrentMillis();

      let reissueUntil = parseDateToMillis({
        inputDt: addPeriodToDate({
          period: 'seconds',
          value: isMaxUse,
          date: parseDateFromMillis({ inputMillis: currentTime })
        }) as string
      });

      if (jwtHash?.otp && jwtHash?.reissueUntil > 0 && jwtHash?.reissueUntil > currentTime) {
        otp = jwtHash.otp;
        reissueUntil = jwtHash.reissueUntil;
      } else {
        otp = this.config.get('staticOtp') as number;

        //Generate Token
        const tokenInfo: string = await this.jwt.signAsync(
          {
            otp,
            reissueUntil
          },
          {
            expiresIn: OTP.secretOTPExpiresIn,
            secret: this.secretToken
          }
        );

        token = tokenInfo.replace(`${AUTH_SCHEME_NAME}`, '');
      }

      const dbUpdate: IUserAttributes = {
        resendToken: addPeriodToDate({ period: 'seconds', value: OTP.resendCode }) as unknown as Date
      };

      if (token) {
        dbUpdate.authToken = token;
      }

      await this.userRepository.update({
        data: dbUpdate as unknown as Record<string, unknown>,
        options: { uid: user.uid }
      });

      //Send mail to User
      await sendLoginSecretEmail({
        email,
        data: {
          otp,
          base_url: '',
          expiresIn: `${parseDateFromMillis({ inputMillis: reissueUntil, format: DateFormat.FORMAT_THREE })} (UTC)`
        }
      });
      return { otp, expiresIn };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async login({ email, code }: OTPLoginDto) {
    try {
      const userRow: IUserAttributes = (await this.userRepository.getUser({ email })) as unknown as IUserAttributes;
      //Validate User
      await validateIsActiveUserAccount(userRow);

      if (!userRow.authToken) {
        throw new Error('translations.auth.errors.INVALID_OTP');
      }
      await verifyOtpToken({ token: userRow.authToken, code: +code, secretOrKey: this.secretToken });

      const updateuserData: IUserAttributes = {
        authToken: '',
        resendToken: null as unknown as Date,
        lastLoginDate: getCurrentDate({ format: DateFormat.FORMAT_TWO }) as unknown as Date
      };

      if (!userRow.emailVerified) {
        updateuserData.emailVerified = 1;
      }

      if (userRow.status === USER_STATUS.PENDING) {
        updateuserData.status = USER_STATUS.ACTIVE;
      }

      const data = { uid: '' };
      data.uid = userRow?.uid ?? data.uid;
      const userDetails: IUserAttributes | null = await this.userRepository.getUserRoledetails({
        id: userRow.id
      });

      if (!userDetails) {
        throw new NotFoundException(this.userNotFound);
      }

      if (!userDetails?.userRole?.roleId) {
        throw new NotFoundException('translations.auth.errors.USER_ROLE_NOT_FOUND');
      }
      const token = await this.signToken({
        userId: userDetails.id as number,
        roles: [userDetails.userRole.roleId as number],
        secret: this.secretToken,
        expiresIn: this.secretTokenExpiresIn
      });
      const refreshToken = await this.signToken({
        userId: userDetails.id as number,
        roles: [userDetails.userRole.roleId],
        secret: this.secretRefreshToken,
        expiresIn: this.secretRefreshTokenExpiresIn
      });

      await this.userRepository.update({
        data: updateuserData as unknown as Record<string, unknown>,
        options: {
          uid: `${userRow.uid}`
        }
      });

      const user = await this.userRepository.getUser({
        uid: data.uid
      });

      return { user, token, refreshToken };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll({ limit, page }: ListUsersDto) {
    return this.userRepository.getUsers({ limit, page });
  }

  async signToken({
    userId,
    roles,
    secret,
    expiresIn
  }: {
    userId?: number;
    roles?: number[];
    secret?: string;
    expiresIn?: number;
  }) {
    const payload = {
      id: userId,
      roles
    };

    return this.jwt.signAsync(payload, {
      expiresIn,
      secret: secret
    });
  }

  async refreshToken({ dto }: { dto: RefreshTokenDto }) {
    const secret: string = this.secretToken,
      refreshSecret: string = this.secretRefreshToken;
    const options: Record<string, unknown> = {};
    options.roleId = ROLES.ADMIN;

    const [, token] = dto.refreshToken?.split(' ') ?? [];
    const result = await this.jwt
      .verifyAsync(token, {
        secret: refreshSecret
      })
      .catch((error) => {
        if (
          error instanceof JWT.JsonWebTokenError ||
          error instanceof JWT.NotBeforeError ||
          error instanceof JWT.TokenExpiredError
        ) {
          throw new UnauthorizedException(
            'translations.auth.errors.JWT_EXPIRED.TITLE',
            'translations.auth.errors.JWT_EXPIRED.MESSAGE'
          );
        }
      });

    if (!result.id) {
      throw new UnauthorizedException(
        'translations.auth.errors.JWT_EXPIRED.TITLE',
        'translations.auth.errors.JWT_EXPIRED.MESSAGE'
      );
    }

    const user: IUserAttributes | null = await this.userRepository.getUserRoledetails({ ...options, id: result.id });
    if (!user || (user && !user?.userRole?.roleId)) {
      throw new NotFoundException(
        'translations.user.errors.USER_NOT_EXIST.TITLE',
        'translations.user.errors.USER_NOT_EXIST.MESSAGE'
      );
    }
    if (!user?.userRole?.roleId) {
      throw new NotFoundException(
        'translations.user.errors.USER_ROLE_NOT_EXIST.TITLE',
        'translations.user.errors.USER_ROLE_NOT_EXIST.MESSAGE'
      );
    }

    const response = await this.signToken({
      userId: user.id as number,
      roles: [user.userRole.roleId],
      secret,
      expiresIn: this.secretTokenExpiresIn
    });
    return { token: response };
  }
}
