import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, TIMEOUT } from "./config";
import { IRequestType } from "./style";

class DIYRequest {
  private instance: AxiosInstance;

  constructor(baseURL: string, timeout: number) {
    this.instance = axios.create({
      baseURL,
      timeout
    });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<IRequestType<T>>> {
    return this.instance.request<IRequestType<T>>(config);
  }

  get<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<IRequestType<T>>> {
    return this.request({ ...config, method: "get" });
  }
}

export default new DIYRequest(BASE_URL, TIMEOUT);
