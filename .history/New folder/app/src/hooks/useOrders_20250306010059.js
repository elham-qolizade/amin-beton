import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getWaitingOrders,
  approveWaitingOrder,
  deleteOrder as deleteOrderApi,
  getConfirmedOrders,
  updateOrderApi,  // ✅ 
} from "../services/apiSalePanel";

// ########################################################

export function useWaitingOrders() {
  const { data: waitingOrders, isLoading, error } = useQuery({
    queryKey: ["waiting-orders"],
    queryFn: async () => {
      const data = await getWaitingOrders();
      console.log("Updated Waiting Orders:", data); // 🔹 بررسی مقدار جدید
      return data;
    },
  });

  return { waitingOrders, isLoading, error };
}

// ########################################################

export function useApproveOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isApproving, mutate: approveOrder } = useMutation({
    mutationFn: (id) => approveWaitingOrder(id),
    onSuccess: () => {
      toast.success("سفارش با موفقیت تایید شد.");
      queryClient.invalidateQueries({
        queryKey: ["waiting-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmed-orders"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isApproving, approveOrder };
}

// ########################################################

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteOrder } = useMutation({
    mutationFn: (id) => deleteOrderApi(id),
    onSuccess: () => {
      toast.success("سفارش با موفقیت حذف شد.");
      queryClient.invalidateQueries({
        queryKey: ["waiting-orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["confirmed-orders"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteOrder };
}

// ########################################################

export function useConfirmedOrders() {
  const {
    data: confirmedOrders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["confirmed-orders"],
    queryFn: getConfirmedOrders,
  });

  return { confirmedOrders, isLoading, error };
}

// ########################################################
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateOrder } = useMutation({
    mutationFn: ({ id, updatedData }) => updateOrderApi(id, updatedData),

    onSuccess: () => {
      toast.success("سفارش با موفقیت ویرایش شد.");
     
      // پاک کردن کش و دریافت اطلاعات جدید
      queryClient.invalidateQueries({ queryKey: ["waiting-orders"] });
      queryClient.invalidateQueries({ queryKey: ["confirmed-orders"] });
      console.log("updateOrderApi فراخوانی شد!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateOrder };
}

