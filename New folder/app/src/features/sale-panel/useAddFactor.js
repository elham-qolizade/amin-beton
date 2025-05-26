import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addFactorAndPrice as addFactorAndPriceApi } from "../../services/apiFinancialPanel";

export function useAddFactorAndPrice() {
  const { isLoading: isSending, mutate: sendFactor } = useMutation({
    mutationFn: (obj) => addFactorAndPriceApi(obj),

    onSuccess: () => {
      toast.success("فاکتور با موفقیت ایجاد شد!");
      //   window.location.href = `/lab-panel/list/films/${orderId}`;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isSending, sendFactor };
}