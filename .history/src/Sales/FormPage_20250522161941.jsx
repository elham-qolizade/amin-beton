import React, { useState } from "react";

import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

// کامپوننت مودال ساده
const Modal = ({ message, onClose }) => (
  <div className="modal-overlay " onClick={onClose}>
    <div
      className="flex items-center justify-center py-10 modal-content md:w-full w-96 "
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative p-8 text-white shadow-lg py-14 bg-Bokara-Grey rounded-2xl w-96">
        <button
          onClick={onClose}
          className="absolute text-lg font-bold top-2 left-2 text-red"
        >
          ×
        </button>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center">{message}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 font-medium transition bg-School-Bus text-Bokara-Grey rounded-xl hover:opacity-90"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  </div>
);

const FormPage = () => {
  const navigate = useNavigate();

  const { orderId } = useParams();
  const [formData, setFormData] = useState({
    requestedDate: "",
    paymentMethod: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({
    requestedDate: "",
    paymentMethod: "",
    additionalInfo: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // وضعیت مودال
  const [modalMessage, setModalMessage] = useState(""); // پیام مودال

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // if (!selectedDate) {
    //   formErrors.requestedDate = "لطفاً تاریخ و ساعت را انتخاب کنید";
    //   isValid = false;
    // }

    if (!formData.paymentMethod) {
      formErrors.paymentMethod = "لطفاً نحوه تسویه را وارد کنید";
      isValid = false;
    }

    // if (!formData.additionalInfo) {
    //   formErrors.additionalInfo = "لطفاً توضیحات را وارد کنید";
    //   isValid = false;
    // }

    setErrors(formErrors);
    return isValid;
  };

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
      setModalMessage("سفارش با موفقیت ثبت  شد!"); // تنظیم پیام مودال
      setIsModalOpen(true); // باز کردن مودال
    } else if (response.status === 401) {
      toast.error("خطای 401: لطفاً وارد شوید یا توکن معتبر وارد کنید.");
    } else {
      toast.error("خطا در به‌روزرسانی سفارش!");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formattedDate = selectedDate?.format("YYYY/MM/DD HH:mm");

      // ارسال داده‌ها به API
      if (orderId) {
        updateOrder(orderId);
      } else {
        toast.error("شناسه سفارش موجود نیست!");
      }
    }
  };

  return (
    <div className="flex items-center h-screen bg-Bokara-Grey ">
      <div className="container p-3 ">
        <h1 className="mb-6 text-xl font-bold text-white">فرم درخواست</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* تاریخ و ساعت درخواستی */}
          {/* <div>
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
              inputClass="bg-Bokara-Grey border  focus:outline-none focus:ring-1 focus:ring-School-Bus text-center text-white p-1 rounded w-full"
              className="w-full p-2 pl-4 text-black border border-l-4 bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus"
            />
            {errors.requestedDate && (
              <p className="mt-1 text-sm text-red">{errors.requestedDate}</p>
            )}
          </div> */}

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
              className={`w-full p-2 pl-4 text-white border border-l-4 border-l-Looking-Glass bg-Bokara-Grey rounded-md focus:outline-none focus:ring-1 focus:ring-School-Bus ${
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
              className={`w-full p-2 pl-4 text-white bg-Bokara-Grey border border-l-4 rounded-md border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus ${
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
            className="px-6 py-2 mt-4 text-black transition-colors duration-200 rounded-md hover:text-white bg-School-Bus hover:bg-yellow-400"
          >
            ارسال فرم
          </button>
        </form>

        {/* نمایش مودال */}
        {isModalOpen && (
          <Modal
            message={modalMessage}
            onClose={() => {
              setIsModalOpen(false);
              navigate("/ProjectPage"); // مسیر دلخواهت اینجا باشه
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FormPage;
