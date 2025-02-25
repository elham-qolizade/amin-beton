import * as Yup from "yup";

export const loginValidationSchema = (otpSent) =>
  Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^09[0-9]{9}$/, "شماره موبایل باید ۱۱ رقمی و با ۰۹ شروع شود")
      .required("شماره موبایل الزامی است"),
    otpCode: otpSent
      ? Yup.string()
          .matches(/^\d{6}$/, "کد تایید باید ۶ رقمی باشد")
          .required("کد تایید الزامی است")
      : Yup.string(),
  });
