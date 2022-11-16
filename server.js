const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { joinRoom, createRoom } = require('./socketHelper');

//=======================================================================================================

const app = express();

const httpServer = http.createServer(app);

//======================================= SOCKET CONNECTION ===============================================
//#region socket

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["get", "post"]
  }
});


io.on('connection', (socket) => {
  socket.emit('connected', { status: "SUCCESS", message: "Successfully connected to socket!" });

  socket.on('create-room', async (data, callback) => {
    callback(await createRoom(socket, data));
  });

  socket.on('join-room', async (data, callback) => {
    callback(await joinRoom(socket, data));
  });
  
  // socket.emit("connected", { socketId: socket.id, room: socket.handshake.query.name });

});

//#endregion

//========================================================================================================

httpServer.listen(9000, () => {
  console.log(` 
  -----------------------------------
     🚀 Listening at port 9000 🚀
  -----------------------------------
  `);
});