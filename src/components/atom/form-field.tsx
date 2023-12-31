import classNames from "classnames";
import { ReactElement } from "react";

interface FormFieldType {
  id: string;
  label?: string;
  children?: ReactElement;
  className?: string;
}

export const FormField = ({
  id,
  label,
  children,
  className,
}: FormFieldType) => {
  return (
    <>
      <label
        htmlFor={id}
        className={classNames(
          "text-green-500 block my-3  md:text-base md:my-2 text-base",
          className
        )}
      >
        {label}
      </label>

      {children}
    </>
  );
};
