import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MasterController } from './master.controller';
import { MasterRepositoryService } from './master.repository';
import { MasterService } from './master.service';
import { MasterGeoCountries, MasterGeoStates, MasterSettings } from '@repo/sequelize/models';

@Module({
  imports: [SequelizeModule.forFeature([MasterGeoCountries, MasterGeoStates, MasterSettings])],
  controllers: [MasterController],
  providers: [MasterService, MasterRepositoryService],
  exports: [MasterRepositoryService]
})
export class MasterModule {}
