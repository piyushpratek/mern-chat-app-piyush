import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../config/generateToken';
import { HttpStatus } from '../http-status.enum';
import User, { UserType } from '../models/userModel';
import { RequestAuth } from '../types';

export const registerUser = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    const { name, email, password, pic } = req.body as UserType;

    if (!name || !email || !password) {
      res.status(HttpStatus.BAD_REQUEST);
      throw new Error('Please Enter all the fields');
    }

    const userExits = await User.findOne({ email });

    if (userExits) {
      res.status(HttpStatus.BAD_REQUEST);
      throw new Error('User Already Exits');
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(HttpStatus.CREATED).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST);
      throw new Error('Failed To Create the User');
    }
  }
);

export const authUser = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    const { email, password } = req.body;
    const user: UserType | null = await User.findOne({ email });
    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED);
      return;
    }
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED);
      throw new Error('Invalid Email or Password');
    }
  }
);
// /api/user?search=piyush -? query providing
// to take a request from our api we use params but in this case we use query and . then name of the query
export const allUsers = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    const searchFilter = {
      $or: [
        { name: { $regex: req.query?.search, $options: 'i' } },
        { email: { $regex: req.query?.search, $options: 'i' } },
      ],
    };

    const filter = req.query?.search ? searchFilter : {};
    // console.log('keyword?', keyword);

    //$ne=not equal
    const users = await User.find(filter).find({
      _id: { $ne: req.user?._id },
    });
    res.send(users);
  }
);
