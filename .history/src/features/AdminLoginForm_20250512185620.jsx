import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("یوزرنیم الزامی است"),
      password: Yup.string().required("رمز عبور الزامی است"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://amin-beton-back.chbk.app/api/admin-login/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          if (data.roles) {
            localStorage.setItem("roles", JSON.stringify(data.roles));
          }
          navigate("/dashboard"); // یا مسیر مورد نظرت
        } else if (response.status === 401) {
          alert("یوزرنیم یا رمز عبور اشتباه است.");
        } else {
          alert("خطا در ورود به سیستم.");
        }
      } catch (error) {
        alert("مشکلی پیش آمده است.");
        console.error(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 p-6 rounded bg-gray-800 w-96"
      >
        <h2 className="text-2xl font-bold text-center">ورود ادمین</h2>

        <div>
          <label htmlFor="username" className="block mb-1">
            یوزرنیم
          </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-sm text-red-400">{formik.errors.username}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            رمز عبور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-sm text-red-400">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-black bg-yellow-400 rounded hover:bg-yellow-300"
        >
          ورود
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
