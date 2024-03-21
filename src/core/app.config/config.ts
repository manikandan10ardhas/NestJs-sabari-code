import { IAppConfig } from './interface';

export default (): IAppConfig => ({
  timezone: process.env.TIMEZONE,
  env: process.env.NODE_ENV,
  apiReleaseVersion: process.env.API_RELEASE_VERSION,
  isProduction: process.env.NODE_ENV === 'production',
  isStaging: process.env.NODE_ENV === 'staging',
  isQA: process.env.NODE_ENV === 'qa',
  isDev: process.env.NODE_ENV === 'development',
  isLocal: process.env.NODE_ENV === 'local',
  httpPort: process.env.HTTP_PORT,
  enableCors: process.env.ENABLE_CORS === 'true' ? true : false,
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(','),
  enableDebug: process.env.ENABLE_DEBUG === 'true' ? true : false,
  domainName: process.env.TEST_WP_DOMAIN_HOST,
  database: {
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    sequelize: {
      connectionOptions: {
        dialect: process.env.DB_DIALECT,
        logging: process.env.DB_LOG_QUERY === 'true' ? true : false,
        omitNull: true,
        timezone: process.env.TIMEZONE,
        pool: {
          max: Number(process.env.DB_CONNECTION_MAX),
          min: Number(process.env.DB_CONNECTION_MIN),
          acquire: Number(process.env.DB_CONNECTION_ACQUIRE),
          idle: Number(process.env.DB_CONNECTION_IDLE)
        }
      }
    }
  },
  cachingLibrary: {
    name: process.env.CACHE_LIBRARY_NAME,
    enable: process.env.CACHE_ENABLED ? process.env.CACHE_ENABLED === 'true' : false,
    clientUrl: process.env.CACHE_CLIENT_URL,
    password: process.env.CACHE_PASSWORD
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    secretTokenExpiresIn: process.env.JWT_SECRET_TOKEN_EXPIRED_IN,
    algorithm: process.env.JWT_ALGORITHM as unknown as Algorithm,
    secretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN,
    secretRefreshTokenExpiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN
  },

  staticOtp: process.env.OTP_STATIC_LOGIN
});
