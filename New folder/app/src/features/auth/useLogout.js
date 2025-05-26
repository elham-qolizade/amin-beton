/*eslint-disable */
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  // const navigate = useNavigate();

  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      // toast.success("از پنل کاربری خارج شدید.");
      // navigate("/");
    },

    onError: (err) => {
      console.log("ERROR :", err);
      toast.error("فرایند خروج با خطا مواجه شد!");
    },
  });

  return { logout, isLoggingOut };
}
