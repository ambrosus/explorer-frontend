import createHttpClient from './http-client';
import axios, { AxiosError } from 'axios';

const getContentType = () => ({
  'Content-Type': 'application/json',
});

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_METRICS,
  timeout: 10000,
  headers: getContentType(),
});

Axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const HttpClient = createHttpClient({ axiosInstance: Axios });

export default HttpClient;
