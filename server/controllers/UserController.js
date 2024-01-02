const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//------------------Get User Details------------------//
const getUserDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }
  res.status(200).json(user);
});

//------------------Get User Details By Id------------------//
const getUserDetailsById = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .select("-password")
      .select("-email")
      .select("-friendRequestsSent")
      .select("-friendRequestsReceived")
      .select("-notifications");
    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//------------------Login------------------//
const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    //Check if user exists
    const UserExists = await User.findOne({ username });
    if (!UserExists) {
      res.status(400);
      throw new Error("User does not exist");
    }

    //Check if password is correct
    const isMatch = await bcrypt.compare(password, UserExists.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    //Create token
    const token = jwt.sign({ id: UserExists._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json({
      message: "User logged in successfully",
      token,
      user: {
        _id: UserExists._id,
        username: UserExists.username,
        email: UserExists.email,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//------------------Signup------------------//
const signup = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//------------------Check Auth------------------//
const checkAuth = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({ status: false });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(200).json({ status: false });
    }
    res.status(200).json({ status: true, user: req.user });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//------------------Logout------------------//
const logout = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No User to log out" });
    }
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//------------------Send Friend Request------------------//
const sendFriendRequest = asyncHandler(async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!friend) {
      res.status(400);
      throw new Error("User does not exist");
    }
    if (friendId == userId) {
      res.status(400);
      throw new Error("You cannot send a friend request to yourself");
    }
    if (user.friends.includes(friendId)) {
      res.status(400);
      throw new Error("You are already friends with this user");
    }
    if (user.friendRequestsSent.includes(friendId)) {
      res.status(400);
      throw new Error("You have already sent a friend request to this user");
    }
    if (user.friendRequestsReceived.includes(friendId)) {
      res.status(400);
      throw new Error("This user has already sent you a friend request");
    }
    user.friendRequestsSent.push(friendId);
    friend.friendRequestsReceived.push(userId);
    await user.save();
    await friend.save();
    res.json({ message: "Friend request sent successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

//------------------Accept Friend Request------------------//
const acceptFriendRequest = asyncHandler(async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!friend) {
      res.status(400);
      throw new Error("User does not exist");
    }
    if (friendId == userId) {
      res.status(400);
      throw new Error("You cannot accept this friend request");
    }
    if (user.friends.includes(friendId)) {
      res.status(400);
      throw new Error("You are already friends with this user");
    }
    if (user.friendRequestsReceived.includes(friendId)) {
      user.friends.push(friendId);
      friend.friends.push(userId);
      user.friendRequestsReceived = user.friendRequestsReceived.filter(
        (id) => id != String(friendId)
      );
      friend.friendRequestsSent = friend.friendRequestsSent.filter(
        (id) => id != String(userId)
      );
      await user.save();
      await friend.save();
      return res.json({ message: "Friend request accepted successfully" });
    } else {
      res.status(400);
      throw new Error("You have not received a friend request from this user");
    }
  } catch (error) {
    throw new Error(error);
  }
});

//------------------Remove friend request------------------//
const removeFriendRequest = asyncHandler(async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user._id;
    const friendReq = await User.findById(friendId);
    const user = await User.findById(userId);
    if (!friendReq) {
      res.status(400);
      throw new Error("User does not exist");
    }

    if (user.friendRequestsReceived.includes(friendId)) {
      user.friendRequestsReceived = user.friendRequestsReceived.filter(
        (id1) => id1 != friendId
      );
      friendReq.friendRequestsSent = friendReq.friendRequestsSent.filter(
        (id1) => id1 != String(userId)
      );
      await user.save();
      await friendReq.save();
      return res.json({ message: "Friend request removed successfully" });
    } else {
      res.status(400);
      throw new Error("You have not received a friend request from this user");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//------------------Get friend requests------------------//
const getFriendRequests = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("friendRequestsReceived");
    const friendRequests = user.friendRequestsReceived.map((friend) => {
      friend.password = undefined;
      return friend;
    });
    res.json(friendRequests);
  } catch (error) {
    throw new Error(error);
  }
});

//------------------Get friends------------------//
const getFriends = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("friends");
    const friends = user.friends.map((friend) => {
      friend.password = undefined;
      return friend;
    });
    res.json(friends);
  } catch (error) {
    throw new Error(error);
  }
});

//------------------Search by username------------------//
const searchByUsername = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }
    // Use a regular expression for case-insensitive search
    const regex = new RegExp(username, "i");
    let users = await User.find({
      username: { $regex: regex },
      _id: { $ne: req.user._id }, // Exclude the current user
    }).limit(15); // Limit the number of users fetched

    const usersFiltered = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        rating: user.rating,
        profilePicture: user.profilePicture,

        // Add other fields you want to return
      };
    });

    res.json(usersFiltered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
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
};
