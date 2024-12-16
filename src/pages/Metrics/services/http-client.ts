import { AxiosInstance } from 'axios';

interface HttpClientProps {
  axiosInstance: AxiosInstance;
}

const createHttpClient = ({ axiosInstance }: HttpClientProps) => ({
  get: async <T>(url: string, params?: any) => {
    const response = await axiosInstance.get<T>(url, params);
    return response.data;
  },

  post: async <T>(url: string, data: unknown, options?: any) => {
    const response = await axiosInstance.post<T>(url, data, options);
    return response.data;
  },

  put: async <T>(url: string, data: unknown) => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string) => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  },
});

export default createHttpClient;
