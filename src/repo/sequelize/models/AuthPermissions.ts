import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IAuthPermissionAttributes {
  id?: number;
  moduleName?: string;
  name?: string;
  label?: string;
  description?: string;
  // deletedAt?: Date;
  // createdAt?: Date;
  // updatedAt?: Date;
}

type IAuthPermissionCreationAttributes = Optional<IAuthPermissionAttributes, 'id'>;

@Table({ tableName: 'auth_permissions', timestamps: false })
export class AuthPermissions
  extends Model<IAuthPermissionAttributes, IAuthPermissionCreationAttributes>
  implements IAuthPermissionAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  moduleName?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  label?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  description?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt?: Date;
}
