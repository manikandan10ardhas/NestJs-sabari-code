import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IGeoStateAttributes {
  id?: number;
  countryId?: number;
  name?: string;
}

type IGeoStateCreationAttributes = Optional<IGeoStateAttributes, 'id'>;

@Table({ tableName: 'master_geo_states', timestamps: false })
export class MasterGeoStates extends Model<IGeoStateAttributes, IGeoStateCreationAttributes> implements IGeoStateAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @Column({ type: DataType.BIGINT })
  countryId!: number;

  @Column({ type: DataType.CHAR(70) })
  name!: string;
}
