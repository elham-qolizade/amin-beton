/*eslint-disable */
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createLabResult as createLabResultApi } from "../../services/apiLabPanel";

export function useCreateLabResult() {
  const { orderId } = useParams();
  const { isLoading: isCreating, mutate: createLabResult } = useMutation({
    mutationFn: (obj) => createLabResultApi(obj),

    onSuccess: () => {
      toast.success("نتیجه‌ی آزمایشگاه با موفقیت ایجاد شد!");
      window.location.href = `/lab-panel/list/films/${orderId}`;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createLabResult };
}
