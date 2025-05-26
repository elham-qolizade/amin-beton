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
      const { token, roles } = data;
    
      queryClient.setQueryData(["token"], token);
      queryClient.setQueryData(["roles"], roles); // اضافه شده
    
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("roles", JSON.stringify(roles)); // اضافه شده
    
      navigate("/user-panel", { replace: true });
      toast.success("ورود شما موفقیت آمیز بود. خوش آمدید.");
    },
    

    onError: (err) => {
      console.log("ERROR :", err);
      toast.error("نام کاربری یا رمز عبور اشتباه می باشد!");
    },
  });
  const rolesList = ["Super User", "Financial", "Sales", "Execution", "Lab"];

  const hasAccess = (userRoles, panelName) => {
    if (userRoles.includes("Super User")) return true;
    return userRoles.includes(panelName);
  };
  
  return { login, isLoggingIn };
}
