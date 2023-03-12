import axios from "axios";
import { toast } from "react-toastify";

const apiNotesBucket = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiNotesBucket.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === "ERR_NETWORK") {
      toast.error("Network Error", { toastId: "network-error-toast" });
      // User Logout after 3 sec
      setTimeout(() => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        window.location = "/";
      }, 3000);
    } else {
      if (err.response && err.response.status === 401) {
        toast.error("Session Expired, Please login again!", {
          toastId: "session-expired-toast",
        });
        // User Logout
        setTimeout(() => {
          sessionStorage.removeItem("user");
          localStorage.removeItem("user");
          window.location = "/";
        }, 3000);
      }
    }
    return Promise.reject(err);
  }
);

export default apiNotesBucket;
