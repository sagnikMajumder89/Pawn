const gameModel = require("../../models/GameRoom");

const allGamesDelete = async () => {
  try {
    await gameModel.deleteMany({});
    console.log("All games deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = allGamesDelete;
