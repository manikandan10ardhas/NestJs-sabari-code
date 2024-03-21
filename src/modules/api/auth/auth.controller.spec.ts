import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from '@core/guard/auth.guard';

describe('AuthController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            signin: jest.fn(),
            findAll: jest.fn(),
            loginSecret: jest.fn(),
            login: jest.fn(),
            getToken: jest.fn(),
            refreshToken: jest.fn()
          }
        }
      ],
      imports: []
    })
      .overrideGuard(AuthGuard)
      .useValue(true)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Signup', () => {
    it('Signup... It should return a token', async () => {
      const payload = {
        email: 'test@gmail.com',
        password: 'admin@123'
      };
      const reponse = { token: '', refreshToken: '' };
      jest.spyOn(authService, 'signup').mockResolvedValue(reponse);

      const result = await controller.signup(payload);

      expect(result).toBe(reponse);
    });
  });

  describe('Signin', () => {
    it('Signin... It should return a token', async () => {
      const payload = {
        email: 'test@gmail.com',
        password: 'admin@123'
      };
      const reponse = { token: '', refreshToken: '' };
      jest.spyOn(authService, 'signin').mockResolvedValue(reponse);
      const result = await controller.signin(payload);

      expect(result).toBe(reponse);
    });
  });

  describe('findAll', () => {
    it('findAll... It should return a token', async () => {
      const payload = { limit: 1, page: 0, paginate: true };

      jest
        .spyOn(authService, 'findAll')
        .mockResolvedValueOnce({ count: 1, data: [{ uid: 'abc', id: 1, email: '' }] as any });
      const result = await controller.getUsers(payload);

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toEqual(
        expect.objectContaining({
          uid: expect.any(String)
        })
      );
    });
  });

  describe('login-secret', () => {
    it('loginSecret... should return token and expiryTime', async () => {
      const payload = { email: 'abc@mail.com' };

      jest.spyOn(authService, 'loginSecret').mockResolvedValue({ otp: 111111, expiresIn: '' });
      const result = await controller.loginSecret(payload);

      expect(typeof result).toEqual('object');
    });
  });

  describe('login', () => {
    it('login.... should return user details', async () => {
      const payload = { email: 'abc@mail.com', code: 111111 };

      jest.spyOn(authService, 'login').mockResolvedValueOnce({ user: {}, token: '', refreshToken: '' });
      const result = await controller.login(payload);

      expect(typeof result).not.toEqual(null);
    });
  });

  describe('getTokenByRefreshToken', () => {
    it('getTokenByRefreshToken... It should return a token', async () => {
      const payload = {
        refreshToken: '',
        isStation: false
      };
      jest.spyOn(authService, 'refreshToken').mockResolvedValue({ token: '' });
      const result = await controller.getTokenByRefreshToken(payload);

      expect(typeof result).toBe('object');
    });
  });
});
