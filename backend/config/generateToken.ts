import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};
