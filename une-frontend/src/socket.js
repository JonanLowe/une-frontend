//localhost here must be the same as port in "SERVER"

import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  autoConnect: false,
});
