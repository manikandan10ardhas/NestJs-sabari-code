import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  BadRequestExceptionFilter,
  ConflictExceptionFilter,
  ForBiddenExceptionFilter,
  HttpExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter
} from '../../src/filters';
import WrapResponseInterceptor from '../../src/core/interceptors/wrap-response.interceptor';
import { ConfigService } from '@nestjs/config';

const getLoginSchema = () => {
  return {
    email: `${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_user001@mailinator.com`,
    password: faker.internet.password(6)
  };
};

export const init = async () => {
  let app: INestApplication;

  if (process.env.NODE_ENV && ['test'].indexOf(process.env.NODE_ENV) === -1) {
    throw new Error('Testing is not allowed');
  }
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  app = moduleFixture.createNestApplication();
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new ConflictExceptionFilter(),
    new ForBiddenExceptionFilter(),
    new HttpExceptionFilter(),
    new NotFoundExceptionFilter(),
    new UnauthorizedExceptionFilter()
  );

  app.useGlobalInterceptors(new WrapResponseInterceptor(configService));

  await app.init();

  //Admin token for using in other requests
  const payload = getLoginSchema();
  const adminResponse = await request(app.getHttpServer()).post('/auth/signup').send(payload);

  return { app, adminResponse };
};
