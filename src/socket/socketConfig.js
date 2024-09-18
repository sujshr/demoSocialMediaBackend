const socketIO = require("socket.io");

const initializeSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["*"],
      credentials: true,
    },
  });

  return io;
};

module.exports = { initializeSocketIO };
