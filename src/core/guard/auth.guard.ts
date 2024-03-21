import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';

import { AuthPermissions, AuthRolePermission, AuthUserRole } from '@repo/sequelize/models';
import { Users } from '@repo/sequelize/models/User';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel(Users)
    private userModel: typeof Users,
    @InjectModel(AuthUserRole)
    private userRoleModel: typeof AuthUserRole,
    @InjectModel(AuthRolePermission)
    private rolePermissionModel: typeof AuthRolePermission,
    @InjectModel(AuthPermissions)
    private authPermissionModel: typeof AuthPermissions
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const secret: string = this.config.get('jwt.secret') as string;

      const result = await this.jwtService.verifyAsync(token, {
        secret
      });

      const user = await this.userModel
        .findOne({
          attributes: ['id'],
          where: { id: result.id },
          include: [
            {
              model: this.userRoleModel,
              as: 'userRole',
              required: true,
              include: [
                {
                  model: this.rolePermissionModel,
                  as: 'rolePermissions',
                  include: [
                    {
                      model: this.authPermissionModel,
                      as: 'permission'
                    }
                  ]
                }
              ]
            }
          ]
        })
        .then((r) => {
          const a = r?.get({ plain: true });
          const authPermission = a?.userRole?.rolePermissions?.map((val) => val.permission?.name);
          delete a?.userRole;
          return { ...a, permission: authPermission };
        });

      if (!user) {
        throw new NotFoundException('Unable to find the user', 'Unable to find the user');
      }
      request.user = {
        ...user,
        roles: result.roles
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
