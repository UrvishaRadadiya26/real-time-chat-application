const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve index.html
app.use(express.static("public"));

// When a user connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive message from a user
  socket.on("chat message", (message) => {
    // Send message to everyone
    io.emit("chat message", message);
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Chat server running at http://localhost:3000");
});
