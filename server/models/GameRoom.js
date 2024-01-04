const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameRoomSchema = new Schema({
  white: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  black: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  spectators: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  currentFen: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  increment: {
    type: Number,
    required: true,
  },
  whiteStartTime: {
    type: Date,
    required: true,
  },
  blackStartTime: {
    type: Date,
    required: true,
  },
  pgn: {
    type: String,
    default: "",
  },
});

const GameRoom = mongoose.model("GameRoom", gameRoomSchema);

module.exports = GameRoom;