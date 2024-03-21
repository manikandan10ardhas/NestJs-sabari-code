import { Test, TestingModule } from '@nestjs/testing';
import * as argon from 'argon2';
jest.mock('@core/jwt/generateToken', () => {
  return {
    default: jest.fn().mockResolvedValueOnce('token')
  };
});

jest.mock('@core/jwt/verifyOtpToken', () => ({
  default: jest.fn().mockResolvedValueOnce('')
}));

import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { loginSchema } from '../../../../test/_mocks_/user';
import { ROLES } from '../../../constants';
import { UserRepository } from '@modules/api/v1/user/user.repository';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  const mockArgon = {
    hash: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => ({ jwt: { secret: 'secret' } }))
          }
        },
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            getUser: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
            getUserRoledetails: jest.fn(),
            getUsers: jest.fn(),
            getMe: jest.fn(),
            createUserRoles: jest.fn(),
            getUsercount: jest.fn(),
            getUserInfo: jest.fn(),
            createUserByToken: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signin... It should return a user details', async () => {
    const payload = loginSchema;

    jest.spyOn(userRepository, 'getUserRoledetails').mockResolvedValueOnce({
      id: 1,
      uid: 'abc',
      password: 'password',
      userRole: {
        id: 1,
        roleId: ROLES.USER
      }
    });
    jest.spyOn(argon, 'verify').mockResolvedValueOnce(true);
    jest.spyOn(service, 'signToken').mockResolvedValueOnce('');
    jest.spyOn(service, 'signToken').mockResolvedValueOnce('');

    expect(await service.signin(payload)).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(String)
      })
    );
  });

  it('signup... It should return a user details', async () => {
    const payload = loginSchema;

    jest.spyOn(argon, 'hash').mockResolvedValueOnce('hash');
    jest.spyOn(userRepository, 'create').mockResolvedValueOnce({
      id: 1,
      uid: 'abc'
    });
    jest.spyOn(userRepository, 'createUserRoles');
    jest.spyOn(service, 'signToken').mockResolvedValueOnce('');
    jest.spyOn(service, 'signToken').mockResolvedValueOnce('');

    expect(await service.signup(payload)).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(String)
      })
    );
  });

  it('getUsers... It should return a list of users', async () => {
    jest.spyOn(userRepository, 'getUsers').mockResolvedValueOnce({
      count: 1,
      rows: [
        {
          id: 1,
          uid: 'abc'
        }
      ]
    } as any);

    await service.findAll({});
    expect(userRepository.getUsers).toBeCalledTimes(1);
  });

  it('signToken... It should return a user details', async () => {
    jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('');
    expect(typeof (await service.signToken({ userId: 1, roles: [ROLES.USER], secret: '', expiresIn: 100 }))).toEqual(
      'string'
    );
  });

  it('loginSecret... should return token expiry', async () => {
    const payload = { email: 'anc@mail.com' };
    jest.spyOn(userRepository, 'getUser').mockResolvedValueOnce({ id: 1, email: 'abc@mail.com' });
    jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('');

    expect(typeof (await service.loginSecret(payload))).not.toEqual(null);
    expect(userRepository.getUser).toBeCalledTimes(1);
    expect(userRepository.update).toBeCalledTimes(1);
  });

  it('login... should return user and token details', async () => {
    const payload = { email: 'abc@mail.com', code: 111111 };
    jest.spyOn(userRepository, 'getUser').mockResolvedValueOnce({ id: 1, email: 'abc@mail.com', authToken: 'authToken' });

    jest.spyOn(userRepository, 'getUserRoledetails').mockResolvedValueOnce({
      id: 1,
      uid: 'abc',
      authToken: 'authToken',
      userRole: {
        id: 1,
        roleId: ROLES.USER
      }
    });
    jest.spyOn(service, 'signToken').mockResolvedValueOnce('');
    jest.spyOn(service, 'signToken').mockResolvedValueOnce('');

    expect(typeof (await service.login(payload))).not.toEqual(null);
    expect(userRepository.getUser).toBeCalledTimes(2);
    expect(userRepository.update).toBeCalledTimes(1);
  });

  it('refreshToken... It should return a token', async () => {
    const payload = { refreshToken: 'Bearer token', isStation: false };

    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce({ id: 1 });

    jest.spyOn(userRepository, 'getUserRoledetails').mockResolvedValueOnce({
      id: 1,
      uid: 'abc',
      password: 'password',
      userRole: {
        id: 1,
        roleId: ROLES.USER
      }
    });
    jest.spyOn(service, 'signToken').mockResolvedValueOnce('');

    expect(
      typeof (await service.refreshToken({
        dto: payload
      }))
    ).toEqual('object');
  });

  it('refreshToken... should throw error if id is not present in token', async () => {
    const payload = { refreshToken: 'Bearer token', isStation: false };

    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce({});

    await expect(service.refreshToken({ dto: payload })).rejects.toThrow(UnauthorizedException);
  });
});
