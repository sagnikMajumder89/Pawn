const userRouter = require("express").Router();
const {
  getUserDetails,
  login,
  signup,
  checkAuth,
  logout,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriendRequest,
  getFriendRequests,
  getFriends,
  searchByUsername,
  getUserDetailsById,
} = require("../controllers/UserController");

const { isAuthenticated } = require("../middleware/isAuthenticated");

userRouter.get("/", isAuthenticated, getUserDetails);
userRouter.get("/user/:userId", isAuthenticated, getUserDetailsById);
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.get("/checkauth", isAuthenticated, checkAuth);
userRouter.post("/sendFriendRequest", isAuthenticated, sendFriendRequest);
userRouter.post("/acceptFriendRequest", isAuthenticated, acceptFriendRequest);
userRouter.post("/removeFriendRequest", isAuthenticated, removeFriendRequest);
userRouter.get("/getFriendRequests", isAuthenticated, getFriendRequests);
userRouter.get("/getFriends", isAuthenticated, getFriends);
userRouter.post("/searchByUsername", isAuthenticated, searchByUsername);

module.exports = userRouter;
