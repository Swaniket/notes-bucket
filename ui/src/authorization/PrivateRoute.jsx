import { getAuthState } from "../redux/slice/authSlice";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const useAuth = () => {
  const userState = useSelector(getAuthState);
  console.log("user", userState);
  // @TODO: Implement a more solid auth
  if (userState.user && userState.user.token) {
    return true;
  }
  return false;
};

function PrivateRoute() {
  const isAuth = useAuth();

  return isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
