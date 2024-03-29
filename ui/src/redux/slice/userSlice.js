import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { checkIfValidUser } from "../../utils/checkIfValidUser";

const user =
  JSON.parse(sessionStorage.getItem("user")) ||
  JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: checkIfValidUser(user) ? user : null,
  userProfile: {},
  rememberMe: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userDataError: false,
  userDataSuccess: false,
  userDataLoading: false,
  userDataMessage: "",
  updateUserError: false,
  updateUserSuccess: false,
  updateUserLoading: false,
  updateUserMessage: "",
};

// User Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const rememberMe = thunkAPI.getState()?.user?.rememberMe;
      return await userService.login(user, rememberMe);
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

// User Registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register(userData);
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

// User Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await userService.logout();
});

// Get User Profile
export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      return await userService.getProfile(userToken);
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

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userProfile, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      return await userService.updateProfile(userToken, userProfile);
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

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.user = null;
      state.userProfile = {};
      state.rememberMe = false;
    },
    resetStateMessages: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetUpdateUser: (state) => {
      state.updateUserError = false;
      state.updateUserLoading = false;
      state.updateUserSuccess = false;
      state.updateUserMessage = "";
    },
    setRememberMeState: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // User Login
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
      })

      // User Registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Fetch User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.userDataLoading = true;
        state.userDataError = false;
        state.userDataSuccess = false;
        state.userDataMessage = "";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userDataLoading = false;
        state.userDataError = false;
        state.userDataSuccess = true;
        state.userProfile = action.payload.data;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.userDataLoading = false;
        state.userDataError = true;
        state.userDataSuccess = false;
        state.userDataMessage = action.payload;
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updateUserError = false;
        state.updateUserLoading = true;
        state.updateUserSuccess = false;
        state.updateUserMessage = "";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateUserError = false;
        state.updateUserLoading = false;
        state.updateUserSuccess = true;
        state.updateUserMessage = action.payload.message;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateUserError = true;
        state.updateUserLoading = false;
        state.updateUserSuccess = false;
        state.updateUserMessage = action.payload.message;
      });
  },
});

export const getUserState = (state) => state.user;
export const getRememberMeState = (state) => state.user.rememberMe;

export const {
  reset,
  resetStateMessages,
  setRememberMeState,
  resetUpdateUser,
} = userSlice.actions;

export default userSlice.reducer;
