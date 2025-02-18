// import React, { useState } from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// // import { useApi } from "../../Context/AuthContext";
// import Input from "../../ui/Input";
// import Button from "../../ui/Button";
// import logo from "../../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
// // import AuthService from "../../service/authService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginValidationSchema } from "../../utils/validationSchema";

// const LoginForm = () => {
//   const [otpSent, setOtpSent] = useState(false);
//   // const { fetchUserData } = useApi();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       phoneNumber: "",
//       otpCode: "",
//     },
//     validationSchema: loginValidationSchema(otpSent),
//     onSubmit: async (values) => {
//       if (!otpSent) {
//         // ارسال OTP
//         try {
//           const response = await fetch(
//             "https://amin-beton-back.chbk.app/api/users/send-otp/",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ phone: values.phoneNumber }),
//             }
//           );

//           if (response.ok) {
//             toast.success("کد تایید ارسال شد!"); // پیام موفقیت ارسال OTP
//             setOtpSent(true);
//           } else {
//             throw new Error("خطا در ارسال کد تایید");
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           toast.error("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید."); // پیام خطا
//         }
//       // } else {
//       //   // ورود با OTP
//       //   try {
//       //     const response = await fetch(
//       //       "https://amin-beton-back.chbk.app/api/users/login/",
//       //       {
//       //         method: "POST",
//       //         headers: {
//       //           "Content-Type": "application/json",
//       //         },
//       //         body: JSON.stringify({
//       //           phone: values.phoneNumber,
//       //           otp: values.otpCode,
//       //         }),
//       //       }
//       //     );

//           if (response.ok) {
//             toast.success("ورود با موفقیت انجام شد!"); // پیام موفقیت ورود
//             // عملیات بعد از ورود موفق مانند هدایت به صفحه دیگر
//             navigate("/"); // به عنوان مثال، به صفحه داشبورد هدایت شود
//           } else {
//             throw new Error("خطا در ورود");
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           toast.error("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید."); // پیام خطا
//         }
//       }
//     },
//   });

//   const handleOtpChange = (e, index) => {
//     const value = e.target.value.replace(/\D/g, "");

//     if (value.length > 1) return;

//     let newOtpArray = formik.values.otpCode.split("");
//     newOtpArray[index] = value;
//     const newOtp = newOtpArray.join("");

//     formik.setFieldValue("otpCode", newOtp);

//     if (value && index < 5) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   return (
//     <form
//       onSubmit={formik.handleSubmit}
//       className="flex flex-col items-center justify-center gap-10 px-6 py-10 text-white border-2 bg-Bokara-Grey border-School-Bus md:px-20 lg:px-32 xl:px-40"
//     >
//       <div className="flex flex-row items-center gap-2 text-2xl md:text-3xl text-School-Bus">
//         <span className="">امین</span>
//         <img className="h-10 md:h-12" src={logo} alt="Company Logo" />
//         <span className="">بتن</span>
//       </div>
//       {!otpSent ? (
//         <div className="flex flex-col items-center w-full space-y-4 md:w-2/3">
//           <label
//             htmlFor="phoneNumber"
//             className="text-base font-medium md:text-lg"
//           >
//             شماره همراه
//           </label>
//           <Input
//             id="phoneNumber"
//             name="phoneNumber"
//             className="w-full p-2 text-left text-white bg-gray-700 border rounded placeholder:text-left border-Looking-Glass focus:border-yellow-400 md:w-3/4"
//             onChange={formik.handleChange}
//             value={formik.values.phoneNumber}
//             placeholder={"******09"}
//             dir="ltr"
//           />
//           {formik.errors.phoneNumber && (
//             <div className="text-sm text-red-500 md:text-base">
//               {formik.errors.phoneNumber}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           <label
//             htmlFor="phoneNumber"
//             className="text-base font-medium md:text-lg"
//           >
//             کد تایید شیش رقمی
//           </label>
//           <div className="flex flex-row-reverse gap-2 md:gap-4">
//             {[...Array(6)].map((_, index) => (
//               <Input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 maxLength="1"
//                 className="w-10 h-12 px-3 text-lg text-center border rounded md:w-11 md:h-14 border-Looking-Glass focus:border-yellow-400 focus:outline-none"
//                 value={formik.values.otpCode[index] || ""}
//                 onChange={(e) => handleOtpChange(e, index)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//       <Button
//         type="submit"
//         className="w-full px-20 py-2 font-semibold text-gray-900 bg-yellow-500 rounded md:w-auto"
//       >
//         {otpSent ? "ورود" : "ارسال کد تایید"}
//       </Button>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={true}
//         closeOnClick={true}
//         draggable={false}
//         rtl={true}
//       />

//       {/* اینجا ToastContainer را قرار داده‌ایم تا پیام‌ها نمایش داده شوند */}
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
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
            toast.success("کد تایید ارسال شد!"); // پیام موفقیت ارسال OTP
            setOtpSent(true);
          } else {
            throw new Error("خطا در ارسال کد تایید");
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید."); // پیام خطا
        }
      } else {
        // ورود با OTP
        toast.success("ورود با موفقیت انجام شد!"); // پیام موفقیت ورود
        navigate("/projectPage"); // هدایت به صفحه Home
      }
    },
  });

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length > 1) return;

    let newOtpArray = formik.values.otpCode.split("");
    newOtpArray[index] = value;
    const newOtp = newOtpArray.join("");

    formik.setFieldValue("otpCode", newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center justify-center gap-10 px-6 py-10 text-white border-2 bg-Bokara-Grey border-School-Bus md:px-20 lg:px-32 xl:px-40"
    >
      <div className="flex flex-row items-center gap-2 text-2xl md:text-3xl text-School-Bus">
        <span className="">امین</span>
        <img className="h-10 md:h-12" src={logo} alt="Company Logo" />
        <span className="">بتن</span>
      </div>
      {!otpSent ? (
        <div className="flex flex-col items-center w-full space-y-4 md:w-2/3">
          <label
            htmlFor="phoneNumber"
            className="text-base font-medium md:text-lg"
          >
            شماره همراه
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            className="w-full p-2 text-left text-white bg-gray-700 border rounded placeholder:text-left border-Looking-Glass focus:border-yellow-400 md:w-3/4"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            placeholder={"******09"}
            dir="ltr"
          />
          {formik.errors.phoneNumber && (
            <div className="text-sm text-red-500 md:text-base">
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label
            htmlFor="phoneNumber"
            className="text-base font-medium md:text-lg"
          >
            کد تایید شیش رقمی
          </label>
          <div className="flex flex-row-reverse gap-2 md:gap-4">
            {[...Array(6)].map((_, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="w-10 h-12 px-3 text-lg text-center border rounded md:w-11 md:h-14 border-Looking-Glass focus:border-yellow-400 focus:outline-none"
                value={formik.values.otpCode[index] || ""}
                onChange={(e) => handleOtpChange(e, index)}
              />
            ))}
          </div>
        </div>
      )}
      <Button
        type="submit"
        className="w-full px-20 py-2 font-semibold text-gray-900 bg-yellow-500 rounded md:w-auto"
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
  );
};

export default LoginForm;
