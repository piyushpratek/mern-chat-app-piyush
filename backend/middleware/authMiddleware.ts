const jwt = require('jsonwebtoken');
import User from '../models/userModel';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

export const protect = asyncHandler(
  async (req: Request, res: Response, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        // decodes token id

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (error: any) {
        res.status(401);
        throw new Error('Not authorized,token failed');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized,no token');
    }
  }
);
