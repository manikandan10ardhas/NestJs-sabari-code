/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PermissionDto {
  @ApiProperty()
  @Expose()
  moduleName?: string;

  @ApiProperty()
  @Expose()
  name?: string;

  @ApiProperty()
  @Expose()
  label?: string;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  permissionId?: number;

  @ApiProperty()
  @Expose()
  rolePermissionId?: number;
}
