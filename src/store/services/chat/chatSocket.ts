import { socket } from "@/lib/sockets/socket";

export const chatSocket = {
  connect() {
    if (!socket.connected) {
      socket.connect();
    }
  },

  disconnect() {
    if (socket.connected) {
      socket.disconnect();
    }
  },
};
