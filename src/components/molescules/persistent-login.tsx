import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLoginContextProvider } from "../../hooks/use-login-context";
import { useRefreshToken } from "../../hooks/useRefreshToken";

export const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { token, persist } = useLoginContextProvider();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    // console.log(`isLoading State ${isLoading}`);
    // console.log(`Auth Token ${JSON.stringify(token)}`);
  }, [isLoading]);

  return (
    <>
      {!persist ? <Outlet /> : <> {isLoading ? "Loading...." : <Outlet />}</>}
    </>
  );
};
