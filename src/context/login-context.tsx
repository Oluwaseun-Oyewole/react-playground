import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
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
  const [token, setToken] = useState<any | string>("12345");
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

  const auth = getAuth();

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
      console.log("error email verification", error);
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
