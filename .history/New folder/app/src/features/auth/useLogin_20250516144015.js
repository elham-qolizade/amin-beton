/*eslint-disable */
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
      // data is an object containg token
      // console.log("returned data after login : ", data);
      queryClient.setQueryData(["token"], data);
      localStorage.setItem("token", JSON.stringify(data));
      navigate("/Dashbord", { replace: true });
      toast.success("ورود شما موفقیت آمیز بود. خوش آمدید.");
    },

    onError: (err) => {
      console.log("ERROR :", err);
      toast.error("نام کاربری یا رمز عبور اشتباه می باشد!");
    },
  });

  return { login, isLoggingIn };
}
