import { useEffect, useReducer, useRef } from "react";
import { useLocation } from "react-router";
import { z } from "zod";
import { useFetchContextProvider } from "../context/fetch-context";

interface State<T> {
  data?: any;
  error?: Error;
  status: string;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
  SchemaType?: any
): State<T> {
  type SchemaArrayType = z.infer<typeof SchemaType>;

  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: [],
    status: "idle",
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
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

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { dispatcher } = useFetchContextProvider();
  const { pathname } = useLocation();

  // const handleDeleteRequest = async (endpoint: string) => {
  //   try {
  //     const response = await jsonInstance.delete(`${endpoint}`);
  //     dispatch({ type: "fetched", payload: response?.data });
  //   } catch (error) {
  //     if (error instanceof Error) dispatch({ type: "error", payload: error });
  //   }
  // };
  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async (): Promise<SchemaArrayType> => {
      dispatch({ type: "loading" });
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        dispatcher({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
        dispatcher({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return { ...state };
}
