import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://amin-beton-back.chbk.app/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          if (window.location.pathname !== "/LoginForm") {
            window.location.href = "/LoginForm";
          }
          return Promise.reject("Refresh token not available");
        }

        const response = await axios.post(
          "https://amin-beton-back.chbk.app/api/token/refresh/",
          { refreshToken }
        );

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("خطا در رفرش توکن:", refreshError);

        if (window.location.pathname !== "/LoginForm") {
          window.location.href = "/LoginForm";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
