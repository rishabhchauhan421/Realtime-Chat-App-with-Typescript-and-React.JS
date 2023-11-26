import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from './typings';

const app = express();
const httpServer = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    // allowedHeaders: ['sockets.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connect', (socket) => {
  console.log(`${socket.id} is Connected`);
  socket.on('clientMsg', (data) => {
    if (data.room === '') {
      io.sockets.emit('serverMsg', data);
    } else {
      socket.join(data.room);
      io.to(data.room).emit('serverMsg', data);
    }
    console.log(`Msg Recieved:${data}`);
  });
});

httpServer.listen(3000, () => {
  console.log('server is listening 3000');
});
