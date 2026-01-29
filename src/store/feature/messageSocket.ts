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
  onlineStatus(fn) {
    socket.on("user status", fn);
  },
  //write
  sendMessage(payload) {
    console.log(payload);
    socket.emit("send:message", payload);
  },
  // read
  onMessage(fn) {
    socket.on("receive:message", fn);
  },
  offMessage(fn) {
    socket.off("receive:message", fn);
  },
  cleanup() {
    socket.off("receive:message");
    socket.off("delete:message");
    socket.off("update:message");
  },
};
