const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(mongoUrl);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting to MongoDB:", error.message);
  }
};

module.exports = dbConnect;
