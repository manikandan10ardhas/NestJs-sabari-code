import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleAsyncOptions } from '@nestjs/sequelize';

import {
  AuthPermissions,
  AuthRolePermission,
  AuthRoles,
  AuthUserRole,
  MasterGeoCountries,
  MasterGeoStates,
  MasterSettings,
  Users
} from './sequelize/models/';

const imports = [];
// eslint-disable-next-line sonarjs/no-small-switch
switch (process.env.DB_ORM_NAME) {
  default:
  case 'sequelize': {
    imports.push(
      SequelizeModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) =>
          ({
            host: configService.get<string>('database.host'),
            dialect: configService.get<string>('database.sequelize.connectionOptions.dialect'),
            port: configService.get<string>('database.port'),
            username: configService.get<string>('database.username'),
            password: configService.get<string>('database.password'),
            database: configService.get<string>('database.database'),
            models: [
              Users,
              AuthUserRole,
              AuthRoles,
              AuthPermissions,
              AuthRolePermission,
              MasterGeoCountries,
              MasterGeoStates,
              MasterSettings
            ],
            autoLoadModels: true,
            synchronize: true,
            pool: {
              min: Number(configService.get<number>('database.sequelize.connectionOptions.pool.min')),
              max: Number(configService.get<number>('database.sequelize.connectionOptions.pool.max')),
              acquire: Number(configService.get<number>('database.sequelize.connectionOptions.pool.acquire')),
              idle: Number(configService.get<number>('database.sequelize.connectionOptions.idle'))
            },
            logging: configService.get<number>('database.sequelize.connectionOptions.logging'),
            omitNull: true,
            timezone: configService.get<number>('database.sequelize.connectionOptions.timezone'),
            define: {
              underscored: false,
              freezeTableName: true,
              charset: 'utf8'
            },
            collate: 'utf8_general_ci',
            timestamp: true,
            created_at: 'createdAt',
            updated_at: 'updatedAt'
          } as SequelizeModuleAsyncOptions)
      })
    );
    break;
  }
}

@Global()
@Module({
  imports: imports
})
export class DatabaseModule {}
