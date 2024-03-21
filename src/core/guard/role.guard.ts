import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRolePermissions = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);

    if (!requiredRolePermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRolePermissions.some(
      (requiredRolePermission: { role: number; permission: string }) =>
        user?.roles?.includes(requiredRolePermission.role) && user?.permission?.includes(requiredRolePermission.permission)
    );
  }
}
