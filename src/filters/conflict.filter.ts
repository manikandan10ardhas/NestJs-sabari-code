import { ArgumentsHost, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';

import errorResponseHandler from './error-response.handler';

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    return errorResponseHandler(exception, host);
  }
}
