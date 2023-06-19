import { useContext } from "react";
import { LoginContext } from "../context/login-context";

export const useLoginContextProvider = () => {
  return useContext(LoginContext);
};
