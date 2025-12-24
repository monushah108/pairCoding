import { io } from "socket.io-client";

export const socket = (path = "/") =>
  io(`http://localhost:4000${path}`, {
    withCredentials: true,
    autoConnect: false,
  });
