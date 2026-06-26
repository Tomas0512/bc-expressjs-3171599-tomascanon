import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Datos de entrada inválidos',
      issues: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    logger.warn(err.message);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  const isProduction = process.env['NODE_ENV'] === 'production';
  logger.error(err instanceof Error ? err.message : 'Unknown error');
  res.status(500).json({
    error: 'Internal Server Error',
    message: isProduction ? 'Error interno del servidor' : (err instanceof Error ? err.message : 'Unknown error'),
    ...(isProduction ? {} : { stack: err instanceof Error ? err.stack : undefined }),
  });
}
