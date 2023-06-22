import { ReactElement, createContext, useReducer, useState } from "react";
import { useNavigate } from "react-router";

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

const initialState = {
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

const useLoginContext = <T,>(initialState: State<T>) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch({ type: "logout" });
    setToken("");
    navigate("/signup");
  };

  return { state, handleLogout, token, setToken };
};

type UseLoginContextType = ReturnType<typeof useLoginContext>;

const LoginContextInitialState: UseLoginContextType = {
  state: initialState,
  handleLogout: () => {
    /**/
  },
  token: "",
  setToken: () => {
    /**/
  },
};

export const LoginContext = createContext<UseLoginContextType>(
  LoginContextInitialState
);

type ChildrenType = {
  children?: ReactElement;
};
export const LoginContextProvider = ({ children }: ChildrenType) => {
  return (
    <LoginContext.Provider value={useLoginContext(initialState)}>
      {children}
    </LoginContext.Provider>
  );
};
