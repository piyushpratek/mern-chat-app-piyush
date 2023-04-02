import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { RequestAuth } from '../types';
import logger from '../config/logger';
import { HttpStatus } from '../http-status.enum';

import Message from '../models/messageModel';
import User from '../models/userModel';
import Chat from '../models/chatModels';

export const sendMessage = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      logger.success('Invalid data passed into request');
      return res.sendStatus(HttpStatus.BAD_REQUEST);
    }
    var newMessage = {
      sender: req.user?._id,
      content: content,
      chat: chatId,
    };
    try {
      var message = await Message.create(newMessage);
      message = await message.populate('sender', 'name pic');
      message = await message.populate('chat');
      message = await User.populate(message, {
        path: 'chat.users',
        select: 'name pic email',
      });
      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });
      res.json(message);
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST);
      throw new Error(error.message);
    }
  }
);

export const allMessage = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate('sender', 'name pic email')
        .populate('chat');

      res.json(messages);
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST);
      throw new Error(error.message);
    }
  }
);
