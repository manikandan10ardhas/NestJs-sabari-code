import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IAuthRolesAttributes {
  id?: number;
  name?: string;
  description?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type IAuthRolesCreationAttributes = Optional<IAuthRolesAttributes, 'id'>;

@Table({ tableName: 'auth_roles', timestamps: false })
export class AuthRoles extends Model<IAuthRolesAttributes, IAuthRolesCreationAttributes> implements IAuthRolesAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  description?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt?: Date;
}
