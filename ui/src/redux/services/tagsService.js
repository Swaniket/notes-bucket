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

const tagsService = { getTags };

export default tagsService;
