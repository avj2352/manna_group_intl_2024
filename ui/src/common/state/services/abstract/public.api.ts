/**
 * Abstract class for public exposed api endpoints
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export default class PublicAPIClient {
  axiosInstance: AxiosInstance;  
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // ..init
    this.initializeAxiosInstance();
    this.setupInterceptors();
  }

  private initializeAxiosInstance() {
    this.axiosInstance = axios.create({ baseURL: this.baseURL });
  }

  private setupInterceptors() {
    if (!this.axiosInstance) {
      throw new Error("Axios instance is not initialized");
    }
    // ..setup request interceptor
    this.axiosInstance.interceptors?.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // ..setup response interceptor
    this.axiosInstance.interceptors?.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
