/* istanbul ignore file */

import * as jwt from 'jsonwebtoken';

import { appConfig } from '@core/app.config';

interface IOptions {
  readonly token: string;
  readonly secretOrKey?: string | Buffer;
  readonly code?: number;
  readonly validateIsFalse?: boolean;
}

export default async ({
  token,
  code,
  secretOrKey,
  validateIsFalse
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
IOptions): Promise<boolean | void | Error | Record<string, any>> => {
  try {
    const APP_CONFIG = appConfig();
    const secret = secretOrKey ?? APP_CONFIG.jwt.secret;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, otp }: any = jwt.verify(`${token}`, secret as string);

    if (validateIsFalse) {
      return data;
    }

    if (code && +otp === +code) {
      return true;
    }

    throw new Error('Invalid verification code');
  } catch (error) {
    if (validateIsFalse) return;
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError ||
      error instanceof jwt.TokenExpiredError
    ) {
      throw new TypeError('Invalid verification code');
    }
    throw error;
  }
};
