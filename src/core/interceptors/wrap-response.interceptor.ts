import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  body: T;
}

@Injectable()
export default class WrapResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const { message, ...body } = data; // Remove the 'message' property from the response body

        const i18n = I18nContext.current();
        const successMessage = message ? i18n?.t(message) || message : '';

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          success: true,
          body: body,
          apiVersion: this.configService.get('apiReleaseVersion') || '',
          message: successMessage
        };
      })
    );
  }
}
