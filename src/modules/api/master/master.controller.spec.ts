import { Test, TestingModule } from '@nestjs/testing';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';

describe('MasterController', () => {
  let controller: MasterController;
  let service: MasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterController],
      providers: [
        {
          provide: MasterService,
          useValue: {
            getMaster: jest.fn(),
            getStates: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<MasterController>(MasterController);
    service = module.get<MasterService>(MasterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getMaster... get master data', async () => {
    jest.spyOn(service, 'getMaster').mockResolvedValueOnce({
      countries: [],
      states: []
    });
    const result = await controller.getMaster();
    expect(result).toEqual({
      countries: [],
      states: []
    });
  });

  it('getStates... get master data', async () => {
    const response = { states: [{ id: 2, countryId: 1, name: '' }] }
    jest.spyOn(service, 'getStates').mockResolvedValueOnce(response);
    const result = await controller.getStates({ countryId: 1 });
    expect(result).toEqual(response);
  });
});
