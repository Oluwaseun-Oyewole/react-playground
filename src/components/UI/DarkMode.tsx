import { useDarkMode } from "usehooks-ts";

export const DarkMode = () => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  return (
    <div>
      <p>Current theme: {isDarkMode ? "red" : "blue"}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};
