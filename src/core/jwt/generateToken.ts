/* istanbul ignore file */

import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import { appConfig } from '@core/app.config';

interface IJwtPayload {
  data: {
    uid?: string;
    id?: number;
    account_id?: string;
    otp?: number;
    reissueUntil?: number;
  };
  expiresIn?: string | number;
  isRefreshToken?: boolean;
}

export default ({ data, expiresIn, isRefreshToken }: IJwtPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    const APP_CONFIG = appConfig();
    const tokenExpiresIn: string | number = (expiresIn ?? APP_CONFIG.jwt.secretTokenExpiresIn) as number;

    const secret = (isRefreshToken ? APP_CONFIG.jwt.secretRefreshToken : APP_CONFIG.jwt.secret) as string;

    jwt.sign({ data, jti: v4() }, secret, { algorithm: 'HS256', expiresIn: tokenExpiresIn }, (err, token) => {
      if (err) reject(err);
      resolve(`${token}`);
    });
  });
};
