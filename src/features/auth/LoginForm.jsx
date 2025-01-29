import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import logo from "../../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import Addproject from "../../user-panel/AddProjectForm";
const LoginForm = () => {
  const inputRefs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      otpCode: "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^09\d{9}$/, "شماره تلفن باید ۱۱ رقمی و با 09 شروع شود")
        .required("لطفاً شماره تلفن را وارد کنید"),
      otpCode: otpSent
        ? Yup.string()
            .length(6, "کد تایید باید ۶ رقمی باشد")
            .required("لطفاً کد تایید را وارد کنید")
        : Yup.string(),
    }),
    onSubmit: async (values) => {
      if (!otpSent) {
        try {
          const response = await fetch(
            "https://amin-beton-back.chbk.app/api/users/send-otp/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ phone: values.phoneNumber }),
            }
          );

          if (response.ok) {
            alert("کد تایید ارسال شد!");
            setOtpSent(true);
          } else {
            throw new Error("خطا در ارسال کد تایید");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.");
        }
      } else {
        setIsVerified(true);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-Eerie-Black">
      {!isVerified ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center gap-6 px-20 py-10 text-center text-white border border-y-School-Bus bg-Bokara-Grey"
        >
          <div className="flex flex-row items-center gap-2 text-center text-white">
            <span className="text-lg font-medium">امین</span>
            <img className="w-8 h-8" src={logo} alt="Company Logo" />
            <span className="text-lg font-medium">بتن</span>
          </div>

          {!otpSent ? (
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2 text-center">
                شماره همراه
              </label>
              <Input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="*********09"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                className="mt-2 pr-36"
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <div className="text-red-500">{formik.errors.phoneNumber}</div>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="otpCode" className="block mb-2 text-center">
                کد تایید را وارد کنید
              </label>
              <Input
                type="text"
                id="otpCode"
                name="otpCode"
                placeholder="******"
                value={formik.values.otpCode}
                onChange={formik.handleChange}
                className="mt-2 pr-36"
              />
              {formik.errors.otpCode && formik.touched.otpCode && (
                <div className="text-red-500">{formik.errors.otpCode}</div>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="px-8 py-2 text-white rounded"
            style={{
              backgroundColor: otpSent ? "green" : "yellow",
              hover: otpSent ? "bg-green-600" : "bg-yellow-600",
            }}
          >
            {otpSent ? "کد دریافت شد" : "ارسال کد تایید"}
          </Button>
        </form>
      ) : (
        <Addproject />
      )}
    </div>
  );
};

export default LoginForm;
