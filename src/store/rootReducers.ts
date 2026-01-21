import { combineReducers } from "@reduxjs/toolkit";
import { GroupApi } from "./services/group/groupApi";
import { channelApi } from "./services/channel/channelApi";

export const rootReducer = combineReducers({
  [GroupApi.reducerPath]: GroupApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
