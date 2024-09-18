const socketIO = require("socket.io");

const initializeSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: true, // Allows any origin but still checks credentials
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true, // Allows sending cookies and other credentials
    },
  });

  return io;
};

module.exports = { initializeSocketIO };
