require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const PORT = Number(process.env.PORT) || 3000;
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chess", (move) => {
    io.emit("chess", move);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
z;
