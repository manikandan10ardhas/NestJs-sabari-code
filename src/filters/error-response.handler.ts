import { ArgumentsHost, ConflictException } from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';

import { appConfig } from '@core/app.config';

export default (exception: ConflictException, host: ArgumentsHost) => {
  const APP_CONFIG = appConfig();
  const i18n = I18nContext.current(host);
  const ctx = host.switchToHttp();
  const response = ctx.getResponse<Response>();
  const status = exception.getStatus();
  const message = i18n?.t(exception.message) || exception.message;
  const name = i18n?.t(exception.name) || exception.name;
  const stack = exception.stack;

  return response.status(status).json({
    success: false,
    error: {
      message,
      name,
      ...(APP_CONFIG.enableDebug && { stack })
    },
    apiVersion: APP_CONFIG.apiReleaseVersion,
    statusCode: status
  });
};
