import { useContext } from "react";
import { LoginContext } from "../context/login-context";

export const useContextProvider = () => {
  return useContext(LoginContext);
};
