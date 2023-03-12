import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
