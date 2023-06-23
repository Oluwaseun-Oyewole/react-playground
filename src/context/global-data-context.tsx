import { ReactElement, createContext, useContext, useState } from "react";

type initialState<T> = {
  datat?: Array<string | number>[];
};
const initialState = {
  data: [],
};

// type UseFetchContextType = ReturnType<typeof initialState>;

export const FetchContext = createContext(initialState);

type ChildrenStateType = {
  children?: ReactElement | undefined;
};
export const FetchContextProvider = ({ children }: ChildrenStateType) => {
  const [data, setData] = useState<any>([]);
  return (
    <FetchContext.Provider value={{ data, setData }}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContextProvider = () => useContext(FetchContext);
