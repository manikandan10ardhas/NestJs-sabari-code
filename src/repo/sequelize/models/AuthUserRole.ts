import { Optional } from 'sequelize';
import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

import { AuthRolePermission, IAuthRolePermissionAttributes } from './AuthRolePermission';
import { AuthRoles, IAuthRolesAttributes } from './AuthRoles';

export interface IAuthUserRoleAttributes {
  id?: number;
  userId?: number;
  roleId?: number;
  deletedAt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  rolePermissions?: IAuthRolePermissionAttributes[];
  role?: IAuthRolesAttributes;
}

type IAuthUserRoleCreationAttributes = Optional<IAuthUserRoleAttributes, 'id'>;

@Table({ tableName: 'auth_user_role', timestamps: false })
export class AuthUserRole
  extends Model<IAuthUserRoleAttributes, IAuthUserRoleCreationAttributes>
  implements IAuthUserRoleAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  userId?: number;

  @Column({ allowNull: true, type: DataType.BIGINT })
  roleId?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  deletedAt?: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt?: Date;

  @HasMany(() => AuthRolePermission, { as: 'rolePermissions', foreignKey: 'roleId', sourceKey: 'roleId' })
  rolePermissions!: AuthRolePermission[];

  @HasOne(() => AuthRoles, { as: 'role', foreignKey: 'id', sourceKey: 'roleId' })
  role!: AuthRoles;
}
