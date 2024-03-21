import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IGeoCountriesAttributes {
  id?: number;
  name?: string;
  shortname?: string;
  sortOrder?: number;
  phonecode?: string;
  domicile?: number;
  active?: number;
}

type IGeoCountriesCreationAttributes = Optional<IGeoCountriesAttributes, 'id'>;

@Table({ tableName: 'master_geo_countries', timestamps: false })
export class MasterGeoCountries
  extends Model<IGeoCountriesAttributes, IGeoCountriesCreationAttributes>
  implements IGeoCountriesAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;

  @Column({ type: DataType.CHAR(70) })
  name!: string;

  @Column({ type: DataType.CHAR(3) })
  shortname!: string;

  @Column({ type: DataType.CHAR(3) })
  phonecode!: string;

  @Column({ type: DataType.TINYINT })
  domicile!: number;

  @Column({ type: DataType.TINYINT })
  sortOrder!: number;

  @Column({ type: DataType.TINYINT })
  active!: number;
}
