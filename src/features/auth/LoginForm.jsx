import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import logo from "../../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginValidationSchema } from "../../utils/validationSchema";

const convertToEnglishNumbers = (input) => {
  const persianToEnglishMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };
  return input.replace(/[۰-۹]/g, (char) => persianToEnglishMap[char] || char);
};

const LoginForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
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
      const phoneNumberInEnglish = convertToEnglishNumbers(values.phoneNumber);
      const otpCodeInEnglish = convertToEnglishNumbers(values.otpCode);

      if (!otpSent) {
        try {
          const response = await fetch(
            "https://amin-beton-back.chbk.app/api/users/send-otp/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ phone: phoneNumberInEnglish }),
            }
          );

          if (response.ok) {
            toast.success("کد تایید ارسال شد!");
            setOtpSent(true);
          } else if (response.status === 404) {
            // If 404 error, redirect to the sign-up page
            navigate("/userform");
          } else {
            throw new Error("خطا در ارسال کد تایید");
          }
        } catch (error) {
          toast.error("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.");
        }
      } else {
        try {
          const response = await fetch(
            "https://amin-beton-back.chbk.app/api/users/login/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                phone: phoneNumberInEnglish,
                otp: otpCodeInEnglish,
              }),
            }
          );

          if (!response.ok) {
            if (response.status === 403) {
              // If 403 error, show the error message from the response
              const data = await response.json();
              toast.error(
                `❌ ${data.message || "کد تأیید نامعتبر است یا منقضی شده."}`
              );
            } else {
              throw new Error("خطا در تأیید کد");
            }
          } else {
            const data = await response.json();
            localStorage.setItem("accessToken", data.access);
            if (data.refresh)
              localStorage.setItem("refreshToken", data.refresh);

            toast.success("ورود با موفقیت انجام شد!");
            navigate("/projectPage");
          }
        } catch (error) {
          toast.error("کد تأیید نامعتبر است یا منقضی شده.");
        }
      }
    },
  });

  const handleOtpChange = (e, index) => {
    const value = convertToEnglishNumbers(e.target.value).replace(/\D/g, "");
    if (value.length > 1) return;

    let newOtpArray = formik.values.otpCode.split("");
    newOtpArray[index] = value;
    const newOtp = newOtpArray.join("");

    formik.setFieldValue("otpCode", newOtp);

    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    } else if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-Bokara-Grey">
      <div className="container flex items-center justify-center text-white">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-1/2 gap-10"
        >
          <div className="flex items-center gap-2 text-3xl text-School-Bus">
            <span>امین</span>
            <img className="h-12" src={logo} alt="Company Logo" />
            <span>بتن</span>
          </div>
          {!otpSent ? (
            <Input
              id="phoneNumber"
              name="phoneNumber"
              className="w-full p-2 text-left text-white bg-gray-700 border rounded"
              onChange={(e) =>
                formik.setFieldValue(
                  "phoneNumber",
                  convertToEnglishNumbers(e.target.value)
                )
              }
              value={formik.values.phoneNumber}
              placeholder="09121111111"
              dir="ltr"
            />
          ) : (
            <div className="flex flex-row-reverse justify-center w-full gap-2">
              {[...Array(6)].map((_, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="tel"
                  inputMode="numeric"
                  maxLength="1"
                  className="w-10 h-12 text-lg text-center border rounded"
                  value={formik.values.otpCode[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                />
              ))}
            </div>
          )}
          <Button
            type="submit"
            className="w-full font-semibold bg-yellow-500 rounded"
          >
            {otpSent ? "ورود" : "ارسال کد تایید"}
          </Button>
          <ToastContainer position="top-center" autoClose={5000} rtl={true} />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
