import classNames from "classnames";
import { useLoginContextProvider } from "../../hooks/use-login-context";

export const Logout = () => {
  const { state, handleLogout } = useLoginContextProvider();
  const logout = (
    <>
      {state.token && (
        <button
          onClick={handleLogout}
          className={classNames("text-xl text-blue-500 font-medium")}
        >
          Logout
        </button>
      )}
    </>
  );
  return logout;
};
