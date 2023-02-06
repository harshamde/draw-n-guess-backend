const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { SOCKET_CONNECTION } = require('./common/socketEvents');
const controllers = require('./controller/controllers');

//=======================================================================================================

const app = express();

const httpServer = http.createServer(app);

//======================================= SOCKET CONNECTION ===============================================
//#region socket

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["get", "post"]
  }
});


io.on('connection', (socket) => {
  socket.emit(SOCKET_CONNECTION, { status: "SUCCESS", message: "Successfully connected to socket!" });

  socket.onAny((event, data) => {
    controllers.getSocketController().handleSocketEvents({ socket, event, data });
  });

});

//#endregion

//========================================================================================================

app.get("/test", (request, response) => {
  response.json({ status: "SUCCESS" });
});


httpServer.listen(9000, () => {
  console.log(`===================================
  🚀 Listening at port 9000 🚀
===================================`);
});