import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

type InputType = "text" | "email" | "password" | "number";
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
    return (
      <input
        type={type}
        id={id}
        name={name}
        aria-label={label}
        placeholder={placeholder}
        className={classNames(
          "w-full text-gray-100 bg-gray-700 block px-5 outline-none transition-colors ease-in-out focus:border-blue-700'",

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
