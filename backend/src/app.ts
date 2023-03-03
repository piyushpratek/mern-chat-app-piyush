import express from 'express';
import { Application } from 'express';

const chats = require('../data/data'); //imported chats

const userRoutes = require('../routes/userRoutes');

const app: Application = express();

app.get('/', (req, res) => {
  res.send('Api is Running');
});

app.use('/api/user', userRoutes);

export default app;
