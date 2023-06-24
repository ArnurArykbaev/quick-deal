import { AxiosRequestConfig, AxiosResponse } from "axios";

const token = process.env.VUE_APP_TOKEN;

function setParams(config: AxiosRequestConfig): AxiosRequestConfig {
  config.headers = {
    ...config.headers,
    Accept: "application/json",
    Authorization: "Token " + token,
  };

  return config;
}

function returnData(res: AxiosResponse): any {
  return res;
}

export default function setupInterceptors(axios: any): void {
  axios.interceptors.request.use(setParams);
  axios.interceptors.response.use(returnData);
}
