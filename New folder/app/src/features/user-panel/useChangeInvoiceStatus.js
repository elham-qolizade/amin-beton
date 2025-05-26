import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeInvoiceStatus as changeInvoiceStatusApi } from "../../services/apiUserPanel";

export function useChangeInvoiceStatus() {
  const { isLoading: isChangingInvoiceStatus, mutate: changeInvoiceStatus } =
    useMutation({
      mutationFn: ({ id, obj }) => changeInvoiceStatusApi({ id, obj }),
      onSuccess: () => {
        toast.success("وضعیت پیش فاکتور شما تغییر کرد.");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isChangingInvoiceStatus, changeInvoiceStatus };
}
