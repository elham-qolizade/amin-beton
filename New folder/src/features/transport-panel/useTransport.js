import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTransport } from "../../services/apiTransportPanel";

export function useTransport() {
  const { transportId } = useParams(); // type of String

  const {
    data: transport,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transport", transportId],
    queryFn: () => getTransport({ id: transportId }),
  });

  return { transport, isLoading, error };
}
