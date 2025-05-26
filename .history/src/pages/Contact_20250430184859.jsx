import React, { useState } from "react";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import Button from "../ui/Button";
import Modal from "./Modal"; // اطمینان از مسیر درست
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    company: "",
    address: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // regex برای شماره موبایل ایرانی (۱۱ رقم فقط عدد)
  const phoneRegex = /^09\d{9}$/;

  const validate = () => {
    let tempErrors = {};

    // full_name
    if (!formData.full_name.trim()) {
      tempErrors.full_name = "نام و نام خانوادگی الزامی است.";
    } else if (formData.full_name.length > 256) {
      tempErrors.full_name =
        "نام و نام خانوادگی نباید بیشتر از 256 کاراکتر باشد.";
    }

    // phone
    if (!formData.phone.trim()) {
      tempErrors.phone = "شماره تماس الزامی است.";
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "شماره تماس معتبر نیست. فرمت صحیح: 09123456789";
    }

    // company
    if (formData.company.length > 256) {
      tempErrors.company = "نام شرکت نباید بیشتر از 256 کاراکتر باشد.";
    }

    // address
    if (!formData.address.trim()) {
      tempErrors.address = "آدرس الزامی است.";
    } else if (formData.address.length > 1024) {
      tempErrors.address = "آدرس نباید بیشتر از 1024 کاراکتر باشد.";
    }

    // description
    if (!formData.description.trim()) {
      tempErrors.description = "توضیحات الزامی است.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handlePhoneInput = (e) => {
    const phoneNumber = e.target.value;

    // هنگام تایپ فقط عدد بپذیره
    if (!/^\d*$/.test(phoneNumber)) return;

    setFormData({
      ...formData,
      phone: phoneNumber,
    });

    // بررسی اعتبار شماره
    if (!phoneRegex.test(phoneNumber)) {
      setErrors({
        ...errors,
        phone: "شماره تلفن باید با 09 شروع شده و 11 رقم باشد.",
      });
    } else {
      setErrors({
        ...errors,
        phone: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/users/contact-us/",
        formData
      );

      if (response.status === 200) {
        setModalMessage("پیام شما با موفقیت ارسال شد!");
        setIsModalOpen(true);
      } else {
        setModalMessage("ارسال پیام با خطا مواجه شد.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalMessage("مشکلی پیش آمده، دوباره تلاش کنید.");
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-Bokara-Grey">
      <HeaderNav />
      <ProjectHeading className="py-10" />

      <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-10">
        <h2 className="text-3xl font-medium text-center md:text-4xl text-School-Bus font-custom">
          تماس با ما
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 mt-10">
          {/* full_name */}
          <label className="text-Looking-Glass">نام و نام خانوادگی</label>
          <input
            type="text"
            name="full_name"
            className={`w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus ${
              errors.full_name ? "border-red-500" : ""
            }`}
            value={formData.full_name}
            onChange={handleChange}
          />
          {errors.full_name && (
            <p className="text-sm text-red">{errors.full_name}</p>
          )}

          {/* phone */}
          <label className="text-Looking-Glass">شماره تماس</label>
          <input
            type="text"
            name="phone"
            maxLength="11"
            className={`w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus ${
              errors.phone ? "border-red-500" : ""
            }`}
            value={formData.phone}
            onChange={handlePhoneInput}
          />
          {errors.phone && <p className="text-sm text-red">{errors.phone}</p>}

          {/* company */}
          <label className="text-Looking-Glass">نام شرکت</label>

          <input
            type="text"
            name="company"
            className={`w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus ${
              errors.company ? "border-red-500" : ""
            }`}
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && (
            <p className="text-sm text-red">{errors.company}</p>
          )}

          {/* address */}
          <label className="text-Looking-Glass">آدرس</label>

          <input
            type="text"
            name="address"
            className={`w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus ${
              errors.address ? "border-red-500" : ""
            }`}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-sm text-red">{errors.address}</p>
          )}
          <label className="text-Looking-Glass">توضیحات</label>

          <textarea
            name="description"
            className={`w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus ${
              errors.description ? "border-red-500" : ""
            }`}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <p className="text-sm text-red">{errors.description}</p>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="px-10">
              ارسال
            </Button>
            <Button
              onClick={() => navigate("/")}
              type="button"
              className="px-4 py-2 rounded"
            >
              بازگشت به صفحه اصلی
            </Button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message={modalMessage}
      />
    </div>
  );
}
