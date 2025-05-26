import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/apiUserPanel";

export function useProjects() {
  const {
    data: projects,
    isLoading: isLoadingProjects,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return { projects, isLoadingProjects, error };
}
