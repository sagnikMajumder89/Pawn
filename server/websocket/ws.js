const gameModel = require("../models/GameRoom");
const ws = (socket) => {
  console.log(`Socket: ${socket.id}`);

  //------------Join room------------//
  socket.on("join-room", async (data) => {
    const { roomId, userId } = data;
    console.log(`User ${userId} joining room ${roomId}`);
    socket.join(roomId);

    // Check if room exists
    const gameExists = await gameModel.exists({ _id: roomId });
    if (!gameExists) {
    }

    if (rooms[roomId]["w"] == userId || rooms[roomId]["b"] == userId) {
      const color = rooms[roomId]["w"] == userId ? "w" : "b";
      socket.emit("join-room", { color, userId });
      return;
    }
    let color = "";
    if (rooms[roomId]["w"] == null) {
      rooms[roomId]["w"] = userId;
      color = "w";
    } else if (rooms[roomId]["b"] == null) {
      rooms[roomId]["b"] = userId;
      color = "b";
    } else {
      rooms[roomId]["spectators"].push(userId);
      color = "s";
    }
    socket.emit("join-room", { color, userId });
  });

  //------------Move------------//
  socket.on("move", (data) => {
    const { roomId, userId, move } = data;
    console.log(`User ${userId} made move ${move} in room ${roomId}`);
    socket.to(roomId).emit("move", move);
  });
};

module.exports = ws;
