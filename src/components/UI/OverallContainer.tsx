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
      <button
        onClick={toggle}
        className="text-2xl max-w-7xl mx-auto block py-5 self-start"
      >
        {isDarkMode ? <MdDarkMode /> : <CiLight />}
      </button>
      {children}
    </div>
  );
};
