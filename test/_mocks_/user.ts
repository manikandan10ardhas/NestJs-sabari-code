import { faker } from '@faker-js/faker';

export const loginSchema = {
  email: `${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_user001@mailinator.com`,
  password: faker.internet.password(6)
};

export const getTokenSchema = {
  email: `${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_user001@mailinator.com`,
  phoneCode: faker.phone.number('91'),
  phoneNo: faker.phone.number('8888######')
};

export const userMock = {
  uid: faker.random.alpha(36),
  email: `${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_user001@mailinator.com`
};
