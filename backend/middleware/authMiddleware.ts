import jwt from 'jsonwebtoken';
import User, { UserType } from '../models/userModel';
import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import { RequestAuth } from '../types';
import { HttpStatus } from '../http-status.enum';
import { JWT_SECRET } from '../config/config';

export const protect = asyncHandler(
  async (req: RequestAuth, res: Response, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        // decodes token id

        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .send({ message: 'User not found!' });
          return;
        }
        req.user = user;
        next();
      } catch (error: any) {
        res.status(HttpStatus.UNAUTHORIZED).end();
        throw new Error('Not authorized,token failed');
      }
    }
    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).end();
      throw new Error('Not authorized,no token');
    }
  }
);
