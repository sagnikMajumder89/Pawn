require("dotenv").config();
require("./utils/dbConnect")();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = Number(process.env.PORT) || 8000;
const userRoutes = require("./routes/UserRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");
const alluserDelete = require("./utils/devUtils/alluserDelete");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Socket.io
const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
  },
});
// io.on("connection", (socket) => {
//   socket.on("chess", (move) => {
//     io.emit("chess", move);
//   });
// });

app.use("/api/v1/users", userRoutes);

//for dev purposes only
app.get("/deleteAllUsers", (req, res) => {
  alluserDelete();
  res.send("All users deleted");
});

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
