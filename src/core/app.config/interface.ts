export interface IAppConfig {
  timezone?: string;
  env?: string;
  apiReleaseVersion?: string;
  isProduction?: boolean;
  isStaging?: boolean;
  isQA?: boolean;
  isDev?: boolean;
  isLocal?: boolean;
  httpPort?: string;
  enableCors: boolean;
  enableDebug: boolean;
  domainName?: string;
  allowedOrigins?: string[];
  database: {
    host?: string;
    username?: string;
    password?: string;
    database?: string;
    port?: string;
    sequelize: {
      connectionOptions: {
        dialect?: string;
        logging: boolean;
        omitNull: boolean;
        timezone?: string;
        pool: {
          max: number;
          min: number;
          acquire: number;
          idle: number;
        };
      };
    };
  };
  cachingLibrary: {
    name?: string;
    enable: boolean;
    clientUrl?: string;
    password?: string;
  };
  jwt: {
    secret?: string;
    secretTokenExpiresIn?: string;
    algorithm?: Algorithm;
    secretRefreshToken?: string;
    secretRefreshTokenExpiresIn?: string;
  };

  staticOtp?: string;
}
