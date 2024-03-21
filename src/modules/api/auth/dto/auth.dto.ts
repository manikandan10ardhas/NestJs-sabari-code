import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

const EMAIL_DESCRIPTION = 'The email address of the user';
const EMAIL_EXAMPLE = 'john.doe@mailinator.com';

const EMAIL_VALIDATION = 'translations.validation.errors.INVALID_EMAIL';
const EMPTY_VALIDATION = 'translations.validation.errors.IS_EMPTY';
const STRING_VALIDATION = 'translatinos.validation.errors.IS_STRING';

export class SignUpDto {
  @ApiProperty({
    description: EMAIL_DESCRIPTION,
    example: EMAIL_EXAMPLE,
    type: String
  })
  @IsEmail({}, { message: i18nValidationMessage(EMAIL_VALIDATION) })
  @IsNotEmpty({ message: i18nValidationMessage(EMPTY_VALIDATION) })
  email!: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Password@123',
    type: String
  })
  @IsString({ message: i18nValidationMessage(STRING_VALIDATION) })
  @IsNotEmpty({ message: i18nValidationMessage(EMPTY_VALIDATION) })
  password!: string;
}

export class LoginDto {
  @ApiProperty({
    description: EMAIL_DESCRIPTION,
    example: EMAIL_EXAMPLE,
    type: String
  })
  @IsEmail({}, { message: i18nValidationMessage(EMAIL_VALIDATION) })
  @IsNotEmpty({ message: i18nValidationMessage(EMPTY_VALIDATION) })
  email!: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Password@123',
    type: String
  })
  @IsString({ message: i18nValidationMessage(STRING_VALIDATION) })
  @IsNotEmpty({ message: i18nValidationMessage(EMPTY_VALIDATION) })
  password!: string;
}

export class ListUsersDto {
  @IsOptional()
  @ApiProperty({ name: 'limit', required: false })
  limit?: number;

  @IsOptional()
  @ApiProperty({ name: 'page', required: false })
  page?: number;

  @IsOptional()
  @ApiProperty({ name: 'filter', required: false })
  filter?: number;

  @IsOptional()
  @ApiProperty({ name: 'sort', required: false })
  sort?: number;
}

export class OTPLoginDto {
  @ApiProperty({
    description: EMAIL_DESCRIPTION,
    example: EMAIL_EXAMPLE,
    type: String
  })
  @IsString({ message: i18nValidationMessage(STRING_VALIDATION) })
  @IsNotEmpty({ message: i18nValidationMessage(EMPTY_VALIDATION) })
  email!: string;

  @ApiProperty({
    description: 'OTP code',
    example: 111_111,
    type: Number
  })
  @IsNumber({}, { message: i18nValidationMessage('translations.validation.errors.IS_NUMBER') })
  code!: number;
}

export class LoginSecretDto {
  @ApiProperty({
    description: EMAIL_DESCRIPTION,
    example: EMAIL_EXAMPLE,
    type: String
  })
  @IsEmail({}, { message: i18nValidationMessage(EMAIL_VALIDATION) })
  @IsNotEmpty({ message: i18nValidationMessage(EMPTY_VALIDATION) })
  email!: string;

  @ApiProperty({
    description: 'Resend OTP',
    type: Boolean
  })
  isResend?: boolean;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token of the user',
    type: String
  })
  @IsNotEmpty({ message: i18nValidationMessage(EMPTY_VALIDATION) })
  refreshToken!: string;
}
