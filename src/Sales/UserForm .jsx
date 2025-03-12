import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../ui/Input";
import Button from "../ui/Button";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { ToastContainer, toast } from "react-toastify";

const UserForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "لطفاً نام خود را وارد کنید";
    if (!lastName) newErrors.lastName = "لطفاً نام خانوادگی خود را وارد کنید";

    if (!nationalCode) {
      newErrors.nationalCode = "لطفاً کد ملی خود را وارد کنید";
    } else if (!/^[0-9]{10}$/.test(nationalCode)) {
      newErrors.nationalCode = "کد ملی باید 10 رقم باشد";
    }

    if (!phone) {
      newErrors.phone = "لطفاً شماره موبایل خود را وارد کنید";
    } else if (!/^09[0-9]{9}$/.test(phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/users/register/",
        {
          first_name: firstName,
          last_name: lastName,
          national_code: nationalCode,
          phone: phone,
        }
      );

      if (response.status === 201) {
        toast.success("اطلاعات با موفقیت ثبت شد!");
        navigate("/");
      }
    } catch (error) {
      toast.error("خطا در ثبت اطلاعات، لطفاً مجدداً تلاش کنید");
    }
  };

  return (
    <div className="flex flex-col justify-center w-full min-h-screen px-4 py-8 bg-Bokara-Grey">
      {/* فرم تمام عرض */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full h-full gap-8 px-6 py-10 text-white bg-Bokara-Grey"
      >
        {/* لوگو */}
        <div className="flex items-center justify-center gap-2 mb-4 text-4xl text-School-Bus">
          <span>امین</span>
          <img className="h-14" src={logo} alt="Company Logo" />
          <span>بتن</span>
        </div>

        {/* فرم اطلاعات */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {/* نام */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-lg font-medium">
              نام
            </label>
            <Input
              id="firstName"
              name="firstName"
              className="p-2 text-right text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="نام"
            />
            {errors.firstName && (
              <div className="text-sm text-red">{errors.firstName}</div>
            )}
          </div>

          {/* نام خانوادگی */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-lg font-medium">
              نام خانوادگی
            </label>
            <Input
              id="lastName"
              name="lastName"
              className="p-2 text-right text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="نام خانوادگی"
            />
            {errors.lastName && (
              <div className="text-sm text-red">{errors.lastName}</div>
            )}
          </div>

          {/* کد ملی */}
          <div className="flex flex-col gap-1">
            <label htmlFor="nationalCode" className="text-lg font-medium">
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
              <div className="text-sm text-red">{errors.nationalCode}</div>
            )}
          </div>

          {/* شماره همراه */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-lg font-medium">
              شماره همراه
            </label>
            <Input
              id="phone"
              name="phone"
              className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="شماره همراه"
              dir="ltr"
            />
            {errors.phone && (
              <div className="text-sm text-red">{errors.phone}</div>
            )}
          </div>
        </div>

        {/* هشدار */}
        <div className="flex items-center p-4 mt-6 text-sm text-white bg-black rounded-md w-[600px]">
          <span className="ml-2">⚠️</span>
          <span>
            همکاران ما در واحد فروش پس از بررسی اطلاعات شما در سریع‌ترین زمان
            ممکن با شما تماس خواهند گرفت.
          </span>
        </div>

        {/* دکمه ثبت */}
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full py-3 font-semibold text-gray-900 transition-all duration-300 bg-yellow-500 rounded sm:w-1/2 hover:bg-yellow-400"
          >
            ثبت اطلاعات
          </Button>
        </div>

        <ToastContainer />
      </form>
    </div>
  );
};

export default UserForm;
