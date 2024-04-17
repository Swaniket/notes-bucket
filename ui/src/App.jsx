import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./authorization/PrivateRoute";
import {
  Login,
  Home,
  Signup,
  Tags,
  Archive,
  Profile,
  About,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import { Header, Footer } from "./layout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/me" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
