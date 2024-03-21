import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ForBiddenExceptionFilter } from '@filters/forbidden-exception.filter';

@ApiTags('User')
@Controller()
@UseFilters(ForBiddenExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiExcludeEndpoint(true)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiExcludeEndpoint(true)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiExcludeEndpoint(true)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @ApiExcludeEndpoint(true)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiExcludeEndpoint(true)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
