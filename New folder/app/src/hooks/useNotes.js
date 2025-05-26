import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNote as addNoteApi } from "../services/apiSalePanel";
import { getNote as getNoteApi } from "../services/apiExecutionPanel";

export function useAddNote() {
  const { isLoading: isSending, mutate: addNote } = useMutation({
    mutationFn: (obj) => addNoteApi(obj),
    onSuccess: () => {
      toast.success("یادداشت با موفقیت اضافه شد.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isSending, addNote };
}

//####################################################

export function useNote() {
  const {
    isLoading: isLoadingNote,
    mutate: getNote,
    data: note,
  } = useMutation({
    mutationFn: (id) => getNoteApi(id),
    onSuccess: () => {
      // toast.success("یادداشت با موفقیت اضافه شد.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoadingNote, getNote, note };
}
