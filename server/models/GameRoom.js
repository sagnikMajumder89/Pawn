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
  isOver: {
    type: Boolean,
    default: false,
  },
  winner: {
    type: String,
    default: "",
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
    default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
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
  LastMoveTimew: {
    type: Date,
    default: null,
  },
  remTimew: {
    type: Number,
    default: 0,
  },
  remTimeb: {
    type: Number,
    default: 0,
  },
  LastMoveTimeb: {
    type: Date,
    default: null,
  },
  pgn: {
    type: String,
    default: "",
  },
});

const GameRoom = mongoose.model("GameRoom", gameRoomSchema);

module.exports = GameRoom;
