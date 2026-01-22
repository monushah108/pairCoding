import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducers";
import { GroupApi } from "./services/group/groupApi";
import { channelApi } from "./services/channel/channelApi";
import { AuthApi } from "./services/auth/authApi";
import { chatApi } from "./services/chat/chatApi";

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      GroupApi.middleware,
      channelApi.middleware,
      AuthApi.middleware,
      chatApi.middleware,
    );
  },
});

export type AppStore = typeof Store;

export type AppDispatch = typeof Store.dispatch;

export type RootState = ReturnType<typeof Store.getState>;
