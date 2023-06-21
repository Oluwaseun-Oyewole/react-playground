import classNames from "classnames";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useLoginContextProvider } from "../../hooks/use-login-context";

export const Logout = () => {
  const { state, handleLogout } = useLoginContextProvider();
  const [pop, setPop] = useState(false);

  const logout = (
    <>
      {state.token && (
        <button
          onClick={handleLogout}
          className={classNames("text-lg text-red-500 font-medium")}
        >
          {/* <FiLogOut
            className={`hover:${pop}`}
            onMouseOver={() => setPop(true)}
            onMouseOut={() => setPop(false)}
          /> */}
          logout
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
