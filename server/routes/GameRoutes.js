const router = require("express").Router();
const GameRoom = require("../models/GameRoom");
const User = require("../models/User");

//------------Create room------------//
router.post("/create", async (req, res) => {
  try {
    const {
      white,
      black,
      increment,
      duration,
      whiteStartTime,
      blackStartTime,
    } = req.body;
    const newGameRoom = new GameRoom({
      white,
      black,
      increment,
      duration,
      whiteStartTime,
      blackStartTime,
    });
    await newGameRoom.save();
    res.status(200).json({ message: "Room created" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
