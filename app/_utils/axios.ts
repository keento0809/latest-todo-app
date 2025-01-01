import axios, { AxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  method: "GET",
});

export async function makeApiRequest<TRequest, TResponse>(
  config: AxiosRequestConfig<TRequest>
): Promise<TResponse> {
  const response = await apiClient.request<TResponse>(config);

  return response.data;
}
