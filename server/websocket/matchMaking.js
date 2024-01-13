const User = require("../models/User");
const GameRoom = require("../models/GameRoom");
const matchMaking = async (io, queue, data) => {
  try {
    data.time.duration =
      data.time.hours * 3600 + data.time.minutes * 60 + data.time.seconds;
    let isMatched = false;

    //find user
    const user = await User.findById(data.userId);
    if (!user) return;
    data.rating = user.rating;

    //check if user is already in queue
    if (queue.find((user) => user.userId === data.userId)) return;

    //check if user is already in game

    //Queue logic
    for (let i = 0; i < queue.length; i++) {
      if (
        queue[i].rating - data.rating <= 200 ||
        data.rating - queue[i].rating <= 200
      ) {
        const user2 = await User.findById(queue[i].userId);

        //create game
        const newGameRoom = new GameRoom({
          white: queue[i].userId,
          black: data.userId,
          spectators: [],
          duration: data.time.duration,
          increment: data.time.increment,
          whiteStartTime: new Date(),
          blackStartTime: new Date(),
          remTimew: data.time.duration, //change to user input
          remTimeb: data.time.duration,
          pgn: "",
        });
        await newGameRoom.save();

        //send gameDetails to both users
        io.to(queue[i].socketId).emit("gameFound", {
          fen: newGameRoom.currentFen,
          roomId: newGameRoom._id,
          color: "white",
          over: false,
          time: newGameRoom.remTimew,
          opponent: {
            username: user.username,
            rating: user.rating,
            profilePicture: user.profilePicture,
          },
        });

        io.to(data.socketId).emit("gameFound", {
          fen: newGameRoom.currentFen,
          roomId: newGameRoom._id,
          color: "black",
          time: newGameRoom.remTimeb,
          over: false,
          opponent: {
            username: user2.username,
            rating: user2.rating,
            profilePicture: user2.profilePicture,
          },
        });
        console.log("Match between: ", user.username, user2.username);
        isMatched = true;
        queue.splice(i, 1);
        break;
      }
    }
    if (!isMatched) queue.push(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = matchMaking;
