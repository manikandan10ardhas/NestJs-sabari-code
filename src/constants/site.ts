export const MAX_PAGINATION_LIMIT = 500;
export const DEFAULT_PAGINATION_LIMIT = 20;
export const DEFAULT_PAGINATION_OFFSET = 0;
export const DEFAULT_HOME_PAGINATION_LIMIT = 10;
export const DEFAULT_SORT_ORDER = [['created_at', 'desc']];
export const ONE_HOUR = 3600; // seconds
export const TWO_HOURS = 7200; // seconds

export const SEQUELIZE_BULK_LIMIT = 1000;
export const API_ROUTE_V1 = '/v1';

export const AUTH_SCHEME_NAME = 'JWT';

export const ROLES = {
  ADMIN: 1,
  USER: 2,
  CUSTOMER: 3
};

export const OTP = {
  secretOTPMaxReuse: 3,
  secretOTPExpiresIn: 3600,
  resendCode: 1
};

export const SECRET_OTP = {
  LENGTH: 6
};
export const STATUS = {
  ACTIVE: 1,
  INACTIVE: -1
};
export const RSA_ENCRYPTION = {
  METHOD: 'rsa',
  TYPE: 'pkcs1',
  FORMAT: 'pem',
  CIPHER: 'aes-256-cbc',
  OAEP_HASH: 'sha256'
};

export const COMMON_ROUTES = ['/auth/refresh-token', '/v1/user/me'];

export const MASTER_CATEGORY = {
  TRIVIA: 1,
  APP_SETTINGS: 2
};

export const REDIS_CONNECTION_MAX_RETRY = 3;
