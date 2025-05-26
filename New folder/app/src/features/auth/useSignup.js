/*eslint-disable */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    // cred = {first_name: ... , last_name: ..., phone:...}
    mutationFn: (cred) => signupApi(cred),
    onSuccess: (user) => {
      // console.log(user);
      toast.success(
        "درخواست ثبت نام شما با موفقیت ارسال شد. با شما تماس گرفته خواهد شد و نام کابری و رمز عبور ارسال می‌شود.",
        { duration: 8000 }
      );
      navigate("/");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { signup, isSigningUp };
}
