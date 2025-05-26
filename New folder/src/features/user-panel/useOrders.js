/*eslint-disable */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrders } from "../../services/apiUserPanel";

export function useOrders() {
  // by the time, We're getting all the orders and filter it inside ProjectPAge.jsx until the api is given
  // const { projectId } = useParams(); // type of String

  const {
    data: orders,
    isLoading: isLoadingOrders,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  return { orders, isLoadingOrders, error };
}
