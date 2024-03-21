import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';

import errorResponseHandler from './error-response.handler';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    return errorResponseHandler(exception, host);
  }
}
