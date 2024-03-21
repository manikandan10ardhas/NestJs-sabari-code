import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { MasterGeoCountries, MasterGeoStates, MasterSettings } from '@repo/sequelize/models';

@Injectable()
export class MasterRepositoryService {
  constructor(
    @InjectModel(MasterGeoCountries) private countryModel: typeof MasterGeoCountries,
    @InjectModel(MasterGeoStates) private stateModel: typeof MasterGeoStates,
    @InjectModel(MasterSettings) private masterSettingsModel: typeof MasterSettings
  ) {}

  public async getCountries() {
    return this.countryModel.findAll({
      raw: true
    });
  }

  public async getStates(countryId?: number) {
    return this.stateModel.findAll({ where: { countryId }, raw: true });
  }

  public async getMasterSettings({ itemKey, category, status }: { itemKey?: string[]; category?: number; status?: number }) {
    const whereOptions: Record<string, unknown> = {};

    if (status) {
      whereOptions.active = status;
    }

    if (itemKey?.length) {
      whereOptions.itemKey = itemKey;
    }

    if (category) {
      whereOptions.category = category;
    }

    return this.masterSettingsModel.findAll({
      where: whereOptions,
      raw: true
    });
  }
}
