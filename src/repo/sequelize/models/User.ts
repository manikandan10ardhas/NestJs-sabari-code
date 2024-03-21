import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Optional } from 'sequelize';
import { BeforeCreate, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

import { AuthUserRole, IAuthUserRoleAttributes } from './AuthUserRole';
import { STATUS } from '@constants/site';

export interface IUserAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  uid?: string;
  phoneCode?: string;
  phoneNo?: string;
  profileImage?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  countryCode?: string;
  zipCode?: string;
  profileCompletion?: number;
  status?: number;
  emailVerified?: number;
  authToken?: string;
  resendToken?: Date;
  lastLoginDate?: Date;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  userRole?: IAuthUserRoleAttributes;
  userRoles?: IAuthUserRoleAttributes[];
  permission?: string;
  role?: Record<string, unknown>;
}

type IUserCreationAttributes = Optional<IUserAttributes, 'id'>;

@Table({ tableName: 'users', timestamps: false })
export class Users extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
  @BeforeCreate
  static generateUUID() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define, sonarjs/no-use-of-empty-return-value
    // instance.uid
    // uuidv4(); // Generate UUID using uuidv4() function
  }

  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @ApiProperty({ description: 'desc', example: 'John' })
  @Column({ allowNull: true, type: DataType.STRING(50) })
  firstName?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  lastName?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  email?: string;

  @Exclude()
  @Column({ allowNull: true, type: DataType.STRING(255) })
  password?: string;

  @Column({ allowNull: false, type: DataType.CHAR(36), defaultValue: DataType.UUIDV4 })
  uid?: string;

  @Column({ allowNull: true, type: DataType.STRING(5) })
  phoneCode?: string;

  @Column({ allowNull: true, type: DataType.STRING(12) })
  phoneNo?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  profileImage?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  address?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  address2?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  city?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  state?: string;

  @Column({ allowNull: true, type: DataType.STRING(3) })
  countryCode?: string;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  zipCode?: string;

  @Column({ allowNull: true, type: DataType.TINYINT, defaultValue: '0' })
  profileCompletion?: number;

  @Column({ allowNull: true, type: DataType.TINYINT, defaultValue: STATUS.ACTIVE })
  status?: number;

  @Column({ allowNull: true, type: DataType.TINYINT, defaultValue: '0' })
  emailVerified?: number;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  authToken?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  resendToken?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  lastLoginDate?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  deletedAt?: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW }) //defaultValue: Sequelize.literal('unix_timestamp(CURRENT_TIMESTAMP)') })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updatedAt?: Date;

  @HasOne(() => AuthUserRole, { as: 'userRole', foreignKey: 'userId', sourceKey: 'id' })
  userRole?: AuthUserRole;

  @HasMany(() => AuthUserRole, { as: 'userRoles', foreignKey: 'userId', sourceKey: 'id' })
  userRoles?: AuthUserRole[];

  // constructor(partial: Partial<users>) {
  //   super();
  //   Object.assign(this, partial);
  // }
}
