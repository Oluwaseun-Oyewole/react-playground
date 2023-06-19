import classNames from "classnames";
import { ReactElement } from "react";

interface FormFieldType {
  id: string;
  label?: string;
  children?: ReactElement;
}

export const FormField = ({ id, label, children }: FormFieldType) => {
  return (
    <>
      <label htmlFor={id} className={classNames("text-green-500 block mb-1")}>
        {label}
      </label>

      {children}
    </>
  );
};
