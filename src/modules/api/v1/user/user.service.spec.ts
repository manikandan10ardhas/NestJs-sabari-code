import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
// import { AuthPermissions, AuthRolePermission, AuthRoles, AuthUserRole, Users } from '@repo/sequelize/models';
import { UserRepository } from './user.repository';
import { ROLES } from '@constants/index';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            getUser: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
            getLoginUser: jest.fn(),
            getUsers: jest.fn(),
            createUserRoles: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll... List of users', async () => {
    jest.spyOn(userRepository, 'findAll').mockResolvedValueOnce('string');
    expect(typeof (await service.findAll())).toEqual('string');
  });

  it('create... creating user', async () => {
    jest.spyOn(userRepository, 'create').mockResolvedValueOnce({ uid: 'abc' });
    expect(typeof (await service.create({}))).toEqual('object');
  });

  it('findOne... Getting user details', async () => {
    jest.spyOn(userRepository, 'getUser').mockResolvedValueOnce({ uid: 'abc' });
    expect(typeof (await service.findOne(1))).toEqual('object');
  });

  it('update... updating user based on id', async () => {
    jest.spyOn(userRepository, 'update').mockResolvedValueOnce([1]);
    expect(typeof (await service.update(1, {}))).toEqual('object');
  });

  it('remove... Removing user', async () => {
    jest.spyOn(userRepository, 'remove').mockResolvedValueOnce('string');
    expect(typeof (await service.remove(1))).toEqual('string');
  });
});
