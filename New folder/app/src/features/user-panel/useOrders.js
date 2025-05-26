// /*eslint-disable */
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAllOrders,
  getProjectOrders as getProjectOrdersApi,
  createInitialOrder as createInitialOrderApi,
  createPumpOrder as createPumpOrderApi,
  createVibratorOrder as createVibratorOrderApi,
  createCompleteOrder as createCompleteOrderApi,
  getOrder,
} from "../../services/apiUserPanel";

export function useAllOrders() {
  const {
    data: allOrders,
    isLoading: isLoadingAllOrders,
    error,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: () => getAllOrders(),
  });

  return { allOrders, isLoadingAllOrders, error };
}

export function useOrder(id) {
  const {
    data: order,
    isLoading: isLoadingOrder,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });

  return { order, isLoadingOrder, error };
}

export function useProjectOrders() {
  const {
    isLoading: isLoadingProjectOrders,
    mutate: getProjectOrders,
    data: projectOrders,
  } = useMutation({
    mutationFn: (id) => getProjectOrdersApi(id),
    onSuccess: () => {
      // toast.success("سفارش های شما دریافت شد.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoadingProjectOrders, getProjectOrders, projectOrders };
}

export function useCreateInitialOrder() {
  const navigate = useNavigate();
  const {
    isLoading: isCreatingInitialOrder,
    mutate: createInitialOrder,
    data: initialOrder,
  } = useMutation({
    mutationFn: (obj) => createInitialOrderApi(obj),
    onSuccess: (data) => {
      toast.success(
        "مرحله اول سفارش با موفقیت انجام شد. به مرحله بعدی جهت سفارش پمپ منتقل می‌شوید.",
        {
          duration: 10000,
        }
      );

      navigate(`pump-order/${data.id}`);
      console.log("data after submition: ", data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreatingInitialOrder, createInitialOrder, initialOrder };
}

export function useCreatePumpOrder() {
  const navigate = useNavigate();
  const { projectId, orderId } = useParams();

  const {
    isLoading: isCreatingPumpOrder,
    mutate: createPumpOrder,
    data: pumpOrder,
  } = useMutation({
    mutationFn: (obj) => createPumpOrderApi(obj),
    onSuccess: (data) => {
      toast.success(
        "سفارش پمپ ها با موفقیت انجام شد. به مرحله سفارش ویبراتور منتقل می‌شوید.",
        {
          duration: 10000,
        }
      );

      navigate(
        `/user-panel/projects/${projectId}/make-order/vibrator-order/${orderId}`
      );
      console.log("data after pump submition: ", data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreatingPumpOrder, createPumpOrder, pumpOrder };
}

export function useCreateVibratorOrder() {
  const navigate = useNavigate();
  const { projectId, orderId } = useParams();

  const {
    isLoading: isCreatingVibratorOrder,
    mutate: createVibratorOrder,
    data: vibratorOrder,
  } = useMutation({
    mutationFn: (obj) => createVibratorOrderApi(obj),
    onSuccess: (data) => {
      toast.success(
        "سفارش ویبراتور ها با موفقیت انجام شد و به مرحله پایانی سفارش منتقل می‌شوید",
        {
          duration: 10000,
        }
      );

      navigate(
        `/user-panel/projects/${projectId}/make-order/complete-order/${orderId}`
      );
      console.log("data after Vibrator submition: ", data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreatingVibratorOrder, createVibratorOrder, vibratorOrder };
}

export function useCreateCompleteOrder() {
  const navigate = useNavigate();
  const { projectId, orderId } = useParams();

  const {
    isLoading: isCreatingCompleteOrder,
    mutate: createCompleteOrder,
    data: completeOrder,
  } = useMutation({
    mutationFn: (obj) => createCompleteOrderApi({ id: orderId, obj }),
    onSuccess: (data) => {
      toast.success(
        "مرحله پایانی سفارش با موفقیت انجام شد. به صفحه سفارشات منتقل می‌شوید.",
        {
          duration: 10000,
        }
      );

      navigate(`/user-panel/projects/${projectId}`);
      console.log("data after final submition: ", data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreatingCompleteOrder, createCompleteOrder, completeOrder };
}
