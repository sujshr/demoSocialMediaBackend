import dotenv from "dotenv";
dotenv.config();  // This should be called at the very beginning of the file

import express from "express";
import http from "http";
import connectDB from "./src/connection/dbConnection.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import { initializeSocketIO } from "./src/socket/socketConfig.js";
import { feedSocket } from "./src/socket/feedSocket.js";
import { setIO } from "./src/controllers/postController.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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
