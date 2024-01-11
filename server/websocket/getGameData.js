const GameRoom = require("../models/GameRoom");

const getGameData = async (io, socket, data) => {
  const { userId, roomId, socketId } = data;
  const gameRoom = await GameRoom.findById(roomId)
    .populate("white")
    .populate("black");
  if (!gameRoom) return;
  const color = gameRoom.white._id == userId ? "white" : "black";
  let opponent;
  if (color === "white") {
    opponent = {
      username: gameRoom.black.username,
      rating: gameRoom.black.rating,
      profilePicture: gameRoom.black.profilePicture,
    };
  } else {
    opponent = {
      username: gameRoom.white.username,
      rating: gameRoom.white.rating,
      profilePicture: gameRoom.white.profilePicture,
    };
  }
  io.to(socketId).emit("gameFound", {
    fen: gameRoom.currentFen,
    roomId,
    color,
    over: gameRoom.isOver,
    opponent,
  });
};
module.exports = getGameData;
