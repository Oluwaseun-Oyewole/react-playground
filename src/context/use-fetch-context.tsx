import { useContext, useReducer } from "react";

type State<T> = {
  data: T;
  error: Error;
  sttaus: string;
};

const initialState = {
  data: undefined,
  error: undefined,
  status: "idle",
};

type ACTIONTYPE<T> = { type: "loading"; payload: T };

const reducer = <T,>(state: State<T>, action: ACTIONTYPE<T>) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: "isLoading...." };

    default:
      break;
  }
};
