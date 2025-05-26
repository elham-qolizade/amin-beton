import { useQuery } from "@tanstack/react-query";
import {
  getWaitingCustomers,
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
