import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    responseType: "json",
  });
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // TODO: error can't read status when Backend is DOWN!
      if (
        error.response.status === 401 &&
        error.response.data === "token expire"
      ) {
        localStorage.removeItem("accessToken");
        window.location.reload();
      }
      console.error("error", error.response);
      return error.response;
    }
  );

  return api.request<T>(config);
};
