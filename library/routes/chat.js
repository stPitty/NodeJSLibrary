const express = require('express');
const router = express.Router();
const { Server } = require('socket.io');

function socket(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`user ${id} has been connected`)
    const { room } = socket.handshake.query;

    socket.on('disconnect', () => {
      console.log(`user ${id} has been disconnected`);
    });

    socket.join(room);

    socket.on('chat-message', (msg) => {
      console.log('message: ' + msg);
      socket.to(room).emit('chat-message', msg);
      socket.emit('chat-message', msg);
    });
  });
}

router.get('/', (req, res) => {
  res.render('chat', {
    title: 'Чат'
  });
})

module.exports = {
  chatRouter: router,
  socket: socket,
}