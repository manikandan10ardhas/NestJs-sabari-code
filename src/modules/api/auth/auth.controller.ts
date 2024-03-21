import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  ListUsersDto,
  LoginDto,
  LoginSecretDto,
  OTPLoginDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  SignUpDto
} from './dto';
import { otpLoginSchema } from './schema/route.schema';
import { ForBiddenExceptionFilter, NotFoundExceptionFilter, UnauthorizedExceptionFilter } from '../../../filters/';
import { ROLES } from '@constants/index';
import { GetUser } from '@core/decorator/index';
import { Roles } from '@core/decorator/roles.decorator';
import { AuthGuard } from '@core/guard/auth.guard';
import { RolesGuard } from '@core/guard/role.guard';
import { getSwaggerErrorResponseSchema, getSwaggerSuccessPaginationResponseSchema } from '@core/swagger/';
import { ValidatorPipe } from '@helpers/joi-validation.pipe';

@ApiTags('Auth')
@Controller()
@UseFilters(ForBiddenExceptionFilter)
@UseFilters(UnauthorizedExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Jwt token as a response'
  })
  @ApiForbiddenResponse(
    getSwaggerErrorResponseSchema({ description: `${HttpStatus.FORBIDDEN} Forbidden`, statusCode: HttpStatus.FORBIDDEN })
  )
  @ApiBadRequestResponse(
    getSwaggerErrorResponseSchema({
      description: `${HttpStatus.BAD_REQUEST} Bad Request`,
      statusCode: HttpStatus.BAD_REQUEST
    })
  )
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseFilters(NotFoundExceptionFilter)
  @ApiOkResponse({
    description: 'Jwt token as a response'
  })
  @ApiForbiddenResponse(
    getSwaggerErrorResponseSchema({ description: `${HttpStatus.FORBIDDEN} Forbidden`, statusCode: HttpStatus.FORBIDDEN })
  )
  @ApiNotFoundResponse(
    getSwaggerErrorResponseSchema({ description: `${HttpStatus.NOT_FOUND} Not Found`, statusCode: HttpStatus.NOT_FOUND })
  )
  @ApiBadRequestResponse(
    getSwaggerErrorResponseSchema({
      description: `${HttpStatus.BAD_REQUEST} Bad Request`,
      statusCode: HttpStatus.BAD_REQUEST
    })
  )
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }

  @ApiExcludeEndpoint(true)
  @Post('login-secret')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'OTP expiry duration as response'
  })
  @ApiBadRequestResponse(
    getSwaggerErrorResponseSchema({
      description: `${HttpStatus.BAD_REQUEST} Bad Request`,
      statusCode: HttpStatus.BAD_REQUEST
    })
  )
  loginSecret(@Body() dto: LoginSecretDto) {
    return this.authService.loginSecret(dto);
  }

  @ApiExcludeEndpoint(true)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidatorPipe(otpLoginSchema))
  @ApiOkResponse({
    description: 'JWT token as response'
  })
  login(@Body() dto: OTPLoginDto) {
    return this.authService.login(dto);
  }

  @Get('users')
  @ApiBearerAuth()
  @Roles([{ role: ROLES.ADMIN, permission: 'user.list' }])
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiProperty({ type: () => ListUsersDto })
  @ApiOkResponse(getSwaggerSuccessPaginationResponseSchema({ description: 'List of users', statusCode: HttpStatus.OK }))
  //Using custom decorator to get user value from request
  getUsers(
    @Query() params: ListUsersDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetUser() user?: { id: number; permission?: Record<string, unknown>[]; roles?: number[] }
  ) {
    return this.authService.findAll(params);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiProperty({ type: () => RefreshTokenDto })
  @ApiOkResponse({ type: () => RefreshTokenResponseDto })
  getTokenByRefreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken({ dto });
  }
}
