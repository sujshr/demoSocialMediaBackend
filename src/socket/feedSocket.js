const feedSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      console.log("Message received:", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export { feedSocket };
