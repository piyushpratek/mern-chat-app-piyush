import type { Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import Chat from '../models/chatModels';
import { RequestAuth } from '../types';
import { HttpStatus } from '../http-status.enum';

export const accessChat = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
      console.log('userId param not sent with request');
      return void res.sendStatus(400);
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      //[Todo] improve query with $in [sahil]
      // $eq=equal
      $and: [
        { users: { $elemMatch: { $eq: req.user?._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate('users', '-password')
      .populate('latestMessage');

    isChat = (await User.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'name pic email',
    })) as any;

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [req.user?._id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          'users',
          '-password'
        );
        res.status(HttpStatus.OK).send(FullChat);
      } catch (error: any) {
        res.status(HttpStatus.BAD_REQUEST);
        throw new Error(error.message);
      }
    }
  }
);

export const fetchChats = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user?._id } } })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .then(async (results: any) => {
          results = await User.populate(results, {
            path: 'latestMessage.sender',
            select: 'name pic email',
          });
          res.status(HttpStatus.OK).send(results);
        });
    } catch (error: any) {
      res.send(400);
      throw new Error(error.message);
    }
  }
);
export const createGroupChat = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    if (!req.body.users || !req.body.name) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Please Fill all the fields' });
      return;
    }
    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send('More than 2 uers are required to form a group chat');
      return;
    }
    users.push(req.user);

    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');

      res.status(HttpStatus.OK).json(fullGroupChat);
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST);
      throw new Error(error.message);
    }
  }
);
