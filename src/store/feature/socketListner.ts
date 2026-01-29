import type { AppDispatch } from "../index";
import { socketMessageReceived } from "./messageSlice";
import { chatSocket } from "./messageSocket";

export const initMessageSocket = (dispatch: AppDispatch) => {
  chatSocket.connect();

  chatSocket.onMessage((msg) => {
    dispatch(
      socketMessageReceived({
        chatId: msg.chatId,
        message: msg,
      }),
    );
  });
};
