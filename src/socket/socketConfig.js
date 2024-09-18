const socketIO = require("socket.io");

const initializeSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
  });

  return io;
};

module.exports = { initializeSocketIO };
