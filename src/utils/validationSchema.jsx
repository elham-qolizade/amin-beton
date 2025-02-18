import * as Yup from "yup";

export const loginValidationSchema = (otpSent) => {
  return Yup.object({
    phoneNumber: Yup.string()
      .matches(/^09\d{9}$/, "شماره تلفن باید ۱۱ رقمی و با 09 شروع شود.")
      .required("لطفاً شماره تلفن را وارد کنید."),
    otpCode: otpSent
      ? Yup.string()
          .matches(/^\d{6}$/, "کد تایید باید فقط شامل ۶ رقم باشد.")
          .required("لطفاً کد تایید را وارد کنید.")
      : Yup.string(),
  });
};
