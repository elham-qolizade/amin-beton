import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getOrderLabResults as getOrderLabResultsApi } from "../../services/apiUserPanel";

export function useOrderLabResults() {
  const { orderId } = useParams(); // type of String

  const {
    isLoading,
    mutate: getOrderLabResults,
    data: labResults,
  } = useMutation({
    mutationFn: () => getOrderLabResultsApi(orderId),

    onSuccess: () => {},
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, getOrderLabResults, labResults };
}
