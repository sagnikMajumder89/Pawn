const getGameData = require("./getGameData");
const handleMove = require("./handleMove");
const matchMaking = require("./matchMaking");

const queue = [];

const ws = (io, socket) => {
  console.log(`User joined with: ${socket.id}`);

  //------------Join room------------//
  socket.on("joinRoom", (data) => {
    const { roomId } = data;
    socket.join(roomId);
  });

  //------------Match Making------------//
  socket.on("findGame", (data) => matchMaking(io, queue, data));

  //------------Get game data------------//
  socket.on("getGameData", (data) => getGameData(io, socket, data));

  //------------Move------------//
  socket.on("move", (data) => handleMove(socket, data));
};

module.exports = ws;
