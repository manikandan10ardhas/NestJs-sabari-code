import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HeaderValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Perform header validation logic here
    const domainName = req.header('x-domain-name');
    if (!domainName) {
      throw new BadRequestException('Header x-domain-name is required');
    }

    // Pass the control to the next middleware or route handler
    next();
  }
}
