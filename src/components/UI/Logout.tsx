import classNames from "classnames";
import { useLoginContextProvider } from "../../hooks/use-login-context";

export const Logout = () => {
  const { handleLogout, token } = useLoginContextProvider();

  const logout = (
    <>
      {token && (
        <button
          onClick={handleLogout}
          className={classNames("text-lg text-gray-200 font-medium")}
        >
          {/* <FiLogOut
            className={`hover:${pop}`}
            onMouseOver={() => setPop(true)}
            onMouseOut={() => setPop(false)}
          /> */}
          Logout
          {/* <p
            className={classNames(
              `${pop ? "block text-base absolute text-white" : "hidden"}`
            )}
          >
            Logout
          </p> */}
        </button>
      )}
    </>
  );
  return logout;
};
