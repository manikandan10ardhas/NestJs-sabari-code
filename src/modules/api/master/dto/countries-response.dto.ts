import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ApiResponseDto } from '@core/utils/response';

export class CountryDto {
  @ApiProperty()
  @Expose()
  id?: number;

  @ApiProperty()
  @Expose()
  name?: string;

  @ApiProperty()
  @Expose()
  shortname?: string;

  @ApiProperty()
  @Expose()
  phonecode?: string;

  @ApiProperty()
  @Expose()
  domicile?: number;

  @ApiProperty()
  @Expose()
  sortOrder?: number;

  @ApiProperty()
  @Expose()
  active?: number;
}

export class CountryBodyResponseDto {
  @ApiProperty({ type: [CountryDto] })
  @Expose()
  countries?: CountryDto[];
}

export class CountryResponseDto extends ApiResponseDto {
  @ApiProperty({ type: CountryBodyResponseDto })
  @Expose()
  body?: object;
}
