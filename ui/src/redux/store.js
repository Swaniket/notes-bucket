import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/authSlice";
import notesReducer from "../redux/slice/notesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});
