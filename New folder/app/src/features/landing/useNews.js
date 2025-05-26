import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../services/apiLanding";

export function useNews() {
  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  return { news, isLoading, error };
}
