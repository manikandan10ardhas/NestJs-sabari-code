import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthPermissions, AuthRolePermission, AuthRoles, AuthUserRole } from '@repo/sequelize/models';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([AuthUserRole, AuthRoles, AuthPermissions, AuthRolePermission])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [SequelizeModule]
})
export class AuthModule {}
