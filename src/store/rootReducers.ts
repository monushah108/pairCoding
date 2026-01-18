import { combineReducers } from "@reduxjs/toolkit";
import { GroupApi } from "./services/group/groupApi";

export const rootReducer = combineReducers({
  [GroupApi.reducerPath]: GroupApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
