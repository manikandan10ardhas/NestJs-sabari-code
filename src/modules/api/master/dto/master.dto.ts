import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class StatesDto {
  @ApiProperty({
    name: 'countryId',
    required: true
  })
  @IsOptional()
  countryId?: number;
}
