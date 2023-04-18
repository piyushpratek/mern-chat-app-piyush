import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { NODE_ENV } from '../config/config';
import { HttpStatus } from '../http-status.enum';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res: Response,
  next
): void => {
  console.log('---Error Handler Middleware--:');
  console.log({ name: err.name, message: err.message });
  console.log('---Error Stack---', err.stack, '\n\n');
  const statusCode =
    res.statusCode === HttpStatus.OK
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : res.statusCode;
  //handle any other error
  res.status(statusCode).end();
  res.json({
    message: err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
  });
};
