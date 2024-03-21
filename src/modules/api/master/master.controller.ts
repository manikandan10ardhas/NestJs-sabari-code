import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CountryResponseDto, StatesDto } from './dto';
import { MasterService } from './master.service';

@ApiTags('Master')
@Controller()
export class MasterController {
  constructor(private masterService: MasterService) {}

  @Get()
  async getMaster() {
    return this.masterService.getMaster();
  }

  @Get()
  @ApiOkResponse({ type: () => CountryResponseDto })
  async getStates(@Query() params: StatesDto) {
    return this.masterService.getStates({ ...params });
  }
}
