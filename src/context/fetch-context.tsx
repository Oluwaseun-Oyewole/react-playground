import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

interface State<T> {
  data?: any;
  status: string;
  error?: any;
}
const initialState = {
  data: [],
  status: "",
  error: undefined,
};

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: any };

const useContextReducer = <T,>() => {
  const reducer = (state: State<T>, action: Action<T>): State<T> => {
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

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("state.data -- state.data", state.data);
  // const startLoad = useCallback(() => {
  //   dispatch({ type: "loading" });
  // }, []);
  // const fetchedLoad = useCallback((data: any) => {
  //   dispatch({ type: "fetched", payload: data });
  // }, []);

  // const errorLoad = useCallback((error: any) => {
  //   dispatch({ type: "error", payload: error });
  // }, []);

  return {
    states: state,
    dispatcher: dispatch,
    // startLoad,
    // fetchedLoad,
    // errorLoad,
  };
};

type UseFetchContextType = ReturnType<typeof useContextReducer>;
const initialContextState: UseFetchContextType = {
  states: initialState,
  dispatcher: () => {
    /**/
  },
  // startLoad: () => {
  //   /**/
  // },

  // fetchedLoad: () => {
  //   /**/
  // },

  // errorLoad: () => {
  //   /**/
  // },
};
export const FetchContext =
  createContext<UseFetchContextType>(initialContextState);

type ChildrenStateType = {
  children?: ReactElement | undefined;
};

export const FetchContextProvider = ({ children }: ChildrenStateType) => {
  return (
    <FetchContext.Provider value={useContextReducer()}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContextProvider = () => useContext(FetchContext);
