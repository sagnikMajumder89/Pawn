const GameRoom = require("../models/GameRoom");
const { Chess } = require("chess.js");
const getGameData = async (io, socket, data) => {
  console.log(data);
  try {
    const { userId, roomId, socketId } = data;
    const gameRoom = await GameRoom.findById(roomId)
      .populate("white")
      .populate("black");
    if (!gameRoom) return;
    const currPosi = new Chess(gameRoom.currentFen);
    const color = gameRoom.white._id == userId ? "white" : "black";
    let opponent;
    let timew;
    let timeb;
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
    timew =
      currPosi.turn() !== "w"
        ? gameRoom.remTimew
        : gameRoom.remTimew -
          (new Date(data.date) - gameRoom.LastMoveTimew) / 1000;
    if (timew < 0) timew = 0;
    timeb =
      currPosi.turn() !== "b"
        ? gameRoom.remTimeb
        : gameRoom.remTimeb -
          (new Date(data.date) - gameRoom.LastMoveTimeb) / 1000;
    if (timeb < 0) timeb = 0;
    io.to(socketId).emit("gameFound", {
      fen: gameRoom.currentFen,
      roomId,
      color,
      over: gameRoom.isOver,
      opponent,
      timew,
      timeb,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = getGameData;
