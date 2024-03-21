import { Optional } from 'sequelize';
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';

import { AuthPermissions, IAuthPermissionAttributes } from './AuthPermissions';

export interface IAuthRolePermissionAttributes {
  id?: number;
  roleId?: number;
  permissionId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  permission?: IAuthPermissionAttributes;
}

type IAuthRolePermissionCreationAttributes = Optional<IAuthRolePermissionAttributes, 'id'>;

@Table({ tableName: 'auth_role_permission', timestamps: false })
export class AuthRolePermission
  extends Model<IAuthRolePermissionAttributes, IAuthRolePermissionCreationAttributes>
  implements IAuthRolePermissionAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  roleId?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  permissionId?: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt?: Date;

  @HasOne(() => AuthPermissions, { as: 'permission', foreignKey: 'id', sourceKey: 'permissionId' })
  permission!: AuthPermissions;
}
