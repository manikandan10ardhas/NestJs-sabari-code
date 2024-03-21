/* istanbul ignore file */
import { USER_STATUS } from '../../constants';
import { IUserAttributes } from '@repo/sequelize/models';

export default async (userRow: IUserAttributes): Promise<IUserAttributes> => {
  if (userRow.status === USER_STATUS.DELETED) {
    /* istanbul ignore next */
    throw new Error('User not found');
  }

  return userRow;
};
