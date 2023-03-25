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

const notesService = { getNotes };

export default notesService;
