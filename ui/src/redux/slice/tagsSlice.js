import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tagsService from "../services/tagsService";

const initialState = {
  tags: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createTagError: false,
  createTagSuccess: false,
  createTagLoading: false,
  createTagMessage: "",
  editTagError: false,
  editTagSuccess: false,
  editTagLoading: false,
  editTagMessage: "",
};

// Get All Tags
export const getTags = createAsyncThunk("tags/getAll", async (_, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState()?.user?.user?.token;
    return await tagsService.getTags(userToken);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Create New Tag
export const createTag = createAsyncThunk(
  "tags/create",
  async (tagName, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      const reqBody = {
        tagName: tagName,
      };

      return await tagsService.createNewTag(userToken, reqBody);
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

// Edit tag
export const editTag = createAsyncThunk(
  "tags/edit",
  async (editedTag, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      return await tagsService.editExisitingTag(userToken, editedTag);
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

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    resetCreateTag: (state) => {
      state.createTagSuccess = false;
      state.createTagError = false;
      state.createTagLoading = false;
      state.createTagMessage = "";
    },
    resetEditTag: (state) => {
      state.editTagSuccess = false;
      state.editTagLoading = false;
      state.editTagError = false;
      state.createTagMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tags = action.payload.data;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(createTag.pending, (state) => {
        state.createTagLoading = true;
        state.createTagSuccess = false;
        state.createTagError = false;
        state.createTagMessage = "";
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.createTagLoading = false;
        state.createTagSuccess = true;
        state.createTagError = false;
        state.createTagMessage = action.payload.message;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.createTagLoading = false;
        state.createTagSuccess = false;
        state.createTagError = true;
        state.createTagMessage = action.payload.message;
      })
      .addCase(editTag.pending, (state) => {
        state.editTagLoading = true;
        state.editTagSuccess = false;
        state.editTagError = false;
        state.editTagMessage = "";
      })
      .addCase(editTag.fulfilled, (state, action) => {
        state.editTagLoading = false;
        state.editTagSuccess = true;
        state.editTagError = false;
        state.editTagMessage = action.payload.message;
      })
      .addCase(editTag.rejected, (state, action) => {
        state.editTagLoading = false;
        state.editTagSuccess = false;
        state.editTagError = true;
        state.editTagMessage = action.payload.message;
      });
  },
});

export const getTagsState = (state) => state.tags;

export const { resetCreateTag, resetEditTag } = tagsSlice.actions;

export default tagsSlice.reducer;
