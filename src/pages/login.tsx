import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { PointToLogin } from "../components/UI/pointToLogin";
import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { FormInput } from "../components/molescules/form-input";
import type { LoginModelType } from "../model/User";
import { LoginModel } from "../model/User";

export const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginModelType>({
    resolver: zodResolver(LoginModel),
    mode: "onChange",
  });

  const onSubmit = useCallback((formValues: LoginModelType) => {
    try {
      console.log(formValues);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error);
      }
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet label="Login Form">
          <>
            <FormField label="Username" id="username">
              <FormInput<LoginModelType>
                id="username"
                type="text"
                size="medium"
                label="name"
                name="username"
                className=""
                placeholder="Full Name"
                autoFocus={true}
                register={register}
                errors={errors}
                autoComplete="off"
              />
            </FormField>

            <FormField label="Password" id="password">
              <FormInput<LoginModelType>
                id="password"
                name="password"
                size="medium"
                type="password"
                className=""
                placeholder="Password"
                register={register}
                errors={errors}
              />
            </FormField>

            <FormField id="passwordConfirmation" label="Confirm Password">
              <FormInput<LoginModelType>
                id="passwordConfirmation"
                name="passwordConfirmation"
                register={register}
                size="medium"
                className=""
                type="password"
                placeholder="confirmPassword"
                errors={errors}
              />
            </FormField>
          </>
        </FieldSet>

        <FieldSet>
          <Button children="submit" type="submit" />
        </FieldSet>
      </form>
      <PointToLogin
        path="/signup"
        children="SignUp"
        message="Already Signup ?"
      />
    </div>
  );
};
