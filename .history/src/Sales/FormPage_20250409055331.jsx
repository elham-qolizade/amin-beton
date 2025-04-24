// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

const FormPage = () => {
  // وضعیت فرم
  const { orderId } = useParams();
  // استخراج orderId از URL
  console.log("Extracted Order ID:", orderId);
  const [formData, setFormData] = useState({
    requestedDate: "",
    paymentMethod: "",
    additionalInfo: "",
  });

  // وضعیت خطاها
  const [errors, setErrors] = useState({
    requestedDate: "",
    paymentMethod: "",
    additionalInfo: "",
  });

  // وضعیت انتخاب تاریخ
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!selectedDate) {
      formErrors.requestedDate = "لطفاً تاریخ و ساعت را انتخاب کنید";
      isValid = false;
    }

    if (!formData.paymentMethod) {
      formErrors.paymentMethod = "لطفاً نحوه تسویه را وارد کنید";
      isValid = false;
    }

    if (!formData.additionalInfo) {
      formErrors.additionalInfo = "لطفاً توضیحات را وارد کنید";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  //   if (!token) {
  //     toast.warn("⛔️ لطفاً وارد شوید تا بتوانید ویرایش کنید.");
  //     return;
  //   }

  //   const response = await fetch(
  //     `https://amin-beton-back.chbk.app/api/orders/${id}/`, // مسیر جدید برای PATCH
  //     {
  //       method: "PATCH", // تغییر متد از PUT به PATCH
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         settlement_type: formData.paymentMethod, // اطلاعات مربوط به نوع تسویه
  //         additional_description: formData.additionalInfo, // توضیحات تکمیلی
  //       }),
  //     }
  //   );

  //   if (response.ok) {
  //     toast.success("اطلاعات با موفقیت به‌روزرسانی شد!");
  //   } else if (response.status === 401) {
  //     toast.error("خطای 401: لطفاً وارد شوید یا توکن معتبر وارد کنید.");
  //   } else {
  //     toast.error("خطا در به‌روزرسانی سفارش!");
  //   }
  // };

  // استفاده از useEffect برای بارگذاری داده‌ها به محض بارگذاری کامپوننت

  // تابع برای ارسال داده‌های فرم به API
  const updateOrder = async (id) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.warn("⛔️ لطفاً وارد شوید تا بتوانید ویرایش کنید.");
      return;
    }

    const response = await fetch(
      `https://amin-beton-back.chbk.app/api/orders/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          settlement_type: formData.paymentMethod,
          additional_description: formData.additionalInfo,
        }),
      }
    );

    if (response.ok) {
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد!");
    } else if (response.status === 401) {
      toast.error("خطای 401: لطفاً وارد شوید یا توکن معتبر وارد کنید.");
    } else {
      toast.error("خطا در به‌روزرسانی سفارش!");
    }
  };

  // تابع برای ارسال فرم
  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formattedDate = selectedDate?.format("YYYY/MM/DD HH:mm");
      console.log("Form data:", { ...formData, requestedDate: formattedDate });

      // استفاده از orderId از URL
      console.log("Order ID in onSubmit:", orderId); // نمایش orderId برای بررسی

      if (orderId) {
        updateOrder(orderId); // فراخوانی updateOrder با استفاده از orderId از URL
      } else {
        toast.error("شناسه سفارش موجود نیست!");
      }
    }
  };

  // تابع برای اعتبارسنجی فرم

  return (
    <div className="container p-6 mt-10 rounded-lg shadow-md bg-Bokara-Grey">
      <h1 className="mb-6 text-xl font-bold text-white">فرم درخواست</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* تاریخ و ساعت درخواستی */}
        <div>
          <label
            htmlFor="requestedDate"
            className="block mb-1 text-Looking-Glass"
          >
            تاریخ و ساعت درخواستی
          </label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD HH:mm"
            value={selectedDate}
            onChange={setSelectedDate}
            plugins={[<TimePicker position="bottom" />]}
            inputClass="bg-black border border-white   text-center text-white p-1 rounded w-full"
            placeholder="تاریخ و ساعت را انتخاب کنید"
            className="w-full p-2 pl-4 text-black bg-black border border-l-4 border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus"
          />
          {errors.requestedDate && (
            <p className="mt-1 text-sm text-red">{errors.requestedDate}</p>
          )}
        </div>

        {/* نحوه تسویه */}
        <div>
          <label
            htmlFor="paymentMethod"
            className="block mb-1 text-Looking-Glass"
          >
            نحوه تسویه
          </label>
          <textarea
            id="paymentMethod"
            rows="3"
            placeholder="مثلاً: نقدی، چک، انتقال بانکی..."
            className={`w-full p-2 pl-4 text-white border border-l-4 border-l-Looking-Glass bg-black rounded-md focus:outline-none focus:ring-1 focus:ring-School-Bus ${
              errors.paymentMethod ? "border-red-500" : ""
            }`}
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          />
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red">{errors.paymentMethod}</p>
          )}
        </div>

        {/* توضیحات تکمیلی */}
        <div>
          <label
            htmlFor="additionalInfo"
            className="block mb-1 text-Looking-Glass"
          >
            توضیحات تکمیلی
          </label>
          <textarea
            id="additionalInfo"
            rows="4"
            placeholder="توضیحات اضافی خود را وارد کنید..."
            className={`w-full p-2 pl-4 text-white bg-black border border-l-4 rounded-md border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus ${
              errors.additionalInfo ? "border-red-500" : ""
            }`}
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
          {errors.additionalInfo && (
            <p className="mt-1 text-sm text-red">{errors.additionalInfo}</p>
          )}
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          className="px-6 py-2 mt-4 text-black transition-colors duration-200 rounded-md bg-School-Bus hover:bg-yellow-400"
        >
          ارسال فرم
        </button>
      </form>
    </div>
  );
};

export default FormPage;
