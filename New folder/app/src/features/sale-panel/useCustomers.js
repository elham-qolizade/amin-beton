/*eslint-disable */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getWaitingCustomers,
  approveWaitingCustomer as approveWaitingCustomerApi,
  updateCustomer as updateCustomerApi,
  deleteCustomer as deleteCustomerApi,
  getConfirmedCustomers,
} from "../../services/apiSalePanel";

// ########################################################

export function useWaitingCustomers() {
  const {
    data: waitingCustomers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["waiting-customers"],
    queryFn: getWaitingCustomers,
  });

  return { waitingCustomers, isLoading, error };
}


// ########################################################

export function useApproveCustomer() {
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: approveCustomer } = useMutation({
    mutationFn: (id) => approveWaitingCustomerApi(id),
    onSuccess: () => {
      toast.success("مشتری با موفقیت تایید شد.");
      queryClient.invalidateQueries({
        queryKey: ["waiting-customers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmed-customers"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isApproving, approveCustomer };
}

// ########################################################

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCustomer } = useMutation({
    mutationFn: ({ updatedObject, id }) => updateCustomerApi(updatedObject, id),
    onSuccess: () => {
      toast.success("اطلاعات مشتری با موفقیت ویرایش یافت.");
      queryClient.invalidateQueries({
        queryKey: ["waiting-customers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmed-customers"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCustomer };
}

// ########################################################

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const { mutate: deleteCustomer, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCustomerApi(id),

    onSuccess: () => {
      toast.success(`مشتری مورد نظر با موفقیت حذف شد.`);
      queryClient.invalidateQueries({
        queryKey: ["waiting-customers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmed-customers"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { deleteCustomer, isDeleting };
}
// ########################################################

export function useConfirmedCustomers() {
  const {
    data: confirmedCustomers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["confirmed-customers"],
    queryFn: getConfirmedCustomers,
  });

  return { confirmedCustomers, isLoading, error };
}

// ########################################################
