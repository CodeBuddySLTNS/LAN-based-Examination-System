const { Server } = require("socket.io");

const socketConnection = (server) => {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log(socket.handshake.query.name, "connected");
  });
};

module.exports = socketConnection;
