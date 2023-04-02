import express from 'express';
import { Application } from 'express';
import { errorHandler, notFound } from '../middleware/errorMiddleware';
import chatRoutes from '../routes/chatRoutes';
import userRoutes from '../routes/userRoutes';
import messageRoutes from '../routes/messageRoutes';
// const chats = require('../data/data'); //imported chats
import cors from 'cors';
const app: Application = express();

app.use(express.json()); //to accept json data
app.use(cors());
app.get('/', (req, res) => {
  res.send('Api is Running');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
