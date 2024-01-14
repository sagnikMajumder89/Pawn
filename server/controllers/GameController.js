const GameRoom = require("../models/GameRoom");

const getGameData = async (req, res) => {
  try {
    const { roomId } = req.params;
    const game = await GameRoom.findById(roomId);
    if (!game) return res.status(404).json({ message: "Game not found" });
    const userId = req.user._id;
    const color = game.white == userId ? "white" : "black";
    console.log("User: ", req.user.username, "Color: ", color);
    return res.status(200).json({ color, userId, roomId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getGameData };
