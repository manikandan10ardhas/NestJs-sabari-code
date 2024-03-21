import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IMasterSettingsAttributes {
  id?: number;
  category?: number;
  itemKey?: string;
  itemValue?: string;
  itemLabel?: string;
  active?: number;
  isEditable?: number;
  sortOrder?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type IMasterSettingsCreationAttributes = Optional<IMasterSettingsAttributes, 'id'>;

@Table({ tableName: 'master_settings', timestamps: false })
export class MasterSettings
  extends Model<IMasterSettingsAttributes, IMasterSettingsCreationAttributes>
  implements IMasterSettingsAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @Column({ type: DataType.BIGINT })
  category?: number;

  @Column({ type: DataType.STRING })
  itemKey?: string;

  @Column({ type: DataType.STRING })
  itemValue?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  itemLabel?: string;

  @Column({ type: DataType.TINYINT })
  active?: number;

  @Column({ type: DataType.TINYINT, allowNull: true })
  isEditable?: number;

  @Column({ type: DataType.TINYINT, allowNull: true })
  sortOrder?: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt?: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt?: Date;
}
