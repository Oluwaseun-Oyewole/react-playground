import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { UserCredential } from "firebase/auth/cordova";
import {
  ReactElement,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type ACTIONTYPE<T> =
  | { type: "login" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: Error | any }
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
  const [token, setToken] = useState<object>({});
  const [user, setUser] = useState<object | null>({});
  const [persist, setPersist] = useState();

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
    try {
      dispatch({ type: "logout" });
      setToken({});
      await signOut(auth);
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  };

  useEffect(() => {
    const unsuscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsuscribed();
  }, []);

  const auth: any = getAuth();

  const updateUserProfile = async (
    name: string,
    photoUrl: string
  ): Promise<UserCredential | void> => {
    try {
      await updateProfile(auth?.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });
    } catch (error) {
      console.log("error state", error);
    }
  };

  const emailVerification = async (): Promise<User | void> => {
    try {
      await sendEmailVerification(auth?.currentUser);
    } catch (error) {
      console.log("Email verification Failed!!", error);
    }
  };
  return {
    state,
    handleLogout,
    token,
    setToken,
    dispatch,
    createUserAuthentication,
    user,
    login,
    updateUserProfile,
    emailVerification,
  };
};

type UseLoginContextType = ReturnType<typeof useLoginContext>;

const LoginContextInitialState: UseLoginContextType = {
  state: initialState,
  handleLogout: async () => {
    /**/
  },
  token: {},
  user: null,
  setToken: () => {
    /**/
  },
  dispatch: () => {
    /**/
  },
  createUserAuthentication: () => Promise.resolve(),

  login: () => Promise.resolve(),
  updateUserProfile: () => Promise.resolve(),
  emailVerification: () => Promise.resolve(),
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
