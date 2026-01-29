import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatSocket } from "./messageSocket";
import axios from "axios";

interface Message {
  _id: string;
  content: string;
  chatId: string;
  senderId: string;
}

interface MessageState {
  messagesByChat: Record<string, Message[]>;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messagesByChat: {},
  loading: false,
  error: null,
};
export const fetchMessages = createAsyncThunk(
  "messages/fetch",
  async (chatId: string) => {
    const res = await axios.get(`/message/${chatId}`);
    return { chatId, messages: res.data };
  },
);

export const sendMessage = createAsyncThunk(
  "messages/send",
  async (payload: { chatId: string; content: string; reciverId: string }) => {
    const res = await axios.post(`/message/${payload.chatId}`, payload);

    // emit socket event
    chatSocket.sendMessage(res.data);

    return res.data;
  },
);

export const updateMessage = createAsyncThunk(
  "messages/update",
  async ({ msgId, content }: { msgId: string; content: string }) => {
    const res = await axios.patch(`/msg/${msgId}`, { content });
    return res.data;
  },
);

export const deleteMessage = createAsyncThunk(
  "messages/delete",
  async ({ msgId }: { msgId: string }) => {
    await axios.delete(`/msg/${msgId}`);
    return msgId;
  },
);
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    socketMessageReceived(state, action) {
      const { chatId, message } = action.payload;

      const list = state.messagesByChat[chatId] || [];
      if (!list.some((m) => m._id === message._id)) {
        list.push(message);
      }

      state.messagesByChat[chatId] = list;
    },
  },

  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesByChat[action.payload.chatId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load messages";
      })

      // send
      .addCase(sendMessage.fulfilled, (state, action) => {
        const msg = action.payload;
        state.messagesByChat[msg.chatId]?.push(msg);
      })

      // update
      .addCase(updateMessage.fulfilled, (state, action) => {
        const msg = action.payload;
        const list = state.messagesByChat[msg.chatId];
        const target = list?.find((m) => m._id === msg._id);
        if (target) target.content = msg.content;
      })

      // delete
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const msgId = action.payload;
        for (const chatId in state.messagesByChat) {
          state.messagesByChat[chatId] = state.messagesByChat[chatId].filter(
            (m) => m._id !== msgId,
          );
        }
      });
  },
});

export const { socketMessageReceived } = messagesSlice.actions;
export default messagesSlice.reducer;
