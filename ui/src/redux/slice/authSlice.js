import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user =
  JSON.parse(sessionStorage.getItem("user")) ||
  JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  rememberMe: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const rememberMe = thunkAPI.getState()?.user?.rememberMe;
      return await authService.login(user, rememberMe);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.user = null;
      state.rememberMe = false;
    },
    resetStateMessages: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setRememberMeState: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getAuthState = (state) => state.auth;
export const getUserState = (state) => state.auth.user;
export const getRememberMeState = (state) => state.auth.rememberMe;

export const { reset, resetStateMessages, setRememberMeState } =
  authSlice.actions;

export default authSlice.reducer;
