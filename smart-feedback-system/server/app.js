const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// 💬 Setup Socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all during dev, restrict later
    methods: ["GET", "POST"],
  },
});

// Make `io` available in other files
app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api", feedbackRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
