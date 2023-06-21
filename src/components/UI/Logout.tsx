import classNames from "classnames";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useLoginContextProvider } from "../../hooks/use-login-context";

export const Logout = () => {
  const { state, handleLogout } = useLoginContextProvider();
  const [pop, setPop] = useState(false);

  console.log("prop", pop);

  const logout = (
    <>
      {state.token && (
        <button
          onClick={handleLogout}
          className={classNames(
            "text-3xl text-blue-500 font-medium absolute bottom-10 right-[220px]"
          )}
        >
          <FiLogOut
            className={`hover:${pop}`}
            onMouseOver={() => setPop(true)}
            onMouseOut={() => setPop(false)}
          />
          <p
            className={classNames(
              `${pop ? "block text-base absolute text-white" : "hidden"}`
            )}
          >
            Logout
          </p>
        </button>
      )}
    </>
  );
  return logout;
};
