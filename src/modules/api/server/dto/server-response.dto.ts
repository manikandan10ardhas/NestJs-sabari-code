import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ApiResponseDto } from '@core/utils/response';

export class UptimeDto {
  @ApiProperty()
  @Expose()
  uptime?: number;

  @ApiProperty()
  @Expose()
  date?: Date;
}

export class ServerResponseDto extends ApiResponseDto {
  @ApiProperty({ type: UptimeDto })
  @Expose()
  body?: object;
}
