// sockets/socket.ts
import { io } from "socket.io-client";

export const socket = io("http://localhost:4000/chat", {
  withCredentials: true,
  autoConnect: false,
});
