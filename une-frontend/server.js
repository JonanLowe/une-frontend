import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";
const app = express();
const server = createServer(app);


//ORIGIN here must be same as port used by VITE::::
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5185",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

//PORT HERE MUST BE THE SAME AS in socket.js

server.listen(4000, () => {
  console.log("Server Listening on port 4000");
});
