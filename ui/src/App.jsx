import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login, Home, Signup, Tags, Archive } from "./pages";
import { Header, Footer } from "./layout";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./authorization/PrivateRoute";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/archive" element={<Archive />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
