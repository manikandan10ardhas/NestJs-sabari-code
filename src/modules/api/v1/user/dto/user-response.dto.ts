import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { RoleDto } from './response';
import { ApiResponseDto } from '@core/utils/response';

export class UserBodyResponseDto {
  @ApiProperty()
  // @Expose()
  firstName?: string;

  @ApiProperty()
  // @Expose()
  lastName?: string;

  @ApiProperty()
  @Expose()
  email?: string;

  @ApiProperty()
  @Expose()
  uid?: string;

  @ApiProperty()
  @Expose()
  phoneCode?: string;

  @ApiProperty()
  @Expose()
  phoneNo?: string;

  @ApiProperty()
  @Expose()
  profileImage?: string;

  @ApiProperty()
  @Expose()
  address?: string;

  @ApiProperty()
  @Expose()
  address2?: string;

  @ApiProperty()
  @Expose()
  city?: string;

  @ApiProperty()
  @Expose()
  state?: string;

  @ApiProperty()
  @Expose()
  countryCode?: string;

  @ApiProperty()
  @Expose()
  zipCode?: string;

  @ApiProperty()
  @Expose()
  profileCompletion?: number;

  @ApiProperty()
  @Expose()
  status?: number;

  @ApiProperty()
  @Expose()
  lastLoginDate?: string;

  @ApiProperty()
  @Expose()
  deletedAt?: string;

  @ApiProperty()
  @Expose()
  createdAt?: string;

  @ApiProperty()
  @Expose()
  updatedAt?: string;

  @ApiProperty({ type: RoleDto })
  @Expose()
  @Type(() => RoleDto)
  role?: RoleDto;
}

export class UserResponseDto extends ApiResponseDto {
  @ApiProperty({ type: UserBodyResponseDto })
  @Expose()
  body?: object;
}
