import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException } from '@nestjs/common';

import errorResponseHandler from './error-response.handler';

@Catch(ForbiddenException)
export class ForBiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    return errorResponseHandler(exception, host);
  }
}
