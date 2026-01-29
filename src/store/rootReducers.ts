import { combineReducers } from "@reduxjs/toolkit";
import { GroupApi } from "./services/group/groupApi";
import { channelApi } from "./services/channel/channelApi";
import { AuthApi } from "./services/auth/authApi";
import messageReducer from "./feature/messageSlice";

export const rootReducer = combineReducers({
  message: messageReducer,
  [GroupApi.reducerPath]: GroupApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
