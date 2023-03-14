import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login, Home, Signup } from "./pages";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
