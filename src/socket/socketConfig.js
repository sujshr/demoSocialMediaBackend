const socketIO = require("socket.io");

const initializeSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*", // Allow any origin
      methods: ["*"], // Allow all HTTP methods
    },
  });

  return io;
};

module.exports = { initializeSocketIO };
