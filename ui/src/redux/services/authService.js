import apiNotesBucket from "../../axios/apiNotesBucket";

// API call for user login
const login = async (userCredentials, rememberMe) => {
  const response = await apiNotesBucket.post("/users/login", userCredentials);

  if (response.data && response.data.data && response.data.statusCode === 200) {
    const userData = response.data.data;

    if (rememberMe) {
      sessionStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
  }

  return { user: response?.data?.data };
};

// User Logout
const logout = () => {
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
