import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استفاده از useNavigate
import axios from "axios"; // اضافه کردن axios برای ارسال درخواست
import Input from "../ui/Input";
import Button from "../ui/Button";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { ToastContainer, toast } from "react-toastify";

const UserForm = () => {
  const navigate = useNavigate(); // استفاده از useNavigate برای ریدایرکت کردن کاربر

  const [fullName, setFullName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [phone, setPhone] = useState(""); // تغییر نام به "phone"

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!fullName)
      newErrors.fullName = "لطفاً نام و نام خانوادگی خود را وارد کنید";

    if (!nationalCode) {
      newErrors.nationalCode = "لطفاً کد ملی خود را وارد کنید";
    } else if (!/^[0-9]{10}$/.test(nationalCode)) {
      newErrors.nationalCode = "کد ملی باید 10 رقم باشد";
    }

    if (!phone) {
      newErrors.phone = "لطفاً شماره موبایل خود را وارد کنید"; // تغییر نام به "phone"
    } else if (!/^09[0-9]{9}$/.test(phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست"; // تغییر نام به "phone"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // تقسیم کردن fullName به first_name و last_name
    const [firstName, lastName] = fullName.split(" ");

    try {
      // ارسال درخواست به API برای ثبت اطلاعات کاربر
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/users/register/", // آدرس API
        {
          first_name: firstName,
          last_name: lastName || "", // اگر lastName خالی بود، یک رشته خالی بفرست
          national_code: nationalCode,
          phone: phone, // استفاده از "phone" به جای "phoneNumber"
        }
      );

      // بررسی وضعیت موفقیت‌آمیز بودن درخواست
      if (response.status === 201) {
        toast.success("اطلاعات با موفقیت ثبت شد!");
        navigate("/"); // ریدایرکت به صفحه اصلی پس از ثبت موفقیت‌آمیز
      }
    } catch (error) {
      // در صورت بروز خطا
      toast.error("خطا در ثبت اطلاعات، لطفاً مجدداً تلاش کنید");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen border-2 bg-Bokara-Grey border-School-Bus">
      <div className="container flex gap-10 px-4 text-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full gap-10"
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
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              placeholder="نام و نام خانوادگی"
            />
            {errors.fullName && (
              <div className="text-red">{errors.fullName}</div>
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
              onChange={(e) => setNationalCode(e.target.value)}
              value={nationalCode}
              placeholder="کد ملی"
            />
            {errors.nationalCode && (
              <div className="text-red">{errors.nationalCode}</div>
            )}

            <label htmlFor="phone" className="self-start text-lg font-medium">
              شماره همراه
            </label>
            <Input
              id="phone"
              name="phone"
              className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
              onChange={(e) => setPhone(e.target.value)} // تغییر نام به "phone"
              value={phone} // تغییر نام به "phone"
              placeholder="شماره همراه"
              dir="ltr"
            />
            {errors.phone && (
              <div className="text-red">{errors.phone}</div> // تغییر نام به "phone"
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
