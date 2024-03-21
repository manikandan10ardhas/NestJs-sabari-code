import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { loginSchema, getTokenSchema } from './_mocks_/user';
import { init } from './helpers';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let adminResponse: any = null;

  beforeEach(async () => {
    //Initiating nest runtime environment
    ({ app, adminResponse } = await init());
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/v1/user').expect(200);
  });

  it('Signup success', async () => {
    const result = await request(app.getHttpServer()).post('/auth/signup').send(loginSchema);
    expect(result.status).toEqual(HttpStatus.CREATED);
    expect(result.body.success).toEqual(true);
    expect(typeof result.body.body.token).toBe('string');
  });

  it('Refresh token success', async () => {
    const result = await request(app.getHttpServer())
      .post('/auth/refresh-token')
      .send({ refreshToken: `Bearer ${adminResponse.body.body.refreshToken}` });
    expect(result.status).toEqual(HttpStatus.OK);
    expect(result.body.success).toEqual(true);
    expect(typeof result.body.body).toBe('object');
  });

  it('Refresh token - throw error when required details are not passed', async () => {
    const result = await request(app.getHttpServer()).post('/auth/refresh-token').send({});

    expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(result.body.success).toEqual(false);
    expect(result.body.error).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        message: expect.any(String)
      })
    );
  });

  it('Refresh token - throw error when invalid refresh token passed', async () => {
    const result = await request(app.getHttpServer())
      .post('/auth/refresh-token')
      .send({ refreshToken: `Bearer ${adminResponse.body.body.token}` });
    expect(result.status).toEqual(HttpStatus.UNAUTHORIZED);
    expect(result.body.success).toEqual(false);
    expect(result.body.error).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        message: expect.any(String)
      })
    );
  });
});
