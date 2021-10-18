const express = require("express");
const app = express();
const connectDB = require("./config/db");
var cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("./socket");

require("dotenv").config({ path: "./config/config.env" });

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", require("./router/auth"));

const server = app.listen(3010, () => {
  console.log("Server Running on ", 3010);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//socket
socket.sockets(io);
app.set("socketio", io);
