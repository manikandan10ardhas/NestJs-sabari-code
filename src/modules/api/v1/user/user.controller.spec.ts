import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '@core/guard/auth.guard';
import WrapResponseInterceptor from '@core/interceptors/wrap-response.interceptor';
import { userMock } from '../../../../../test/_mocks_/user';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(() => userMock),
            findAll: jest.fn(() => [userMock]),
            findOne: jest.fn(() => userMock),
            update: jest.fn(() => userMock),
            remove: jest.fn(() => 'string')
          }
        }
      ]
    })
      .overrideInterceptor(WrapResponseInterceptor)
      .useValue(true)
      .overrideGuard(AuthGuard)
      .useValue(true)
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('User controller', () => {
    it('findAll... List of users', async () => {
      expect(typeof (await controller.findAll())).toEqual('object');
    });

    it('create... creating user', async () => {
      expect(typeof (await controller.create({}))).toEqual('object');
    });

    it('findOne... Getting user details', async () => {
      expect(typeof controller.findOne(1)).toEqual('object');
    });

    it('update... updating user based on id', async () => {
      expect(typeof controller.update(1, {})).toEqual('object');
    });

    it('remove... Removing user', async () => {
      expect(typeof controller.remove(1)).toEqual('string');
    });
  });
});
