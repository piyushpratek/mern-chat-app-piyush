import express from 'express';
import { Application } from 'express';
import { errorHandler, notFound } from '../middleware/errorMiddleware';
import chatRoutes from '../routes/chatRoutes';
import userRoutes from '../routes/userRoutes';
import messageRoutes from '../routes/messageRoutes';
import path from 'path';

// const chats = require('../data/data'); //imported chats
import cors from 'cors';
const app: Application = express();

app.use(express.json()); //to accept json data
app.use(cors());
app.get('/api/health', (req, res) => {
  res.send('Api is Running');
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

const reactBuildPath = path.join('./react-static');
console.log('reactBuildPath?', reactBuildPath);
const staticMiddleware = express.static(reactBuildPath);
app.use(staticMiddleware);
app.use('*', staticMiddleware);

const assetsPath = path.join('./react-static/assets');
app.use('/assets', express.static(assetsPath));

// TODO-SAHIL: Check if below middlewares are running along with new static file serving middlewares.
app.use(notFound);
app.use(errorHandler);

export default app;
