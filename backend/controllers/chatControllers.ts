import type { Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import Chat from '../models/chatModels';
import { RequestAuth } from '../types';

export const accessChat = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
      console.log('userId param not sent with request');
      res.sendStatus(400);
      return;
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      //[Todo] improve query with $in [sahil]
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
        res.status(200).send(FullChat);
      } catch (error: any) {
        res.status(400);
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
          res.status(200).send(results);
        });
    } catch (error: any) {
      res.send(400);
      throw new Error(error.message);
    }
  }
);
//fix later any
export const createGroupChat = asyncHandler(
  async (req: RequestAuth, res: any) => {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: 'Please Fill all the fields' });
    }
    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
      return res
        .status(400)
        .send('More than 2 uers are required to form a group chat');
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

      res.status(200).json(fullGroupChat);
    } catch (error: any) {
      res.status(400);
      throw new Error(error.message);
    }
  }
);
