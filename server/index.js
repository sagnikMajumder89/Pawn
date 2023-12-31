require("dotenv").config();
require("./utils/dbConnect")();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const PORT = Number(process.env.PORT) || 8000;
const userRoutes = require("./routes/UserRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const io = new Server(server);
const cors = require("cors");

// io.on("connection", (socket) => {
//   socket.on("chess", (move) => {
//     io.emit("chess", move);
//   });
// });

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
