const { Chess } = require("chess.js");
const GameRoom = require("../models/GameRoom");

const handleMove = async (socket, data) => {
  const { roomId, userId, move } = data;
  socket.to(roomId).emit("move", move);
  const currentPosi = new Chess(move);

  if (currentPosi.isGameOver())
    await GameRoom.updateOne(
      { _id: roomId },
      { currentFen: move, isOver: true }
    );
  else await GameRoom.updateOne({ _id: roomId }, { currentFen: move });
};

module.exports = handleMove;
