import apiClient from "./apiClient";

const AuthService = {
  sendOtp: async (phoneNumber) => {
    return apiClient.post("/users/send-otp/", { phone: phoneNumber });
  },

  login: async (phoneNumber, otpCode) => {
    return apiClient.post("/users/login/", {
      phone: phoneNumber,
      otp: otpCode,
    });
  },
};

export default AuthService;
