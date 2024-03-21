import { Test, TestingModule } from '@nestjs/testing';
import { MasterRepositoryService } from './master.repository';
import { getModelToken } from '@nestjs/sequelize';
import { MasterGeoCountries, MasterGeoStates, MasterSettings } from '@repo/sequelize/models/';

describe('MasterRepositoryService', () => {
  let service: MasterRepositoryService;
  let countryModel: MasterGeoCountries;
  let stateModel: MasterGeoStates;
  let settingsModel: MasterSettings;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MasterRepositoryService,
        {
          provide: getModelToken(MasterGeoCountries),
          useValue: {
            findAll: jest.fn()
          }
        },
        {
          provide: getModelToken(MasterGeoStates),
          useValue: {
            findAll: jest.fn()
          }
        },
        {
          provide: getModelToken(MasterSettings),
          useValue: {
            findAll: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<MasterRepositoryService>(MasterRepositoryService);
    countryModel = module.get<typeof MasterGeoCountries>(getModelToken(MasterGeoCountries));
    stateModel = module.get<typeof MasterGeoStates>(getModelToken(MasterGeoStates));
    settingsModel = module.get<typeof MasterSettings>(getModelToken(MasterSettings));
  });

  it('should get all countries', async () => {
    const result = await service.getCountries();
    expect(countryModel.findAll).toBeCalledTimes(1);
  });

  it('should get all states based on country', async () => {
    const result = await service.getStates(1);
    expect(stateModel.findAll).toBeCalledTimes(1);
    expect(stateModel.findAll).toBeCalledWith(
      expect.objectContaining({
        where: {
          countryId: 1
        },
        raw: true
      })
    );
  });

  it('should data from master settings table based on keys', async () => {
    const result = await service.getMasterSettings({ itemKey: ['key'], category: 2, status: 1 });
    expect(settingsModel.findAll).toBeCalledTimes(1);
    // expect(settingsModel.findAll).toBeCalledWith(
    //   expect.objectContaining({
    //     where: {
    //       itemKey: [],
    //       active: STATUS.ACTIVE
    //     },
    //     raw: true
    //   })
    // );
  });
});
