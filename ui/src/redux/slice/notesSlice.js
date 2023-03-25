import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from "../services/notesService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createNoteError: false,
  createNoteSuccess: false,
  createNoteLoading: false,
  createNoteMessage: "",
  editNoteError: false,
  editNoteSuccess: false,
  editNoteLoading: false,
  editNoteMessage: "",
};

// Get all notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      console.log("userToken", userToken);
      return await notesService.getNotes(userToken);
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

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetGetNotesState: (state) => {
      state.notes = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    resetCreateNotesState: (state) => {
      state.createNoteError = false;
      state.createNoteSuccess = false;
      state.createNoteLoading = false;
      state.createNoteMessage = "";
    },
    resetEditNotesState: (state) => {
      state.editNoteError = false;
      state.editNoteSuccess = false;
      state.editNoteLoading = false;
      state.editNoteMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notes = action.payload.data;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      });
  },
});

export const getNotesState = (state) => state.notes;

export const {
  resetGetNotesState,
  resetEditNotesState,
  resetCreateNotesState,
} = notesSlice.actions;

export default notesSlice.reducer;