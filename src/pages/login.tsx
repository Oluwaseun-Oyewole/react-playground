import { zodResolver } from "@hookform/resolvers/zod";
import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../api/axios";
import { QuestionComponent } from "../components/UI/Question";
import { Button } from "../components/atom/button";
import { FieldSet } from "../components/atom/field-set";
import { FormField } from "../components/atom/form-field";
import { FormInput } from "../components/molescules/form-input";
import type { LoginModelType } from "../model/User";
import { LoginModel } from "../model/User";

interface State<T> {
  data?: T;
  error?: T;
  status: string;
}

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: T };

export const Login = <T,>() => {
  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status: "submit",
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: "Loading..." };
      case "fetched":
        return { ...initialState, data: action.payload, status: "Completed" };
      case "error":
        return { ...initialState, error: action.payload, status: "Error" };
      default:
        return state;
    }
  };

  const [states, dispatch] = useReducer(fetchReducer, initialState);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginModelType>({
    resolver: zodResolver(LoginModel),
    mode: "onChange",
  });
  const [maliciousIntent, setMaliciousIntent] = useState("");

  const onSubmit = async (formValues: LoginModelType) => {
    // For Funny Users With Malicious Intentions
    // We re-run the valiation again
    const username_regex = /^[A-z][A-z0-9-_]{3,23}$/;
    const password_regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const v1 = username_regex.test(formValues.username);
    const v2 = password_regex.test(formValues.password);
    if (!v1 || !v2) {
      setMaliciousIntent("Malicious Intension....");
      return;
    }
    try {
      dispatch({ type: "loading" });
      const response = await instance.post(
        "/posts",
        JSON.stringify(formValues),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log("data from submitted", data);
      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "error", payload: error as any });
      }
    }
  };

  return (
    <div>
      <h1>{maliciousIntent && maliciousIntent}</h1>
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
      <QuestionComponent
        path="/signup"
        children="SignUp"
        message="Already Signup ?"
      />
    </div>
  );
};
