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
    origin: '*', //  * is to diable all cors for all urls
    // origin: 'http://127.0.0.1:5173', // To secure only local vite dev server.
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

  socket.on('typing', (room: any) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room: any) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved: any) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return logger.success('chat.users not defined');

    chat.users.forEach((user: any) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved); //in means inside that users room, emit/send that message
    });
  });
});
