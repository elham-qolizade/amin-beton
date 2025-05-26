/* eslint-disable */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: (cred) => loginApi(cred),

    onSuccess: (data) => {
      console.log("Login response:", data);

      const { token, roles } = data;

      queryClient.setQueryData(["token"], token);
      queryClient.setQueryData(["roles"], roles);

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("roles", JSON.stringify(roles));

      navigate("/dashboard", { replace: true });

      toast.success("ورود شما موفقیت آمیز بود. خوش آمدید.");
    },

    onError: (err) => {
      console.log("ERROR :", err);
      toast.error("نام کاربری یا رمز عبور اشتباه می‌باشد!");
    },
  });

  return { login, isLoggingIn };
}
