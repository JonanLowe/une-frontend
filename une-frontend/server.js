import { createServer } from "node:http";
import { Server } from "socket.io";
import { socket } from "./src/socket.js";
import express from "express";
const app = express();
const server = createServer(app);

//ORIGIN here must be same as port used by Vite
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", connected);

socket.on("disconnect", () => {
  console.log("A user disconnected");
});

//PORT here must be the same as in socket.js

server.listen(4002, () => {
  console.log("Server Listening on port 4002");
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

  socket.on("buttonPressed", (buttonPressedState) => {
    io.emit("buttonPressedFromServer", buttonPressedState);
  });

  socket.on("cardDrawn", ({ newDeck, newP1, newP2 }) => {
    io.emit("cardDrawnFromServer", {
      newDeck: newDeck,
      newP1: newP1,
      newP2: newP2,
    });
  });

  socket.on(
    "playCard",
    ({newCurrentPlayer, newDiscardPile }) => {
      console.log("emit card")
      io.emit("playCardFromServer", {
        newCurrentPlayer: newCurrentPlayer,
        newDiscardPile: newDiscardPile,
      });
    }
  );

  socket.on("gameStart", ({ deck, discard, makeP1, makeP2, gameOn }) => {
    io.emit("gameStartFromServer", {
      deck: deck,
      discard: discard,
      makeP1: makeP1,
      makeP2: makeP2,
      gameOn: gameOn,
    });
  });

  socket.on("playerOnePlayCard", (updatedPlayerOne) => {
    io.emit("playerOnePlayCardFromServer", updatedPlayerOne);
  });

  socket.on("playerTwoPlayCard", (updatedPlayerTwo) => {
    io.emit("playerTwoPlayCardFromServer", updatedPlayerTwo);
  });

  socket.on("gameOver", ()=>{
    io.emit("gameOverFromServer", true)
  })

  socket.on("disconnect", function () {
    if (totalPlayers[0].socketID === socket.id) {
      totalPlayers.splice(0, 1);
    } else if (totalPlayers[1].socketID === socket.id) {
      totalPlayers.splice(1, 1);
    }
    console.log("Goodbye client with id " + socket.id);
    console.log("Current number of players: " + totalPlayers.length);

    // need to emit players and receive it in game:
    io.emit("updateConnections", totalPlayers);
  });
  console.log(totalPlayers.length, "number of players on server");
}
