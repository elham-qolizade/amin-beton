import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../services/apiUserPanel";

export function useProject(id) {
  const {
    data: project,
    isLoading: isLoadingProject,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject({ id }),
  });

  return { project, isLoadingProject, error };
}
