/**
 * Abstract class for authenticating using session tokens
 */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export default class ProtectedAPIClient {
  axiosInstance: AxiosInstance;
  token: string;
  baseURL: string;


  constructor(token: string, baseURL: string) {
    this.token = token;
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
        if (this.token) {
          config.headers["Authorization"] = `Bearer ${this.token}`;
        }
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
