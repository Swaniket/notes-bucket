import apiNotesBucket from "../../axios/apiNotesBucket";

// API call to get all tags
const getTags = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await apiNotesBucket.get("tags/all", config);
  return response.data;
};

// API call to create a new Tag
const createNewTag = async (token, reqBody) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await apiNotesBucket.post("tags/new", reqBody, config);
  return response.data;
};

const tagsService = { getTags, createNewTag };

export default tagsService;
