import { combineReducers } from "@reduxjs/toolkit";
import { GroupApi } from "./services/group/groupApi";
import { channelApi } from "./services/channel/channelApi";
import { AuthApi } from "./services/auth/authApi";
import { chatApi } from "./services/chat/chatApi";
import { RoomSlice } from "./feature/roomSlice";

export const rootReducer = combineReducers({
  Room: RoomSlice.reducer,
  [GroupApi.reducerPath]: GroupApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
