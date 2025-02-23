import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Input from "../ui/Input";
import Button from "../ui/Button";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import AuthService from "../service/authService";
import { ToastContainer, toast } from "react-toastify";

import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("لطفاً نام و نام خانوادگی خود را وارد کنید"),
  nationalCode: Yup.string()
    .matches(/^[0-9]{10}$/, "کد ملی باید 10 رقم باشد")
    .required("لطفاً کد ملی خود را وارد کنید"),
  phoneNumber: Yup.string()
    .matches(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست")
    .required("لطفاً شماره موبایل خود را وارد کنید"),
});

const UserForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      nationalCode: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await AuthService.register(values);
        toast.success("اطلاعات با موفقیت ثبت شد!");
        fetchUserData();
        navigate("/");
      } catch (error) {
        toast.error("خطا در ثبت اطلاعات، لطفاً مجدداً تلاش کنید");
      }
    },
  });

  return (
    <div className="border-2 h-screen flex items-center justify-center bg-Bokara-Grey border-School-Bus">
      <div className="gap-10 container px-4 flex text-white">
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-full justify-center items-center gap-10 flex-col"
        >
          <div className="flex flex-row items-center gap-2 text-3xl text-School-Bus">
            <span className="">امین</span>
            <img className="h-12" src={logo} alt="Company Logo" />
            <span className="">بتن</span>
          </div>

          <div className="flex flex-col items-center w-full space-y-4">
            <label
              htmlFor="fullName"
              className="self-start text-lg font-medium"
            >
              نام و نام خانوادگی
            </label>
            <Input
              id="fullName"
              name="fullName"
              className="p-2 text-right text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              placeholder="نام و نام خانوادگی"
            />
            {formik.errors.fullName && (
              <div className="text-red">{formik.errors.fullName}</div>
            )}

            <label
              htmlFor="nationalCode"
              className="self-start text-lg font-medium"
            >
              کد ملی
            </label>
            <Input
              id="nationalCode"
              name="nationalCode"
              className="p-2 text-right text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
              onChange={formik.handleChange}
              value={formik.values.nationalCode}
              placeholder="کد ملی"
            />
            {formik.errors.nationalCode && (
              <div className="text-red">{formik.errors.nationalCode}</div>
            )}

            <label
              htmlFor="phoneNumber"
              className="self-start text-lg font-medium"
            >
              شماره همراه
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              placeholder="شماره همراه"
              dir="ltr"
            />
            {formik.errors.phoneNumber && (
              <div className="text-red">{formik.errors.phoneNumber}</div>
            )}
          </div>
          <div className="flex items-center p-3 mt-2 text-sm text-white bg-black rounded-md">
            <span className="ml-2">⚠️</span>
            <span>
              همکاران ما در واحد فروش پس از بررسی اطلاعات شما در سریع‌ترین زمان
              ممکن با شما تماس خواهند گرفت.
            </span>
          </div>

          <Button
            type="submit"
            className="py-2 font-semibold text-gray-900 bg-yellow-500 rounded px-28"
          >
            ثبت اطلاعات
          </Button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default UserForm;
