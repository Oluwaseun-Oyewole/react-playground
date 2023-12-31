import axios from "axios";

export const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
});

export const jsonInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});
