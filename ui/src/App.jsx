import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login, Home } from "./pages";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
