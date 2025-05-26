import { useQuery } from "@tanstack/react-query";
import { getTransports } from "../../services/apiTransportPanel";

export function useTransports() {
  const {
    data: transports,
    isLoading: isLoadingTransports,
    error,
  } = useQuery({
    queryKey: ["transports"],
    queryFn: getTransports,
  });

  return { transports, isLoadingTransports, error };
}
