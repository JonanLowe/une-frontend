import { createServer } from "node:http";
import { Server } from "socket.io";
import { socket } from "./src/socket.js";
import express from "express";
const app = express();
const server = createServer(app);

//ORIGIN here must be same as port used by Vite
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

io.on("connection", connected);

socket.on("disconnect", () => {
  console.log("A user disconnected");
});

//PORT here must be the same as in socket.js

server.listen(4000, () => {
  console.log("Server Listening on port 4000");
});

// GAME SETUP

import { Player } from "./src/utils/une.js";

const totalPlayers = [];

function connected(socket) {
  console.log("New client connected, with id: " + socket.id);
  if (totalPlayers.length === 0) {
    totalPlayers[0] = new Player("Player 1", socket.id);
  } else if (totalPlayers.length === 1) {
    console.log("second player joined");
    if (totalPlayers[0].username === "Player 1") {
      totalPlayers[1] = new Player("Player 2", socket.id);
    } else if (totalPlayers[0].username === "Player 2") {
      totalPlayers[1] = new Player("Player 1", socket.id);
    }
  } else if (totalPlayers.length > 1) {
    console.log("game room full");
    return false;
  }
  io.emit("updateConnections", totalPlayers);

  socket.on("disconnect", function () {
    if (totalPlayers[0].socketID === socket.id) {
      console.log(totalPlayers[0], "it's this one - 0");
      totalPlayers.splice(0, 1);
      console.log(totalPlayers);
    } else if (totalPlayers[1].socketID === socket.id) {
      console.log(totalPlayers[1], "it's this one - 1");
      totalPlayers.splice(1, 1);
      console.log(totalPlayers);
    }

    console.log("Goodbye client with id " + socket.id);
    console.log("Current number of players: " + totalPlayers.length);
    console.log(totalPlayers);
    io.emit("updateConnections", totalPlayers);
  });
}
