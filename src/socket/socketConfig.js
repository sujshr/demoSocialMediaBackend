const socketIO = require("socket.io");

const initializeSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["*"],
    },
  });

  return io;
};

module.exports = { initializeSocketIO };
