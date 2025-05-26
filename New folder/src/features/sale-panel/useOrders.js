import { useQuery } from "@tanstack/react-query";
import {
  getWaitingOrders,
  getConfirmedOrders,
} from "../../services/apiSalePanel";

// ########################################################

export function useWaitingOrders() {
  const {
    data: waitingOrders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["waiting-orders"],
    queryFn: getWaitingOrders,
  });

  return { waitingOrders, isLoading, error };
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
