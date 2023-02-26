import express from 'express';
import { Application } from 'express';

const chats = require('../data/data'); //imported chats

const app: Application = express();

app.get('/', (req, res) => {
  res.send('Api is Running');
});

app.get('/api/chat', (req, res) => {
  res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
  // console.log(req.params.id);
  let singleChat = chats.chats.find((e: any) => e._id === req.params.id);
  res.send(singleChat);
});

export default app;
