require("dotenv").config();

const express = require("express");
const http = require("http");
const connectDB = require("./src/connection/dbConnection");
const userRoutes = require("./src/routes/userRoutes");
const postRoutes = require("./src/routes/postRoutes");
const { initializeSocketIO } = require("./src/socket/socketConfig");
const { feedSocket } = require("./src/socket/feedSocket");
const { setIO } = require("./src/controllers/postController");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
 app.use(
   cors({
     origin: process.env.CLIENT_URI,
     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
     credentials: true,
   })
 );
 
// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Connect to MongoDB
connectDB();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocketIO(server);

// Set up Socket.IO listeners
feedSocket(io);

// Pass the io instance to the controller
setIO(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
