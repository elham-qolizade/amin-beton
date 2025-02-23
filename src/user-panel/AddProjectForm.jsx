import React, { useEffect, useCallback, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MapComponent from "../ui/MapComponent";
import Input from "../ui/Input";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { ProjectFields } from "../constans/index";
import ButtonProject from "../ui/ButtonProject";

const ProjectForm = () => {
  const navigate = useNavigate();

  // مقداردهی اولیه فرم
  const getInitialValues = useCallback(() => {
    const initialValues = ProjectFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
    initialValues.projectDate = ""; // مقدار اولیه برای تاریخ پروژه
    initialValues.latitude = "";
    initialValues.longitude = "";

    return initialValues;
  }, []);

  // تعریف اسکیمای اعتبارسنجی با Yup
  const validationSchema = Yup.object(
    ProjectFields.reduce(
      (schema, field) => {
        schema[field.name] = field.validation;
        return schema;
      },
      {
        projectDate: Yup.string().required("تاریخ پروژه الزامی است"),
        latitude: Yup.string().required("عرض جغرافیایی الزامی است"),
        longitude: Yup.string().required("طول جغرافیایی الزامی است"),
      }
    )
  );

  // استفاده از useFormik برای مدیریت فرم
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    location: [35.6892, 51.389],
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://amin-beton-back.chbk.app/api/projects/",
          values,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("✅ پروژه با موفقیت ثبت شد:", response.data);
        alert("🎉 پروژه جدید با موفقیت ثبت شد!");
        navigate("/OrderPage");
      } catch (error) {
        console.error("❌ خطا در ارسال اطلاعات:", error);
        alert("⚠️ مشکلی در ثبت پروژه به وجود آمد.");
      }
    },
  });

  useEffect(() => {
    formik.setValues(getInitialValues());
  }, [getInitialValues]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full p-8 border rounded-lg bg-Bokara-Grey border-School-Bus">
        {/* هدر */}
        <div className="container flex flex-col items-center justify-center pb-6 text-School-Bus">
          <div className="flex items-center gap-1 md:gap-2 ">
            <span className="text-sm font-bold text-yellow-400 md:text-4xl">
              امین
            </span>
            <img className="w-12 h-12" src={logo} alt="Company Logo" />
            <span className="text-sm font-bold text-yellow-400 md:text-4xl">
              بتن
            </span>
          </div>
        </div>

        <h2 className="mb-6 text-sm font-semibold text-center md:text-2xl text-School-Bus">
          ثبت پروژه جدید
        </h2>

        {/* فرم */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {/* فیلدهای متنی */}
            {ProjectFields.filter(
              ({ name }) => !["description", "address"].includes(name)
            ).map(({ name, placeholder }) => (
              <div key={name} className="flex flex-col min-w-0 md:col-span-1">
                <Input
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name] || ""}
                  className={`w-full text-white rounded px-4 py-2 bg-gray-700 border border-Looking-Glass 
            ${
              formik.touched[name] && formik.errors[name]
                ? "border-red-500"
                : "border-gray-600"
            }`}
                />
                {formik.touched[name] && formik.errors[name] && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors[name]}
                  </p>
                )}
              </div>
            ))}

            {/* فیلد آدرس */}
            <div className="flex flex-col col-span-1 md:col-span-2">
              <textarea
                name="address"
                placeholder="آدرس پروژه"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address || ""}
                className="w-full h-24 px-4 py-2 text-white border rounded border-Looking-Glass bg-Bokara-Grey"
              />
            </div>

            {/* فیلد توضیحات */}
            <div className="flex flex-col col-span-1 md:col-span-2">
              <textarea
                name="description"
                placeholder="توضیحات پروژه"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description || ""}
                className="w-full h-32 px-4 py-2 text-white border rounded border-Looking-Glass bg-Bokara-Grey"
              />
            </div>

            {/* نقشه */}
            <div className="flex justify-center col-span-1 md:col-span-2">
              <div className="w-full md:w-2/3">
                <MapComponent
                  width="100%"
                  height="300px"
                  onLocationSelect={(coords) => {
                    formik.setFieldValue("latitude", coords[0]);
                    formik.setFieldValue("longitude", coords[1]);
                  }}
                />
              </div>
            </div>
          </div>

          {/* دکمه ارسال */}
          <div className="flex justify-center">
            <ButtonProject
              type="submit"
              onClick={() => navigate("/OrdersPage ")}
              className="py-2 font-semibold bg-yellow-500 rounded w-48 md:w-64 hover:bg-yellow-600"
            >
              افزودن پروژه
            </ButtonProject>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
