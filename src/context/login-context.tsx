import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UserCredential } from "firebase/auth/cordova";
import {
  ReactElement,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth } from "../config/firebase";

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
  const [token, setToken] = useState<any | string>("");
  const [user, setUser] = useState<any>(null);

  const createUserAuthentication = async (
    email: string,
    password: string
  ): Promise<UserCredential | void> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (
    email: string,
    password: string
  ): Promise<UserCredential | void> => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const handleLogout = async (): Promise<void> => {
    dispatch({ type: "logout" });
    setToken("");
    await signOut(auth);
  };

  useEffect(() => {
    const unsuscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsuscribed();
  }, []);

  return {
    state,
    handleLogout,
    token,
    setToken,
    dispatch,
    createUserAuthentication,
    user,
    login,
  };
};

type UseLoginContextType = ReturnType<typeof useLoginContext>;

const LoginContextInitialState: UseLoginContextType = {
  state: initialState,
  handleLogout: async () => {
    /**/
  },
  token: "",
  user: null,
  setToken: () => {
    /**/
  },
  dispatch: () => {
    /**/
  },
  createUserAuthentication: () => Promise.resolve(),

  login: () => Promise.resolve(),
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
