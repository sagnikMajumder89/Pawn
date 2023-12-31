const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//Check if user is authenticated
const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("Not authorized, no user found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { isAuthenticated };
