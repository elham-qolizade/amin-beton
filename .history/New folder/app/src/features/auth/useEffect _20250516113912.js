import { useQuery } from "@tanstack/react-query";
import { fetchMeApi } from "../../services/apiAuth";

export function useUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMeApi,
    onSuccess: (data) => {
      localStorage.setItem("roles", JSON.stringify(data.roles));
    },
  });
}
