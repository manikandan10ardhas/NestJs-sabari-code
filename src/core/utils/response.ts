import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiResponseDto {
  @ApiProperty({ example: 200 })
  @Expose()
  statusCode?: number;

  @ApiProperty({ example: true })
  @Expose()
  success?: boolean;

  @ApiProperty({ example: '1.1.1' })
  @Expose()
  apiVersion?: string;

  @ApiProperty({ example: '' })
  @Expose()
  message?: string;
}
