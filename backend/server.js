

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Frontend ka URL (React Vite)
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    // console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on("message", ({ roomId, message }) => {
    socket.to(roomId).emit("message", message); // Sirf room ke andar dusre user ko message jayega
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
//   console.log("Server running on port 5000");
});
