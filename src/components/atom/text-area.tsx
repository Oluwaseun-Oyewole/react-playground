import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { get } from "lodash";
import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { useDarkMode } from "usehooks-ts";
import { FormErrorMessgae } from "./error-mesage";

export type FormTextAreaType = {
  id: string;
  name: string;
  label?: string;
  row?: number;
  errors?: any;
  className?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
export const FormTextArea = ({
  id,
  name,
  label,
  row,
  errors,
  rules,
  register,
  className,
  ...props
}: FormTextAreaType) => {
  const { isDarkMode } = useDarkMode();
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <textarea
        id={id}
        // name={name}
        aria-label={label}
        rows={row}
        className={classNames(
          `block w-full p-3  rounded leading-none transition-colors ease-in-out text-gray-700 border focus:outline-none overflow-auto resize-none border-gray-700 text-white ${
            isDarkMode ? "bg-gray-700" : "bg-dark"
          }`,
          className
        )}
        aria-invalid={hasError}
        {...(register && register(name, rules))}
        {...props}
      />
      <ErrorMessage
        name={name as string}
        errors={errors}
        render={({ message }) => (
          <FormErrorMessgae className="font-medium">{message}</FormErrorMessgae>
        )}
      />
    </>
  );
};

// isDarkMode ? "bg-gray-700" : "bg-dark"
