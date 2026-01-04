import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./slices/fileSlice.js";
export const Store = configureStore({
  reducer: {
    fileSlice,
  },
});
