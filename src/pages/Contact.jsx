import React, { useState } from "react";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import Button from "../ui/Button";
import Modal from "./Modal"; // مسیر رو اصلاح کن اگه جای دیگه‌ایه
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    navigate("/"); // بعد از بستن مودال میره صفحه اصلی (اختیاری)
  };

  return (
    <div className="min-h-screen bg-Bokara-Grey">
      <HeaderNav />
      <ProjectHeading className="py-3" />

      <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-10">
        <h2 className="text-3xl font-medium text-center md:text-4xl text-School-Bus font-custom">
          تماس با ما
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 mt-10">
          {/* بقیه‌ی اینپوت‌ها */}
          <input
            type="text"
            id="fullName"
            name="full_name"
            placeholder="نام و نام خانوادگی"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
            value={formData.full_name}
            onChange={handleChange}
          />
          <input
            type="text"
            id="phoneNumber"
            name="phone"
            placeholder="شماره تماس"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            id="companyName"
            name="company"
            placeholder="نام شرکت"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
            value={formData.company}
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            name="address"
            placeholder="آدرس"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
            value={formData.address}
            onChange={handleChange}
          />
          <textarea
            id="description"
            name="description"
            placeholder="توضیحات"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
            value={formData.description}
            onChange={handleChange}
          ></textarea>

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
