import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { get } from "lodash";
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormErrorMessgae } from "../atom/error-mesage";
import Input, { InputPropsType } from "../atom/input";

export type FormInputPropsType<T> = {
  name: Path<T>;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
  errors?: any;
} & Omit<InputPropsType, "name">;

export const FormInput = <T,>({
  name,
  rules,
  register,
  errors,
  className,
  ...props
}: FormInputPropsType<T>) => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames("", className)}>
      <Input
        aria-invalid={hasError}
        {...props}
        {...(register && register(name, rules))}
        className={classNames(
          {
            "": hasError,
          },
          className
        )}
      />

      <ErrorMessage
        name={name as string}
        errors={errors}
        render={({ message }) => (
          <FormErrorMessgae className="mt-1">{message}</FormErrorMessgae>
        )}
      />
    </div>
  );
};
