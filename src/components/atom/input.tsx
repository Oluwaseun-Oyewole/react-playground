import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { useDarkMode } from "usehooks-ts";

type InputType = "text" | "email" | "password" | "number" | "file";
type InputSize = "small" | "medium" | "large";

export type InputPropsType = {
  id?: string;
  name?: string;
  label?: string;
  type: InputType;
  size: InputSize;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

const sizeMap: { [key in InputSize]: string } = {
  small: "p-2 text-base",
  medium: "p-3 text-base",
  large: "p-4 text-base",
};

export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  (
    {
      id,
      name,
      label,
      type = "text",
      size = "medium",
      className,
      placeholder,
      ...props
    }: InputPropsType,
    ref
  ) => {
    const { isDarkMode } = useDarkMode();

    return (
      <input
        onPaste={(e: any) => {
          return type === "password" && e.preventDefault();
        }}
        onCopy={(e: any) => {
          return type === "password" && e.preventDefault();
        }}
        type={type}
        id={id}
        name={name}
        aria-label={label}
        placeholder={placeholder}
        className={classNames(
          `w-full text-gray-100 ${
            isDarkMode ? "bg-gray-700" : "bg-dark"
          } block px-5 outline-none transition-colors ease-in-out focus:border-blue-700'`,

          sizeMap[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
