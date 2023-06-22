import classNames from "classnames";
import { ReactElement } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDarkMode } from "usehooks-ts";
interface OverallProps {
  children: ReactElement;
}

export const OverallContainer = ({ children }: OverallProps) => {
  const { isDarkMode, toggle } = useDarkMode();
  return (
    <div
      className={classNames(
        `${
          isDarkMode
            ? "bg-dark text-white font-medium"
            : "bg-gray-700 text-gray-100 font-medium"
        } min-h-screen`
      )}
    >
      <div className="text-3xl block py-3 w-full max-w-[1100px] mx-auto">
        <button onClick={toggle}>
          {isDarkMode ? <MdDarkMode /> : <CiLight />}
        </button>
      </div>
      {children}
    </div>
  );
};
