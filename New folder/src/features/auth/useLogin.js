/*eslint-disable */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useLogin() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: (cred) => loginApi(cred),

    onSuccess: (data) => {
      // data is an object containg session and user
      // queryClient.setQueryData(["token"], data.access);
      console.log(data);
      localStorage.setItem("token", data);
      navigate("/user-panel", { replace: true });
      toast.success("ورود موفقیت آمیز");
    },

    onError: (err) => {
      console.log("ERROR :", err);
      toast.error("نام کاربری یا رمز عبور اشتباه می باشد!");
    },
  });

  return { login, isLoggingIn };
}
