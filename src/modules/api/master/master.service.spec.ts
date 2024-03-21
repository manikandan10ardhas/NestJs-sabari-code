import { Test, TestingModule } from '@nestjs/testing';
import { MasterService } from './master.service';
import { MasterRepositoryService } from './master.repository';

describe('MasterService', () => {
  let service: MasterService;
  let repoService: MasterRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterService, { provide: MasterRepositoryService, useValue: { getCountries: jest.fn() } }]
    }).compile();

    service = module.get<MasterService>(MasterService);
    repoService = module.get<MasterRepositoryService>(MasterRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getMaster... should get all master data', async () => {
    jest.spyOn(repoService, 'getCountries').mockResolvedValueOnce([]);
    const result = await service.getMaster();
    expect(repoService.getCountries).toBeCalledTimes(1);
    expect(result).toEqual({
      countries: []
    });
  });
});
