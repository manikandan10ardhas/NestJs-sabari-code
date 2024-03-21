import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: Record<string, unknown>[]) => SetMetadata('roles', roles);
