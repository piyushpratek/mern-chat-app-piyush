import express from 'express';
import { Application } from 'express';
import { errorHandler, notFound } from '../middleware/errorMiddleware';
import chatRoutes from '../routes/chatRoutes';
import userRoutes from '../routes/userRoutes';
// const chats = require('../data/data'); //imported chats

const app: Application = express();

app.use(express.json()); //to accept json data
app.get('/', (req, res) => {
  res.send('Api is Running');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
