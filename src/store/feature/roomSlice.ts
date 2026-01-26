import { createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../services/chat/chatApi";

const initialState = {
  roomId: "",
  Room: [],
  Member: [],
  sidePanel: false,
};

export const RoomSlice = createSlice({
  name: "Room",
  initialState,
  reducers: {
    enterRoom: (state, action) => {
      chatApi.endpoints.getChats.initiate();
    },
    setMembers: (state, action) => {
      state.Member = action.payload;
    },
    updatePanel: (state, action) => {
      state.sidePanel = action.payload;
    },
  },
});

export const { enterRoom, setMembers, updatePanel } = RoomSlice.actions;
export default RoomSlice.reducer;
