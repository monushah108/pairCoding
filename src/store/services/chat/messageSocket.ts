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

  //write
  sendMessage(payload) {
    socket.emit("send:message", payload);
  },

  // read
  onMessage(fn) {
    socket.on("receive:message", fn);
  },

  // delete
  deleteMessage(fn) {
    socket.on("delete:message", fn);
  },

  //update
  updateMessage(fn) {
    socket.on("update:message", fn);
  },

  cleanup() {
    socket.off("receive:message");
    socket.off("delete:message");
    socket.off("update:message");
  },
};
