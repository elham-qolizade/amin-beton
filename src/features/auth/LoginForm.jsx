import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import logo from "../../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginValidationSchema } from "../../utils/validationSchema";

const LoginForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // بررسی اینکه آیا توکن‌ها در localStorage موجود هستند
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // اگر توکن موجود باشد، به صفحه پروژه هدایت می‌کنیم
      navigate("/projectPage");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      otpCode: "",
    },
    validationSchema: loginValidationSchema(otpSent),
    onSubmit: async (values) => {
      if (!otpSent) {
        // ارسال OTP
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
            toast.success("کد تایید ارسال شد!");
            setOtpSent(true);
          } else {
            throw new Error("خطا در ارسال کد تایید");
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.");
        }
      } else {
        // تأیید کد و دریافت توکن‌ها
        try {
          const response = await fetch(
            "https://amin-beton-back.chbk.app/api/users/login/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phone: values.phoneNumber,
                otp: values.otpCode,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("خطا در تأیید کد");
          }

          const data = await response.json();

          // ذخیره‌ی توکن‌ها در localStorage
          localStorage.setItem("accessToken", data.access);
          if (data.refresh) {
            localStorage.setItem("refreshToken", data.refresh);
          }

          toast.success("ورود با موفقیت انجام شد!");
          navigate("/projectPage");
        } catch (error) {
          console.error("Error during OTP verification:", error);
          toast.error("کد تأیید نامعتبر است یا منقضی شده.");
        }
      }
    },
  });

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // حذف غیر عددها

    if (value.length > 1) return; // فقط یک عدد مجاز است

    let newOtpArray = formik.values.otpCode.split("");
    newOtpArray[index] = value;
    const newOtp = newOtpArray.join("");

    formik.setFieldValue("otpCode", newOtp);

    // اگر فیلد خالی شد، به فیلد قبلی برو
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    } else if (value && index < 5) {
      // تمرکز خودکار به فیلد بعدی
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="h-screen bg-Bokara-Grey border-2 border-School-Bus flex items-center justify-center">
      <div className="container md:mb-0 mb-32 flex items-center justify-center text-white">
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-4/5 md:w-1/2 justify-center items-center gap-10 flex-col"
        >
          <div className="flex flex-row items-center gap-2 text-2xl md:text-3xl text-School-Bus">
            <span className="">امین</span>
            <img className="h-10 md:h-12" src={logo} alt="Company Logo" />
            <span className="">بتن</span>
          </div>
          {!otpSent ? (
            <div className="flex flex-col items-center w-full space-y-4 ">
              <label
                htmlFor="phoneNumber"
                className="text-base font-medium md:text-lg"
              >
                شماره همراه
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                className="w-full p-2 text-left text-white bg-gray-700 border rounded placeholder:text-left border-Looking-Glass focus:border-yellow-400 "
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                placeholder={"09121111111"}
                dir="ltr"
              />
              {formik.errors.phoneNumber && (
                <div className="text-sm text-red-500 md:text-base">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col w-full justify-center items-center gap-4">
              <label
                htmlFor="otpCode"
                className="text-base font-medium md:text-lg"
              >
                کد تایید شیش رقمی
              </label>
              <div className="flex w-full items-center justify-center flex-row-reverse gap-2 md:gap-4">
                {[...Array(6)].map((_, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    className="w-10 h-12 text-lg text-center border rounded md:w-11 md:h-14 border-Looking-Glass focus:border-yellow-400 focus:outline-none"
                    value={formik.values.otpCode[index] || ""}
                    onChange={(e) => handleOtpChange(e, index)}
                  />
                ))}
              </div>
            </div>
          )}
          <Button
            type="submit"
            className="md:w-1/2 w-full font-semibold text-gray-900 bg-yellow-500 rounded"
          >
            {otpSent ? "ورود" : "ارسال کد تایید"}
          </Button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick={true}
            draggable={false}
            rtl={true}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
