import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../ui/Input";
import MapComponent from "../ui/MapComponent";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import ButtonProject from "../ui/ButtonProject";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ProjectAPIPage = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    address: "",
    postal_code: "",
    registered_plate: "",
    case_number: "",
    supervising_engineer: "",
    builder: "",
    employer: "",
    type: "",
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const placeholders = {
    title: "عنوان پروژه",
    description: "توضیحات پروژه",
    start_date: "تاریخ شروع پروژه",
    end_date: "تاریخ پایان پروژه",
    address: "آدرس پروژه",
    postal_code: "کد پستی (۱۰ رقمی)",
    registered_plate: "شماره پلاک ثبت شده شهرداری",
    case_number: "شماره پرونده شهرداری",
    supervising_engineer: "نام مهندس ناظر",
    builder: "نام سازنده",
    employer: "نام کارفرما",
    type: "نوع پروژه",
  };

  const convertPersianToEnglishNumbers = (input) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return input.replace(
      /[۰-۹]/g,
      (match) => englishNumbers[persianNumbers.indexOf(match)]
    );
  };

  const handleChange = (e) => {
    // تبدیل اعداد فارسی به انگلیسی
    const value = convertPersianToEnglishNumbers(e.target.value);
    setValues({ ...values, [e.target.name]: value });
  };

  const handleLocationSelect = ([lat, lng]) => {
    const coords = {
      latitude: parseFloat(lat.toFixed(8)),
      longitude: parseFloat(lng.toFixed(8)),
    };
    console.log("📍 مختصات انتخاب‌شده:", coords);
    setCoordinates(coords);
  };

  const getFormattedDate = (dateObj) => {
    if (!dateObj) return null;

    try {
      const date =
        dateObj instanceof DateObject
          ? dateObj
          : new DateObject({
              date: dateObj,
              calendar: persian,
              locale: persian_fa,
            });

      return date.convert("gregorian").format("YYYY-MM-DD");
    } catch (error) {
      console.error("❌ تبدیل تاریخ شکست خورد:", error);
      return null;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!values.title) newErrors.title = "عنوان پروژه الزامی است";
    if (!values.description) newErrors.description = "توضیحات پروژه الزامی است";
    if (!values.start_date) newErrors.start_date = "تاریخ شروع الزامی است";
    if (!values.end_date) newErrors.end_date = "تاریخ پایان الزامی است";

    // بررسی ترتیب تاریخ‌ها با Unix timestamp
    if (
      values.start_date &&
      values.end_date &&
      new DateObject(values.end_date).toUnix() <
        new DateObject(values.start_date).toUnix()
    ) {
      newErrors.end_date = "تاریخ پایان باید بعد از تاریخ شروع باشد";
    }

    if (!coordinates) newErrors.coordinates = "مختصات جغرافیایی الزامی است";
    if (!values.address) newErrors.address = "آدرس پروژه الزامی است";
    if (!/^\d{10}$/.test(values.postal_code)) {
      newErrors.postal_code = "کد پستی باید ۱۰ رقم باشد";
    }
    if (!values.registered_plate) {
      newErrors.registered_plate = "شماره پلاک ثبت شده الزامی است";
    } else if (!/^\d+$/.test(values.registered_plate)) {
      newErrors.registered_plate = "شماره پلاک باید فقط شامل عدد باشد";
    }

    if (!values.case_number) {
      newErrors.case_number = "شماره پرونده الزامی است";
    } else if (!/^\d+$/.test(values.case_number)) {
      newErrors.case_number = "شماره پرونده باید فقط شامل عدد باشد";
    }

    if (!values.supervising_engineer)
      newErrors.supervising_engineer = "نام مهندس ناظر الزامی است";
    if (!values.builder) newErrors.builder = "نام سازنده الزامی است";
    if (!values.employer) newErrors.employer = "نام کارفرما الزامی است";
    if (!values.type) newErrors.type = "نوع پروژه الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 handleSubmit started");

    const formattedStartDate = getFormattedDate(values.start_date);
    const formattedEndDate = getFormattedDate(values.end_date);

    console.log("🧪 start_date:", values.start_date);
    console.log("📆 formattedStartDate:", formattedStartDate);

    const formValues = {
      ...values,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      ...coordinates,
    };

    if (!validateForm()) {
      setResponseMessage("❌ لطفاً تمام فیلدها را به درستی وارد کنید.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("⛔ خطا: شما احراز هویت نشده‌اید!");
      navigate("/LoginForm");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/projects/",
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ ارسال موفق بود");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 70000);
    } catch (error) {
      console.error("❌ خطا در ارسال:", error);
      const errData = error.response?.data || {};
      const newErrors = {};

      if (errData.data) {
        errData.data.forEach((fieldError) => {
          newErrors[fieldError.field] = fieldError.message;
        });
      }

      if (errData.__non_field_errors) {
        setResponseMessage(errData.__non_field_errors.join(", "));
      }

      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full p-8 border rounded-lg bg-Bokara-Grey border-School-Bus">
        <div className="flex flex-col items-center gap-2 text-3xl text-School-Bus">
          <div className="flex flex-row gap-2">
            <span>امین</span>
            <img className="h-12" src={logo} alt="Logo" />
            <span>بتن</span>
          </div>

          <h2 className="mb-6 text-sm font-semibold text-center md:text-2xl text-School-Bus">
            ثبت پروژه جدید
          </h2>
        </div>

        {responseMessage && !Object.keys(errors).length && (
          <div className="mb-4 text-center text-red-500">{responseMessage}</div>
        )}

        <div className="flex items-center justify-center">
          <div className="w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* فیلدهای متنی به‌جز تاریخ */}
              {Object.keys(values).map((key) => {
                if (key.includes("date")) return null; // تاریخ‌ها رو جدا کنترل می‌کنیم
                return (
                  <div key={key} className="relative">
                    <label className="block mb-1 text-Looking-Glass">
                      {placeholders[key]}
                    </label>
                    <Input
                      type="text"
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="w-full p-2 px-4 py-2 text-white bg-gray-700 border rounded-lg bg-Bokara-Grey border-Looking-Glass placeholder:text-gray-400"
                    />
                    {errors[key] && (
                      <div className="absolute text-sm text-red">
                        {errors[key]}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* تاریخ شروع */}
              {/* فیلدهای تاریخ در کنار هم */}
              <div className="flex  flex-col  md:justify-center  md:flex-row md:items-center  md:gap-6">
                {/* تاریخ شروع */}
                <div className="relative w-full md:w-1/2">
                  <label className="block mb-1 text-Looking-Glass">
                    تاریخ شروع پروژه
                  </label>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={values.start_date}
                    onChange={(date) =>
                      setValues({ ...values, start_date: new DateObject(date) })
                    }
                    inputClass="w-full m-1 z-2 text-center text-sm md:text-base text-white bg-Bokara-Grey  border border-[#FFD700] placeholder-[#aaa] p-2 rounded-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:ring-2 hover:ring-yellow-400 hover:scale-[1.03]"
                    placeholder="روز / ماه / سال"
                  />
                  {errors.start_date && (
                    <div className="absolute text-sm text-red">
                      {errors.start_date}
                    </div>
                  )}
                </div>

                {/* تاریخ پایان */}
                <div className="relative w-full md:w-1/2 mt-4 md:mt-0">
                  <label className="block mb-1 text-Looking-Glass">
                    تاریخ پایان پروژه
                  </label>
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={values.end_date}
                    onChange={(date) =>
                      setValues({ ...values, end_date: new DateObject(date) })
                    }
                    inputClass="relative z-[100]  w-full m-1 text-center text-sm md:text-base text-white bg-Bokara-Grey border border-[#FFD700] placeholder-[#aaa] p-2 rounded-xl shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:ring-2 hover:ring-yellow-400 hover:scale-[1.03]"
                    placeholder="روز / ماه / سال"
                  />
                  {errors.end_date && (
                    <div className="absolute text-sm text-red">
                      {errors.end_date}
                    </div>
                  )}
                </div>
              </div>

              {/* نقشه */}
              <MapComponent
                width="100%"
                height="300px"
                onLocationSelect={handleLocationSelect}
              />
              {errors.coordinates && (
                <div className="text-sm text-red text-center mt-2">
                  {errors.coordinates}
                </div>
              )}

              {/* دکمه ارسال */}
              <div className="flex justify-center">
                <ButtonProject
                  type="submit"
                  className="w-56 py-2 mb-10 font-semibold bg-yellow-500 rounded-xl md:w-72 text-Looking-Glass hover:bg-yellow-400 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ارسال..." : "افزودن پروژه"}
                </ButtonProject>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-10 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-green-600">
              ✅ پروژه با موفقیت ثبت شد!
            </h2>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/ProjectPage");
              }}
              className="px-4 py-2 font-semibold text-white rounded bg-School-Bus"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAPIPage;
