import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

import errorResponseHandler from './error-response.handler';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    return errorResponseHandler(exception, host);
  }
}
