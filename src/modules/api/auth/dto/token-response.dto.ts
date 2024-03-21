import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ApiResponseDto } from '@core/utils/response';

export class TokenBodyResponseDto {
  @ApiProperty()
  @Expose()
  token?: string;

  @ApiProperty()
  @Expose()
  refreshToken?: string;
}
export class TokenResponseDto extends ApiResponseDto {
  @ApiProperty({ type: TokenBodyResponseDto })
  @Expose()
  body?: object;
}
