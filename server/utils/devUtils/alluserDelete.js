const User = require("../../models/User");

const alluserDelete = async () => {
  try {
    await User.deleteMany({});
    console.log("All users deleted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = alluserDelete;
