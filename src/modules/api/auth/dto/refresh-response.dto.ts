import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ApiResponseDto } from '@core/utils/response';

export class RefreshTokenBodyResponseDto {
  @ApiProperty()
  @Expose()
  token?: string;
}
export class RefreshTokenResponseDto extends ApiResponseDto {
  @ApiProperty({ type: RefreshTokenBodyResponseDto })
  @Expose()
  body?: object;
}
