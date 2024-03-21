import { Injectable } from '@nestjs/common';

import { MasterRepositoryService } from './master.repository';

@Injectable()
export class MasterService {
  constructor(private repository: MasterRepositoryService) {}

  public async getMaster() {
    return {
      countries: await this.repository.getCountries()
    };
  }

  public async getStates({ countryId }: { countryId?: number }) {
    return {
      states: await this.repository.getStates(countryId)
    };
  }
}
