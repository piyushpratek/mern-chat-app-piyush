import app from './src/app';
import logger from './config/logger';
import connectDB from './config/db';

void connectDB.connect();
const PORT = Number(process.env.PORT) ?? 5000;
const server = app.listen(PORT, () => {
  logger.success(`SERVER STARTED ON PORT ${PORT} `);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    // origin: '*', //  * is to diable all cors for all urls
    origin: 'http://127.0.0.1:5173',
  },
});

io.on('connection', (socket: any) => {
  logger.success('connected to socket.io');

  socket.on('setup', (userData: any) => {
    socket.join(userData._id);
    logger.success(userData._id);
    socket.emit('connected');
  });
  socket.on('join chat', (room: any) => {
    socket.join(room);
    logger.success('User Joined Room:' + room);
  });
});
