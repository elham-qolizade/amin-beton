import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    // cred = {first_name: ... , last_name: ..., phone:...}
    mutationFn: (cred) => signupApi(cred),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "درخواست ثبت نام شما با موفقیت ارسال شد. منتظر تایید باشید..."
      );
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { signup, isSigningUp };
}
