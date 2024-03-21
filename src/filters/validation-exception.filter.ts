import { ArgumentsHost, Catch, ExceptionFilter, ValidationError } from '@nestjs/common';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';

import { appConfig } from '@core/app.config';

@Catch(I18nValidationException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);
    const errors = exception.errors;
    const APP_CONFIG = appConfig();
    const getAllErrors = this.extractErrors(errors, i18n);
    const response = host.switchToHttp().getResponse();
    return response.status(exception.getStatus()).json({
      success: false,
      error: {
        message: getAllErrors,
        name: 'BadRequestException',
        stack: exception.stack
      },
      apiVersion: APP_CONFIG.apiReleaseVersion,
      statusCode: exception.getStatus()
    });
  }

  extractErrors(errors: ValidationError[], i18n?: I18nContext<Record<string, unknown>>) {
    const errorList: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        const keys = Object.keys(error.constraints);
        const msg = i18n?.t(error.constraints[keys[0]].split('|')[0], { args: { property: error.property } }) as string;
        errorList.push(msg);
      }
    }

    return errorList;
  }
}
