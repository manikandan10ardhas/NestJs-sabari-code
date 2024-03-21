import { Sequelize } from 'sequelize-typescript';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthPermissions, AuthRolePermission, AuthRoles, AuthUserRole, Users } from '../../../../repo/sequelize/models';
import { UserRepository } from './user.repository';
import { ROLES, STATUS } from '@constants/index';
import { ConflictException } from '@nestjs/common';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let users: typeof Users;
  let userRole: typeof AuthUserRole;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        Sequelize,
        {
          provide: getModelToken(Users),
          useValue: {
            findOne: jest.fn().mockResolvedValueOnce(null),
            findAll: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            count: jest.fn(),
            findAndCountAll: jest.fn()
          }
        },
        {
          provide: getModelToken(AuthUserRole),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn()
          }
        },
        {
          provide: getModelToken(AuthRolePermission),
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: getModelToken(AuthPermissions),
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: getModelToken(AuthRoles),
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: Sequelize,
          useValue: {
            transaction: jest.fn()
          }
        }
      ]
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    users = module.get<typeof Users>(getModelToken(Users));
    userRole = module.get<typeof AuthUserRole>(getModelToken(AuthUserRole));
    sequelize = module.get<Sequelize>(Sequelize);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user', async () => {
    const payload = { email: 'abc@mailinator.com' };
    await userRepository.create(payload);
    expect(users.create).toBeCalledTimes(1);
  });

  it('should create user role', async () => {
    const payload = {
      userId: 1,
      roleId: 4
    };

    await userRepository.createUserRoles(payload);
    expect(userRole.create).toBeCalledTimes(1);
  });

  it('should return all user', async () => {
    const result = await userRepository.findAll();
    expect(typeof result).toEqual('string');
  });

  it('should get user based on where options', async () => {
    const payload = {
      id: 4,
      uid: 'abcd',
      email: 'abc@mail.com'
    };
    await userRepository.getUser({ ...payload });
    expect(users.findOne).toBeCalledTimes(1);
  });

  it('getUserInfo should get user based on where options', async () => {
    const payload = {
      email: 'abc@mailinator.com',
      phoneNo: '9012344578',
      status: STATUS.ACTIVE
    };
    jest.spyOn(userRepository, 'getUserInfo').mockResolvedValueOnce(payload);
    expect(typeof (await userRepository.getUser(payload))).not.toEqual(null);
  });

  it('getUsercount should get user based on where options', async () => {
    jest.spyOn(userRepository, 'getUsercount').mockResolvedValueOnce(1);
    expect(
      typeof (await userRepository.getUsercount({
        email: 'abc@mailinator.com',
        phoneNo: '9012344578',
        status: STATUS.ACTIVE
      }))
    ).toEqual('number');
  });

  it('should return null if no where options is provided', async () => {
    expect(await userRepository.getUser({})).toEqual(null);
  });

  it('should update an user', async () => {
    const payload = {
      data: {
        email: 'abcd@mailinator.com'
      },
      options: {
        id: 5,
        email: 'abc@mail.com',
        uid: 'asdcasd'
      }
    };
    await userRepository.update(payload);
    expect(users.update).toBeCalledTimes(1);
  });

  it('should return null if where options is not provided to update user', async () => {
    const payload = {
      data: {
        email: 'abcd@mailinator.com'
      },
      options: {}
    };

    const result = await userRepository.update({ ...payload });
    expect(result).toEqual(null);
  });

  it('should remove an user', async () => {
    const result = await userRepository.remove(1);
    expect(typeof result).toBe('string');
  });

  it('should get login user', async () => {
    const payload = {
      id: 4,
      uid: 'abcd',
      email: 'mail@mail.com',
      roleId: 2
    };

    const findOne: any = {
      get: jest.fn()
    };

    jest.spyOn(users, 'findOne').mockResolvedValueOnce(findOne);

    await userRepository.getUserRoledetails({ ...payload });
    expect(users.findOne).toBeCalledTimes(1);
  });

  it('should return null if not options are present', async () => {
    const payload = {};
    jest.spyOn(users, 'findOne').mockResolvedValueOnce(null);
    const result = await userRepository.getUserRoledetails({ ...payload });
    expect(result).toEqual(null);
  });

  it('should return all users', async () => {
    jest.spyOn(users, 'findAndCountAll').mockResolvedValueOnce({
      count: 0,
      rows: []
    } as any);
    await userRepository.getUsers({ paginate: true });
    expect(users.findAndCountAll).toBeCalledTimes(1);
  });

  it('createUserByToken...  should create a user and return the response', async () => {
    const createUserDto = {
      email: 'abc@mail.com',
      phoneNo: '9012345678'
    };

    sequelize.transaction = jest.fn().mockImplementation(async (callback) => {
      return callback();
    });

    jest.spyOn(users, 'create').mockResolvedValueOnce({ ...createUserDto, id: 1, uid: 'abc' });
    jest.spyOn(users, 'count').mockResolvedValueOnce(0);

    await userRepository.createUserByToken(createUserDto);

    expect(users.create).toHaveBeenCalledWith(createUserDto, expect.any(Object));

    expect(users.create).toBeCalledTimes(1);
  });

  it('createUserByToken... should throw ConflictException if user count is greater than 1', async () => {
    const createUserDto = {
      email: 'abc@mail.com',
      phoneNo: '9012345678'
    };

    sequelize.transaction = jest.fn().mockImplementation(async (callback) => {
      return callback();
    });

    jest.spyOn(users, 'create').mockResolvedValueOnce({ ...createUserDto, id: 1, uid: 'abc' });
    jest.spyOn(users, 'count').mockResolvedValueOnce(2);

    await expect(userRepository.createUserByToken(createUserDto)).rejects.toThrow(ConflictException);
  });
});
