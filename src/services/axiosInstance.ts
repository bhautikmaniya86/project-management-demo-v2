import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { delay } from '../utils/helpers';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://db-json-nf3y.onrender.com/', // Base API URL
  timeout: 5000, // Request timeout
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Ensure headers are an instance of AxiosHeaders
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    // Add common headers or other configurations
    (config.headers as AxiosHeaders).set('Content-Type', 'application/json');
    await delay(500); // Add a 500ms delay to all requests
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const getCall = (
  url: string,
  params?: AxiosRequestConfig['params'],
  headers?: AxiosRequestConfig['headers']
) => {
  return axiosInstance.get(url, { headers: { ...headers }, params });
};

export const postCall = <T>(
  url: string,
  data: T,
  headers?: AxiosRequestConfig['headers'],
  params?: AxiosRequestConfig['params']
) => {
  const config: AxiosRequestConfig = {
    headers: { ...headers },
    params,
  };
  return axiosInstance.post(url, data, config);
};

export const putCall = <T>(
  url: string,
  data: T,
  headers?: AxiosRequestConfig['headers'],
  params?: AxiosRequestConfig['params']
) => {
  const config: AxiosRequestConfig = {
    headers: { ...headers },
    params,
  };
  return axiosInstance.put(url, data, config);
};

export const deleteCall = (url: string) => axiosInstance.delete(url);

export const patchCall = <T>(
  url: string,
  data: T,
  headers?: AxiosRequestConfig['headers'],
  params?: AxiosRequestConfig['params']
) => {
  const config: AxiosRequestConfig = {
    headers: { ...headers },
    params,
  };
  return axiosInstance.patch(url, data, config);
};

export default axios;
