/* eslint-disable no-async-promise-executor */
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { API_ROUTE_V1, STATUS } from '@constants/site';
import { getPagingOffset } from '@helpers/util';
import { Paginate } from '@lib/index';
import { IPagingResponse } from '@lib/paginate';
import {
  AuthPermissions,
  AuthRolePermission,
  AuthRoles,
  AuthUserRole,
  IUserAttributes,
  Users
} from '@repo/sequelize/models/';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    @InjectModel(AuthUserRole)
    private userRoleModel: typeof AuthUserRole,
    @InjectModel(AuthRolePermission)
    private rolePermissionModel: typeof AuthRolePermission,
    @InjectModel(AuthPermissions)
    private authPermissionModel: typeof AuthPermissions,
    @InjectModel(AuthRoles)
    private roleModel: typeof AuthRoles,
    private readonly sequelize: Sequelize
  ) {}

  public async create(createUserDto: Record<string, unknown>): Promise<Users | IUserAttributes> {
    return this.userModel.create(createUserDto);
  }

  public async createUserByToken(createUserDto: Record<string, unknown>): Promise<Users | IUserAttributes> {
    return this.sequelize.transaction(async (transaction) => {
      try {
        const response = await this.userModel.create(createUserDto, { transaction });

        const orConditionArray = [];
        if (createUserDto.email) {
          orConditionArray.push({ email: createUserDto.email });
        }
        if (createUserDto.phoneNo) {
          orConditionArray.push({ phoneNo: createUserDto.phoneNo });
        }
        const userCount = await this.userModel.count({
          distinct: true,
          col: 'id',
          where: { status: STATUS.ACTIVE, [Op.or]: orConditionArray },
          transaction
        });
        if (userCount > 1) {
          throw new ConflictException(
            'translations.user.errors.USER_DETAILS_EXIST.TITLE',
            'translations.user.errors.USER_DETAILS_EXIST.MESSAGE'
          );
        }

        return response;
      } catch (error) {
        this.logger.error({ fn: 'createUserByToken', error });
        throw error;
      }
    });
  }

  public async createUserRoles(data: { userId: number; roleId: number }): Promise<AuthUserRole> {
    return this.userRoleModel.create(data);
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  public async getUser(options: Record<string, unknown>): Promise<Users | IUserAttributes | null> {
    const whereOptions: Record<string, unknown> = {};

    if (options.id) {
      whereOptions.id = +options.id;
    }

    if (options.uid) {
      whereOptions.uid = options.uid;
    }

    if (options.email) {
      whereOptions.email = options.email as string;
    }

    if (options.phoneNo) {
      whereOptions.phoneNo = options.phoneNo;
    }

    if (options.status) {
      whereOptions.status = options.status;
    }

    let result = null;

    if (Object.keys(whereOptions).length > 0) {
      result = await this.userModel.findOne({
        where: whereOptions,
        raw: true
      });
    }
    return result;
  }

  public async getUserInfo({
    email,
    phoneNo,
    status
  }: {
    email?: string;
    phoneNo?: string;
    status: number;
  }): Promise<Users | IUserAttributes | null> {
    const orConditionArray = [];
    if (email) {
      orConditionArray.push({ email });
    }
    if (phoneNo) {
      orConditionArray.push({ phoneNo });
    }
    return this.userModel.findOne({
      where: { status, [Op.or]: orConditionArray },
      raw: true
    });
  }

  public async update({
    data,
    options
  }: {
    data: Record<string, unknown>;
    options: Record<string, unknown>;
  }): Promise<number[] | null> {
    const whereOptions: Record<string, unknown> = {};

    if (options.id) {
      whereOptions.id = +options.id;
    }

    if (options.email) {
      whereOptions.email = options.email as string;
    }

    if (options.uid) {
      whereOptions.uid = options.uid;
    }

    let result = null;

    if (Object.keys(whereOptions).length > 0) {
      result = await this.userModel.update(data, {
        where: whereOptions
      });
    }
    return result;
  }

  public async remove(id: number): Promise<string> {
    return `This action removes a #${id} user`;
  }

  public async getUsercount({
    email,
    phoneNo,
    status
  }: {
    email?: string;
    phoneNo?: string;
    status: number;
  }): Promise<number> {
    const orConditionArray = [];
    if (email) {
      orConditionArray.push({ email });
    }
    if (phoneNo) {
      orConditionArray.push({ phoneNo });
    }
    return this.userModel.count({ distinct: true, col: 'id', where: { status, [Op.or]: orConditionArray } });
  }

  public async getUserRoledetails(options: Record<string, unknown>): Promise<IUserAttributes | null> {
    const whereOptions: Record<string, unknown> = {};
    const roleWhereOptions: Record<string, unknown> = {};
    if (options.id) {
      whereOptions.id = +options.id;
    }

    if (options.uid) {
      whereOptions.uid = options.uid;
    }

    if (options.email) {
      whereOptions.email = options.email as string;
    }

    if (options.status) {
      whereOptions.status = options.status;
    }

    if (options.roleId) {
      roleWhereOptions.roleId = options.roleId;
    }

    let result = null;
    if (Object.keys(whereOptions).length > 0) {
      result = (await this.userModel
        .findOne({
          where: whereOptions,
          include: [
            {
              model: this.userRoleModel,
              as: 'userRole',
              required: false,
              where: roleWhereOptions,
              include: [
                {
                  model: this.rolePermissionModel,
                  as: 'rolePermissions',
                  include: [
                    {
                      model: this.authPermissionModel,
                      as: 'permission'
                    }
                  ]
                }
              ]
            }
          ]
        })
        .then((r) => {
          const a = r?.get({ plain: true });
          const authPermission = a?.userRole?.rolePermissions?.map((val) => val.permission?.name);

          return { ...a, permission: authPermission };
        })) as IUserAttributes;
    }
    return result;
  }

  public async getUsers({
    limit,
    page
  }: {
    paginate?: boolean;
    limit?: number;
    page?: number;
  }): Promise<IPagingResponse<Users[]>> {
    const [pLimit, pOffset] = getPagingOffset(limit, page);

    const { count, rows } = await this.userModel.findAndCountAll({
      offset: pOffset,
      limit: pLimit,
      raw: true
    });

    return Paginate({
      count,
      rows: rows,
      baseUrl: `${API_ROUTE_V1}/auth/users`,
      offset: pOffset,
      limit: pLimit
    });
  }
}
