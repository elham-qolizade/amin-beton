import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../ui/Input";
import Button from "../ui/Button";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
// import Modal from "../pages/Modal";

const UserForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    // نام فقط باید حروف فارسی باشد
    if (!firstName.trim()) {
      newErrors.firstName = "لطفاً نام خود را وارد کنید";
    } else if (!/^[\u0600-\u06FF\s]+$/.test(firstName)) {
      newErrors.firstName = "نام باید فقط شامل حروف فارسی باشد";
    }

    // نام خانوادگی فقط باید حروف فارسی باشد
    if (!lastName.trim()) {
      newErrors.lastName = "لطفاً نام خانوادگی خود را وارد کنید";
    } else if (!/^[\u0600-\u06FF\s]+$/.test(lastName)) {
      newErrors.lastName = "نام خانوادگی باید فقط شامل حروف فارسی باشد";
    }

    // کد ملی باید 10 رقم باشد
    if (!nationalCode.trim()) {
      newErrors.nationalCode = "لطفاً کد ملی خود را وارد کنید";
    } else if (!/^\d{10}$/.test(nationalCode)) {
      newErrors.nationalCode = "کد ملی باید دقیقاً ۱۰ رقم باشد";
    }

    // شماره موبایل باید با 09 شروع شده و 11 رقم باشد
    if (!phone.trim()) {
      newErrors.phone = "لطفاً شماره موبایل خود را وارد کنید";
    } else if (!/^09\d{9}$/.test(phone)) {
      newErrors.phone = "شماره موبایل باید با 09 شروع شده و ۱۱ رقم باشد";
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
        setModalMessage("اطلاعات با موفقیت ثبت شد!");
        setShowModal(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const serverErrors = error.response.data;
        const formattedErrors = {};

        if (serverErrors.first_name) {
          formattedErrors.firstName = serverErrors.first_name.join(" ");
        }
        if (serverErrors.last_name) {
          formattedErrors.lastName = serverErrors.last_name.join(" ");
        }
        if (serverErrors.national_code) {
          formattedErrors.nationalCode = serverErrors.national_code.join(" ");
        }
        if (serverErrors.phone) {
          formattedErrors.phone = serverErrors.phone.join(" ");
        }

        setErrors(formattedErrors);
        setModalMessage(
          "مشکلی در ارتباط با سرور پیش آمده است، لطفاً مجدداً تلاش کنید."
        );
        setShowModal(true);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center w-full min-h-screen px-4 py-8 bg-Bokara-Grey">
      <div className="flex items-center justify-center gap-2 mb-4 text-4xl text-School-Bus">
        <span>امین</span>
        <img className="h-14" src={logo} alt="Company Logo" />
        <span>بتن</span>
      </div>

      {/* نمایش لیست کلی خطاها */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 mb-4 bg-red-100 border rounded-md text-red border-red">
          <h3 className="mb-2 text-lg font-semibold">
            لطفاً خطاهای زیر را برطرف کنید:
          </h3>
          <ul className="list-disc list-inside">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full h-full gap-8 px-6 py-10 text-white bg-Bokara-Grey"
      >
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {/* نام */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-lg font-medium">
              نام
            </label>
            <Input
              id="firstName"
              className="p-2 text-right text-white bg-gray-700 border rounded placeholder:text-right focus:border-yellow-400"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="نام"
            />
            {errors.firstName && (
              <span className="text-sm text-red">{errors.firstName}</span>
            )}
          </div>

          {/* نام خانوادگی */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-lg font-medium">
              نام خانوادگی
            </label>
            <Input
              id="lastName"
              className="p-2 text-right text-white bg-gray-700 border rounded placeholder:text-right focus:border-yellow-400"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="نام خانوادگی"
            />
            {errors.lastName && (
              <span className="text-sm text-red">{errors.lastName}</span>
            )}
          </div>

          {/* کد ملی */}
          <div className="flex flex-col gap-1">
            <label htmlFor="nationalCode" className="text-lg font-medium">
              کد ملی
            </label>
            <Input
              id="nationalCode"
              className="p-2 text-right text-white bg-gray-700 border rounded placeholder:text-right focus:border-yellow-400"
              onChange={(e) => setNationalCode(e.target.value)}
              value={nationalCode}
              placeholder="کد ملی"
            />
            {errors.nationalCode && (
              <span className="text-sm text-red">{errors.nationalCode}</span>
            )}
          </div>

          {/* شماره همراه */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-lg font-medium">
              شماره همراه
            </label>
            <Input
              id="phone"
              className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right focus:border-yellow-400"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="شماره همراه"
              dir="ltr"
            />
            {errors.phone && (
              <span className="text-sm text-red">{errors.phone}</span>
            )}
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-red rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
              <h2 className="mb-4 text-xl font-semibold text-green-700">
                موفقیت‌آمیز
              </h2>
              <p className="mb-6 text-gray-800">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                بستن
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full py-3 font-semibold text-gray-900 bg-yellow-500 rounded sm:w-1/4 hover:bg-yellow-400"
          >
            ثبت اطلاعات
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
