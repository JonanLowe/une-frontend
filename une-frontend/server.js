import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";
const app = express();
const server = createServer(app);

//ORIGIN here must be same as port used by VITE::::
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

io.on("connection", connected);

// socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });

//PORT HERE MUST BE THE SAME AS in socket.js

server.listen(4000, () => {
  console.log("Server Listening on port 4000");
});

let players = {};

function connected(socket) {
  console.log("New client connected, with id: " + socket.id);
  if (Object.keys(players).length === 0) {
    console.log("first player joined");
    players[socket.id] = { playerNumber: 1 };
    console.log(players);
    //create/populate player 1
  } else if (Object.keys(players).length === 1) {
    console.log("second player joined");
    players[socket.id] = { playerNumber: 2 };
    console.log(players);
  } else if (Object.keys(players).length > 1) {
    console.log("game room full");
    console.log(players);
    return false;
  }
  io.emit("updateConnections", players);
  socket.on("disconnect", function () {
    delete players[socket.id];
    console.log("Goodbye client with id " + socket.id);
    console.log("Current number of players: " + Object.keys(players).length);
    console.log(players);
    io.emit("updateConnections", players);
  });
  // socket.on('userCommands', data => {
  //     serverBalls[socket.id].left = data.left;
  //     serverBalls[socket.id].up = data.up;
  //     serverBalls[socket.id].right = data.right;
  //     serverBalls[socket.id].down = data.down;
  //     serverBalls[socket.id].action = data.action;
  //     console.log("command");
  // })
}
