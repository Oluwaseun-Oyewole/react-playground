import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { z } from "zod";
import { useFetchContextProvider } from "../context/fetch-context";

interface State<T> {
  data?: T;
  error?: Error;
  status: string;
}

type Cache<T> = { [url: string]: T };

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
  SchemaType?: any
): State<T> {
  type SchemaArrayType = z.infer<typeof SchemaType>;
  const { pathname } = useLocation();
  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const { states, startLoad, fetchedLoad, errorLoad } =
    useFetchContextProvider();

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async (): Promise<SchemaArrayType> => {
      startLoad();
      if (cache.current[url]) {
        fetchedLoad(cache.current[url]);
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
        fetchedLoad(data);
      } catch (error) {
        if (cancelRequest.current) return;
        errorLoad(error as Error);
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [pathname, url]);

  return { ...states };
}
