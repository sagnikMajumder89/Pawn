const { Chess } = require("chess.js");
const GameRoom = require("../models/GameRoom");

const handleMove = async (socket, data) => {
  try {
    const { roomId, move, color } = data;
    const currentPosi = new Chess(move);
    const game = await GameRoom.findById(roomId);
    if (color === "white") {
      const diff = !game.LastMoveTimew
        ? 0
        : (new Date(data.date) - game.LastMoveTimew) / 1000;
      let remTimew = game.remTimew - diff;
      if (remTimew < 0) remTimew = 0;
      if (currentPosi.isGameOver()) {
        game.isOver = true;
        game.currentFen = move;
        game.LastMoveTimew = new Date(data.date);
        game.remTimew = remTimew;
      } else {
        game.currentFen = move;
        game.LastMoveTimew = new Date(data.date);
        game.remTimew = remTimew;
      }
      socket.to(roomId).emit("move", { move, time: remTimew });
    } else {
      const diff = !game.LastMoveTimeb
        ? 0
        : (new Date(data.date) - game.LastMoveTimeb) / 1000;
      let remTimeb = game.remTimeb - diff;
      if (remTimeb < 0) remTimeb = 0;
      if (currentPosi.isGameOver()) {
        game.isOver = true;
        game.currentFen = move;
        game.LastMoveTimeb = new Date(data.date);
        game.remTimeb = remTimeb;
      } else {
        game.currentFen = move;
        game.LastMoveTimeb = new Date(data.date);
        game.remTimeb = remTimeb;
      }
      socket.to(roomId).emit("move", { move, time: remTimeb });
    }
    await game.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = handleMove;
