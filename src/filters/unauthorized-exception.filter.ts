import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';

import errorResponseHandler from './error-response.handler';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    return errorResponseHandler(exception, host);
  }
}
