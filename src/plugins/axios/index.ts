import axios from "axios";
import { AxiosInstance } from "axios";
import setupInterceptors from "./interceptors";

const instance: AxiosInstance = axios.create({
  baseURL: "https://suggestions.dadata.ru/",
});

setupInterceptors(instance);

export default instance;
