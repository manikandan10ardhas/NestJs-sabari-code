import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import errorResponseHandler from './error-response.handler';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    return errorResponseHandler(exception, host);
  }
}
