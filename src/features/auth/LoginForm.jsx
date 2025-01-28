import React, { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import logo from "../../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import axios from "axios";

const LoginForm = () => {
  const inputRefs = useRef([]);
  const [userData, setUserData] = useState(null);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      verificationCode: ["", "", "", "", "", ""],
      step: 1,
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^[0-9]{11}$/, "شماره تلفن باید ۱۱ رقمی باشد")
        .required("لطفاً شماره تلفن را وارد کنید"),
      verificationCode: Yup.array()
        .of(Yup.string().length(1, "کد تایید باید یک رقم باشد"))
        .required("لطفاً کد تایید را وارد کنید")
        .test("is-valid", "کد تایید باید ۶ رقم باشد", (value) =>
          value.every((v) => v !== "")
        ),
    }),
    onSubmit: async (values) => {
      try {
        if (values.step === 1) {
          await axios.post(
            "https://amin-beton-back.chbk.app/users/request_otp",
            {
              phone: values.phoneNumber,
            }
          );
          alert("کد تأیید ارسال شد!");
          formik.setFieldValue("step", 2);
        } else {
          const response = await axios.post(
            "https://amin-beton-back.chbk.app/users/users_login",
            {
              phone: values.phoneNumber,
              otp: values.verificationCode.join(""),
            }
          );
          alert("ورود موفقیت‌آمیز");

          const userResponse = await axios.get(
            "https://amin-beton-back.chbk.app/users/me",
            {
              headers: { Authorization: `Bearer ${response.data.token}` },
            }
          );
          setUserData(userResponse.data);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-Eerie-Black">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-6 px-20 py-10 text-center text-white border border-y-School-Bus bg-Bokara-Grey"
      >
        <div className="flex flex-row items-center gap-2 text-center text-white">
          <span className="text-lg font-medium">امین</span>
          <img className="w-8 h-8" src={logo} alt="Company Logo" />
          <span className="text-lg font-medium">بتن</span>
        </div>

        {formik.values.step === 1 ? (
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
            <label
              htmlFor="verification-code"
              className="block mb-2 text-center"
            >
              کد تایید
            </label>
            <div className="flex justify-center gap-2 px-24">
              {formik.values.verificationCode.map((value, index) => (
                <Input
                  key={index}
                  id={`code-input-${index}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `verificationCode[${index}]`,
                      e.target.value
                    )
                  }
                  className="h-12 text-2xl text-center bg-transparent border-2 border-gray-400 rounded-md "
                />
              ))}
            </div>
            {formik.errors.verificationCode &&
              formik.touched.verificationCode && (
                <div className="text-red-500">
                  {formik.errors.verificationCode}
                </div>
              )}
          </div>
        )}

        <Button
          type="submit"
          className="px-8 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
        >
          {formik.values.step === 1 ? "ارسال کد تایید" : "تایید کد"}
        </Button>

        {userData && (
          <div className="p-4 mt-4 text-white border border-white">
            <h3>اطلاعات کاربر:</h3>
            <p>نام: {userData.name}</p>
            <p>تلفن: {userData.phone}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
