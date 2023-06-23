import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { RegistrationDataInterface } from "../model/User";

type ACTIONTYPE<T> =
  | { type: "login" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: Error }
  | { type: "logout" };

interface State<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

export const useRegistrationForm = <T>() => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .required("Username is required")
          .min(10, "Username must be at least 10 characters")
          .matches(/^[A-z][A-z0-9-_]{0,23}$/, "No white spaces"),
        age: yup
          .number()
          .required("Age is required")
          .positive({ message: "number must be positive" }),
        email: yup.string().email().required("Email is required"),
        password: yup
          .string()
          .required("Password is required")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{0,24}$/,
            "Password must contain a capital letter, small letter and special characters"
          ),
        passwordConfirmation: yup.string().test({
          name: "password-confirmation",
          message: "Passwords need to match",
          test: function () {
            const { password, passwordConfirmation } = this.parent;
            if (password && passwordConfirmation !== password) {
              return false;
            }
            return true;
          },
        }),
      }),
    []
  );

  const initialState: State<T> = {
    data: undefined,
    isLoading: false,
    error: undefined,
  };

  function signupReducer<T>(state: State<T>, action: ACTIONTYPE<T>) {
    switch (action.type) {
      case "login": {
        return {
          ...state,
          isLoading: true,
        };
      }
      case "success": {
        return {
          ...state,
          data: action.payload,
        };
      }
      case "error": {
        return { ...state, error: action.payload };
      }
      case "logout": {
        return {
          ...state,
        };
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(signupReducer, initialState);

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
  } = useForm<RegistrationDataInterface>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
  const onSubmit = useCallback((formValues: RegistrationDataInterface) => {
    try {
      dispatch({ type: "login" });
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "error", payload: error });
      }
    }
  }, []);

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    reset,
    control,
    Controller,
  };
};
