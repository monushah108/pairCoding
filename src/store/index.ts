import { configureStore } from "@reduxjs/toolkit";
import { GroupApi } from "./services/group/groupApi";
export const Store = configureStore({
  reducer: {
    [GroupApi.reducerPath]: GroupApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(GroupApi.middleware);
  },
});

export type AppStore = typeof Store;

export type AppDispatch = typeof Store.dispatch;

export type RootState = ReturnType<typeof Store.getState>;
