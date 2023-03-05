import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../config/generateToken';
import User from '../models/userModel';

interface UserType {
  name: string;
  email: string;
  password: string;
  pic: string;
}

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, pic } = req.body as UserType;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please Enter all the fields');
  }

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error('User Already Exits');
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400);
    throw new Error('Failed To Create the User');
  }
});

const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
// /api/user?search=piyush -? query providing
// to take a request from our api we use params but in this case we use query and . then name of the query
const allUsers = asyncHandler(async (req: Request, res: Response) => {
  const keyword = req.query.search
    ? // console.log('keyword?', keyword);
      {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
