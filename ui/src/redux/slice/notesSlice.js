import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import notesService from "../services/notesService";

const initialState = {
  notes: [],
  filteredNotes: [],
  filteredNotesByTag: {},
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
  deleteNoteError: false,
  deleteNoteSuccess: false,
  deleteNoteLoading: false,
};

// Get all notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
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

// Create new note
export const createNote = createAsyncThunk(
  "notes/create",
  async (newNote, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      return await notesService.createNewNote(userToken, newNote);
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

// Edit Note
export const editNote = createAsyncThunk(
  "notes/edit",
  async (editedNote, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      return await notesService.editNote(userToken, editedNote);
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

// Delete a note
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (noteId, thunkAPI) => {
    try {
      const userToken = thunkAPI.getState()?.user?.user?.token;
      return await notesService.deleteExistingNote(userToken, noteId);
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
    resetDeleteNoteState: (state) => {
      state.deleteNoteError = false;
      state.deleteNoteSuccess = false;
      state.deleteNoteLoading = false;
    },
    filterNotes: (state, action) => {
      state.filteredNotes = current(state.notes).filter((note) => {
        return note?.heading
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
    },
    resetNotesFilter: (state) => {
      state.filteredNotes = state.notes;
    },
    filterNotesByTag: (state, action) => {
      const tagId = action.payload;

      let setObj = {};

      setObj["shouldConsider"] = true;

      if (
        current(state.notes) instanceof Array &&
        current(state.notes).length > 0
      ) {
        setObj["notes"] = current(state.notes)?.filter((note) => {
          return note?.tagId === tagId;
        });
      }

      state.filteredNotesByTag = setObj;
    },
    resetFilterByTag: (state) => {
      const resetObj = {
        shouldConsider: false,
        notes: [],
      };

      state.filteredNotesByTag = resetObj;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Notes
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
        state.filteredNotes = action.payload.data;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })

      // Create Note
      .addCase(createNote.pending, (state) => {
        state.createNoteLoading = true;
        state.createNoteError = false;
        state.createNoteSuccess = false;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.createNoteLoading = false;
        state.createNoteError = true;
        state.createNoteSuccess = false;
        state.createNoteMessage = action.payload.message;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.createNoteLoading = false;
        state.createNoteError = false;
        state.createNoteSuccess = true;
        state.createNoteMessage = action.payload.message;
      })

      // Edit Note
      .addCase(editNote.pending, (state) => {
        state.editNoteLoading = true;
        state.editNoteError = false;
        state.editNoteSuccess = false;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.editNoteLoading = false;
        state.editNoteError = false;
        state.editNoteSuccess = true;
        state.editNoteMessage = action.payload.message;
      })
      .addCase(editNote.rejected, (state) => {
        state.editNoteLoading = false;
        state.editNoteError = true;
        state.editNoteSuccess = false;
        state.editNoteMessage = action.payload.message;
      })

      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.deleteNoteLoading = true;
        state.deleteNoteError = false;
        state.deleteNoteSuccess = false;
      })
      .addCase(deleteNote.rejected, (state) => {
        state.deleteNoteLoading = false;
        state.deleteNoteError = true;
        state.deleteNoteSuccess = false;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.deleteNoteLoading = false;
        state.deleteNoteError = false;
        state.deleteNoteSuccess = true;
      });
  },
});

export const getNotesState = (state) => state.notes;

export const {
  resetGetNotesState,
  resetEditNotesState,
  resetCreateNotesState,
  resetDeleteNoteState,
  filterNotes,
  resetNotesFilter,
  filterNotesByTag,
  resetFilterByTag,
} = notesSlice.actions;

export default notesSlice.reducer;
