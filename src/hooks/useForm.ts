import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
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
        username: yup.string().required("Username is required"),
        age: yup
          .number()
          .required("Age is required")
          .positive({ message: "number must be positive" }),
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is requred"),
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

  function loginReducer<T>(state: State<T>, action: ACTIONTYPE<T>) {
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

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    control,
  } = useForm<RegistrationDataInterface>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = useCallback((formValues: RegistrationDataInterface) => {
    try {
      dispatch({ type: "login" });
      console.log(formValues);
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "error", payload: error });
      }
    }
  }, []);

  const handleLogout = () => {
    dispatch({ type: "logout" });
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    reset,
    control,
    Controller,
    handleLogout,
  };
};
