import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LingosSystemError } from '../exceptions/lingo-system.error';

@Catch(LingosSystemError)
export class LingosSystemErrorFilter implements ExceptionFilter {
  public catch(exception: LingosSystemError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.code).json({
      status: exception.code,
      error: exception.message,
    });
  }
}
