import { useQuery } from "@tanstack/react-query";
import { getLabCategories } from "../../services/apiLabPanel";

export function useLabCategories() {
  const {
    data: labCategories,
    isLoading: isLoadingLabCategories,
    error,
  } = useQuery({
    queryKey: ["lab-categories"],
    queryFn: getLabCategories,
  });

  return { labCategories, isLoadingLabCategories, error };
}
