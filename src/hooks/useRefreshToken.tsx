import { getAuth } from "firebase/auth";
import { useLoginContextProvider } from "./use-login-context";

export const useRefreshToken = () => {
  const { setToken } = useLoginContextProvider();
  const auth = getAuth();

  const refresh = async () => {
    const res = await auth?.currentUser?.getIdToken(/*forceRefresh*/ true);
    const token = await res;
    setToken((prev: any) => {
      return { ...prev, token: token };
    });

    return token;
  };

  return refresh;
};
