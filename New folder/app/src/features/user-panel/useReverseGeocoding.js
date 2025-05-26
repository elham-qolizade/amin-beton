import { useQuery } from "@tanstack/react-query";
import { getReverseGeocoding } from "../../services/apiUserPanel";

export function useReverseGeocoding(id, latitude, longitude) {
  const {
    data: address,
    isLoading: isLoadingAddress,
    error,
  } = useQuery({
    queryKey: ["address", id],
    queryFn: () => getReverseGeocoding({ latitude, longitude }),
  });

  return { address, isLoadingAddress, error };
}
