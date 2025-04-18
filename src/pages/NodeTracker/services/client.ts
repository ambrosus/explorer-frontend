import axios, { AxiosError } from 'axios';

export const getContentType = () => ({
  'Content-Type': 'application/json',
});

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT_V2,
  timeout: 10000,
  headers: getContentType(),
});

Axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export class HttpClient {
  static async get<T>(url: string, params?: any) {
    const response = await Axios.get<T>(url, params);
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }
}

export default new HttpClient();
