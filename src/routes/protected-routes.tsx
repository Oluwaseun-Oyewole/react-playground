import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLoginContextProvider } from "../hooks/use-login-context";

export const PrivateRoute = () => {
  const location = useLocation();
  const { token } = useLoginContextProvider();

  return !token ? (
    <Navigate to="/login" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};
