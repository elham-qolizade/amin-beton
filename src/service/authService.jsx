import apiClient from "./apiClient";

const AuthService = {
  sendOtp: async (phoneNumber) => {
    return await apiClient.post("/users/send-otp/", { phone: phoneNumber });
  },

  loginWithOtp: async (phoneNumber, otpCode) => {
    const response = await apiClient.post("/users/login/", {
      phone: phoneNumber,
      otp: otpCode,
    });

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/LoginForm";
  },
};

export default AuthService;
