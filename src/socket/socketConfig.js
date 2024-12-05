import { Server } from "socket.io";

const initializeSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["*"],
      credentials: true,
    },
  });

  return io;
};

export { initializeSocketIO };
