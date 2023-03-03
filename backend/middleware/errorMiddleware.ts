import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { NODE_ENV } from '../config/config';

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res: Response,
  next
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
  });
};
