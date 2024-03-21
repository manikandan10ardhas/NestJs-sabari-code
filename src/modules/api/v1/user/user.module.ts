import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Users } from '@repo/sequelize/models';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [SequelizeModule, UserService, UserRepository]
})
export class UserModule {}
