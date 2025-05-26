/*eslint-disable */
import { useMutation } from "@tanstack/react-query";
import { postContact as postContactApi } from "../../services/apiLanding";
import toast from "react-hot-toast";

export function usePostContact() {
  const { mutate: postContact, isLoading: isPostingContact } = useMutation({
    // req = {first_name: ... , last_name: ..., phone:..., email:... , company:..., description:...}
    mutationFn: (req) => postContactApi(req),
    onSuccess: (data) => {
      // console.log(data);
      toast.success("پیام شما با موفقیت ارسال شد.");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { postContact, isPostingContact };
}
