import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ServerResponseDto } from './dto/server-response.dto';
import { ServerService } from './server.service';

@ApiTags('Server')
@Controller('')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Get('health')
  @ApiOkResponse({ type: () => ServerResponseDto })
  getToken() {
    return {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    };
  }
}
