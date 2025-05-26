import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateTransport as updateTransportApi } from "../../services/apiTransportPanel";

export function useUpdateTransport() {
  const { transportId } = useParams(); // type of String
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTransport } = useMutation({
    mutationFn: (updateObj) =>
      updateTransportApi({ id: transportId, updateObj }),

    onSuccess: () => {
      toast.success("عملیات با موفقیت انجام شد.");
      queryClient.invalidateQueries({
        queryKey: ["transport"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateTransport };
}
