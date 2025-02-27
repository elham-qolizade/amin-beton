import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // اضافه کردن axios برای ارسال درخواست
import Input from "../ui/Input";
import Button from "../ui/Button";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { ToastContainer, toast } from "react-toastify";

const UserForm = () => {
  const navigate = useNavigate();

  // مدیریت وضعیت فیلدها با استفاده از useState
  const [fullName, setFullName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({});

  // تابع اعتبارسنجی برای فیلدها
  const validate = () => {
    const newErrors = {};

    // اعتبارسنجی نام و نام خانوادگی
    if (!fullName)
      newErrors.fullName = "لطفاً نام و نام خانوادگی خود را وارد کنید";

    // اعتبارسنجی کد ملی
    if (!nationalCode) {
      newErrors.nationalCode = "لطفاً کد ملی خود را وارد کنید";
    } else if (!/^[0-9]{10}$/.test(nationalCode)) {
      newErrors.nationalCode = "کد ملی باید 10 رقم باشد";
    }

    // اعتبارسنجی شماره موبایل
    if (!phoneNumber) {
      newErrors.phoneNumber = "لطفاً شماره موبایل خود را وارد کنید";
    } else if (!/^09[0-9]{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "شماره موبایل معتبر نیست";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // اگر خطایی نباشد، فرم معتبر است
  };

  // تابع ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // اگر فرم معتبر نبود، ارسال نشود

    try {
      // ارسال درخواست به سرور
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/users/register/",
        {
          full_name: fullName,
          national_code: nationalCode,
          phone_number: phoneNumber,
        }
      );

      toast.success("اطلاعات با موفقیت ثبت شد!");
      // پس از ثبت اطلاعات موفق، کاربر را به صفحه اصلی هدایت کنید
      navigate("/");
    } catch (error) {
      toast.error("خطا در ثبت اطلاعات، لطفاً مجدداً تلاش کنید");
    }
  };

  return (
    <div className="border-2 h-screen flex items-center justify-center bg-Bokara-Grey border-School-Bus">
      <div className="gap-10 container px-4 flex text-white">
        <form
          onSubmit={handleSubmit}
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
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder="شماره همراه"
              dir="ltr"
            />
            {errors.phoneNumber && (
              <div className="text-red">{errors.phoneNumber}</div>
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
