// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../ui/Input";
import MapComponent from "../ui/MapComponent";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import ButtonProject from "../ui/ButtonProject";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // برای استایل‌ها
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React, { useState, useEffect } from "react";
import DateObject from "react-date-object"; // اضافه کن بالا اگر نیست

const ProjectAPIPage = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    start_date: null, // تغییر از string به null
    end_date: null, // تغییر از string به null
    address: "",
    postal_code: "",
    registered_plate: "",
    case_number: "",
    supervising_engineer: "",
    builder: "",
    employer: "",
    type: "",
  });

  const getFormattedDate = (dateObj) => {
    if (dateObj instanceof DateObject) {
      return dateObj.toGregorian().format("YYYY-MM-DD");
    }
    return null;
  };

  const formattedStartDate = getFormattedDate(values.start_date);
  const formattedEndDate = getFormattedDate(values.end_date);
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = ([lat, lng]) => {
    const coords = {
      latitude: parseFloat(lat.toFixed(8)),
      longitude: parseFloat(lng.toFixed(8)),
    };
    console.log("📍 مختصات انتخاب‌شده از نقشه:", coords);
    setCoordinates(coords);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.title) newErrors.title = "عنوان پروژه الزامی است";
    if (!values.description) newErrors.description = "توضیحات پروژه الزامی است";
    if (!values.start_date) newErrors.start_date = "تاریخ شروع الزامی است";
    if (!values.end_date) newErrors.end_date = "تاریخ پایان الزامی است";
    if (
      values.end_date &&
      new Date(values.end_date) < new Date(values.start_date)
    ) {
      newErrors.end_date = "تاریخ پایان باید بعد از تاریخ شروع باشد";
    }
    if (!coordinates) newErrors.coordinates = "مختصات جغرافیایی الزامی است";
    if (!values.address) newErrors.address = "آدرس پروژه الزامی است";
    if (!/^\d{10}$/.test(values.postal_code)) {
      newErrors.postal_code = "کد پستی باید ۱۰ رقم باشد";
    }
    if (!values.registered_plate)
      newErrors.registered_plate = "شماره پلاک ثبت شده الزامی است";
    if (!values.case_number) newErrors.case_number = "شماره پرونده الزامی است";
    if (!values.supervising_engineer)
      newErrors.supervising_engineer = "نام مهندس ناظر الزامی است";
    if (!values.builder) newErrors.builder = "نام سازنده الزامی است";
    if (!values.employer) newErrors.employer = "نام کارفرما الزامی است";
    if (!values.type) newErrors.type = "نوع پروژه الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit function triggered");
    e.preventDefault();

    // تبدیل تاریخ‌ها به شیء Date اگر از نوع دیگری باشند
    // تبدیل تاریخ شمسی به میلادی با فرمت YYYY-MM-DD
    const formattedStartDate =
      values.start_date &&
      typeof values.start_date === "object" &&
      values.start_date.toGregorian
        ? values.start_date.toGregorian().format("YYYY-MM-DD")
        : values.start_date;

    const formattedEndDate =
      values.end_date &&
      typeof values.end_date === "object" &&
      values.end_date.toGregorian
        ? values.end_date.toGregorian().format("YYYY-MM-DD")
        : values.end_date;

    const formValues = {
      ...values,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      ...coordinates,
    };

    const formIsValid = validateForm();
    console.log("Is form valid:", formIsValid);

    if (!formIsValid) {
      setResponseMessage("❌ لطفاً تمام فیلدها را به درستی وارد کنید.");
      return;
    }
    console.log("🚀 handleSubmit called");
    setIsSubmitting(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("⛔ خطا: شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
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
        navigate("/ProjectPage");
      }, 2000);
    } catch (error) {
      console.error("❌ خطا در ارسال اطلاعات:", error);
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

  useEffect(() => {
    console.log("showModal:", showModal);
  }, [showModal]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full p-8 border rounded-lg bg-Bokara-Grey border-School-Bus">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row items-center gap-2 text-3xl text-School-Bus">
            <span className="">امین</span>
            <img className="h-12" src={logo} alt="Company Logo" />
            <span className="">بتن</span>
          </div>
          <h2 className="mb-6 text-sm font-semibold text-center md:text-2xl text-School-Bus">
            ثبت پروژه جدید
          </h2>
        </div>

        {/* Display Non-Field Errors */}
        {responseMessage && !Object.keys(errors).length && (
          <div className="mb-4 text-center text-red-500">{responseMessage}</div>
        )}

        <div className="flex items-center justify-center">
          <div className="w-1/2">
            <form onSubmit={handleSubmit} className="justify-center space-y-4">
              {Object.keys(values).map((key) => (
                <div key={key} className="relative">
                  <label className="block mb-1 text-Looking-Glass">
                    {placeholders[key]}
                  </label>

                  {/* If the field is a date, use the DatePicker */}
                  {key.includes("date") ? (
                    <div className="relative w-full p-1 px-4 py-2 pl-4 text-black bg-gray-700 border rounded ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus border-Looking-Glass">
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={values[key]}
                        onChange={(date) =>
                          setValues({ ...values, [key]: date })
                        }
                        inputClass="bg-Looking-Glass  w-[110px]  text-center text-white p-1 rounded w-full"
                        placeholder=" روز/ماه/سال"
                      />

                      {/* <FaCalendarAlt className="absolute text-yellow-500 transform -translate-y-1/2 right-3 top-1/2" /> */}
                    </div>
                  ) : (
                    <Input
                      type="text"
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="w-full p-1 px-4 py-2 pl-4 text-white bg-gray-700 border rounded ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus border-Looking-Glass"
                    />
                  )}

                  {errors[key] && (
                    <div className="absolute text-sm text-red">
                      {errors[key]}
                    </div>
                  )}
                </div>
              ))}
              <MapComponent
                width="100%"
                height="300px"
                onLocationSelect={handleLocationSelect}
              />
              <div className="flex justify-center">
                <ButtonProject
                  type="submit"
                  className="w-56 py-2 mb-10 font-semibold bg-yellow-500 rounded md:w-72 text-Looking-Glass"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ارسال..." : "افزودن پروژه"}
                </ButtonProject>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for success message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-green-600">
              ✅ پروژه با موفقیت ثبت شد!
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 font-semibold text-white bg-green-500 rounded"
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
