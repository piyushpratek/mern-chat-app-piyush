import type { Request } from 'express';
import type { Types } from 'mongoose';
import { UserType } from './models/userModel';

export interface RequestAuth extends Request {
  user?: UserType;
}

export interface CustomRequest<T> extends Request {
  user?: UserType;
  body: T;
}
