import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getProjects,
  createProject as createProjectApi,
} from "../../services/apiUserPanel";

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

export function useCreateProject() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createProject } = useMutation({
    mutationFn: (obj) => createProjectApi(obj),
    onSuccess: () => {
      toast.success("پروژه جدید با موفقیت ایجاد شد.");
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createProject };
}
