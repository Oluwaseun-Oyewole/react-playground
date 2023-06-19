import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLoginContextProvider } from "../hooks/use-login-context";

export const PrivateRoute = () => {
  const location = useLocation();
  const { state } = useLoginContextProvider();

  return !state.token ? (
    <Navigate to="/signup" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};
