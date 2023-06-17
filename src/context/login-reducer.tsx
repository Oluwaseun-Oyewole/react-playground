import { useReducer } from "react";

type ACTIONTYPE<T> =
  | { type: "login" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: Error }
  | { type: "logout" };

export interface State<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

const AuthReducers = <T,>() => {
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
          isLoggedIn: false,
        };
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(loginReducer, initialState);
  return <div>AuthReducers</div>;
};

export default AuthReducers;
