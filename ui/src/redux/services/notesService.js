import apiNotesBucket from "../../axios/apiNotesBucket";

// API call for get all notes
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await apiNotesBucket.get("/notes/all", config);
  return response.data;
};

// API call for create new notes
const createNewNote = async (token, noteObj) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await apiNotesBucket.post("/notes/create", noteObj, config);
  return response.data;
};

const notesService = { getNotes, createNewNote };

export default notesService;
