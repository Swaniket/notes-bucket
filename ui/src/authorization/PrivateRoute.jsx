import { getAuthState } from "../redux/slice/authSlice";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { checkIfValidUser } from "../utils/checkIfValidUser";

const useAuth = () => {
  const userState = useSelector(getAuthState);
  // @TODO: Implement a more solid auth
  if (checkIfValidUser(userState.user)) {
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
