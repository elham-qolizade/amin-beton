import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../ui/Input";
import MapComponent from "../ui/MapComponent";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import ButtonProject from "../ui/ButtonProject";

const ProjectAPIPage = () => {
  const [values, setValues] = useState({
    user: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    latitude: "",
    longitude: "",
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
  const navigate = useNavigate();

  const placeholders = {
    user: "نام کاربر",
    title: "عنوان پروژه",
    description: "توضیحات پروژه",
    start_date: "تاریخ شروع (YYYY-MM-DD)",
    end_date: "تاریخ پایان (YYYY-MM-DD)",
    latitude: "عرض جغرافیایی (از روی نقشه انتخاب کنید)",
    longitude: "طول جغرافیایی (از روی نقشه انتخاب کنید)",
    address: "آدرس پروژه",
    postal_code: "کد پستی (۱۰ رقمی)",
    registered_plate: "شماره پلاک ثبت شده",
    case_number: "شماره پرونده",
    supervising_engineer: "نام مهندس ناظر",
    builder: "نام سازنده",
    employer: "نام کارفرما",
    type: "نوع پروژه",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = ([lat, lng]) => {
    setValues({
      ...values,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  // تابع برای اعتبارسنجی فرم
  const validateForm = () => {
    const newErrors = {};

    if (!values.user) newErrors.user = "نام کاربر الزامی است";
    if (!values.title) newErrors.title = "عنوان پروژه الزامی است";
    if (!values.description) newErrors.description = "توضیحات پروژه الزامی است";
    if (!values.start_date) newErrors.start_date = "تاریخ شروع الزامی است";
    if (!values.end_date) newErrors.end_date = "تاریخ پایان الزامی است";
    if (!values.latitude || !values.longitude) {
      newErrors.coordinates = "مختصات جغرافیایی الزامی است";
    }
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
    return Object.keys(newErrors).length === 0; // اگر هیچ خطایی نبود، فرم معتبر است
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی فرم
    if (!validateForm()) {
      setResponseMessage("❌ لطفاً تمام فیلدها را به درستی وارد کنید.");
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("⛔ خطا: شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
      navigate("/LoginForm");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(
        "https://amin-beton-back.chbk.app/api/projects/",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage("✅ پروژه با موفقیت ثبت شد!");

      setTimeout(() => {
        navigate("/ProjectPage");
      }, 1500);
    } catch (error) {
      console.error("❌ خطا در ارسال اطلاعات:", error);
      setResponseMessage("❌ مشکلی در ارسال اطلاعات پیش آمد.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="flex items-center justify-center">
          <div className="w-1/2">
            <form onSubmit={handleSubmit} className="justify-center space-y-4">
              {Object.keys(values).map((key) => (
                <div key={key} className="relative">
                  <Input
                    type={key.includes("date") ? "date" : "text"}
                    name={key}
                    placeholder={placeholders[key]}
                    value={values[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-white bg-gray-700 border rounded border-Looking-Glass"
                    disabled={key === "latitude" || key === "longitude"} // غیرقابل تغییر بودن فیلدهای مختصات
                  />
                  {errors[key] && (
                    <div className="absolute text-sm text-red">
                      {errors[key]}
                    </div>
                  )}
                </div>
              ))}
              {errors.coordinates && (
                <div className="text-sm text-red-500">{errors.coordinates}</div>
              )}
              <div className="flex items-center justify-center w-full mt-4">
                <MapComponent
                  width="100%"
                  height="300px"
                  initialCoords={{
                    lat: values.latitude || 35.6892, // مقدار پیش‌فرض (مثلا تهران)
                    lng: values.longitude || 51.389,
                  }}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
              <div className="flex items-center justify-center">
                <ButtonProject
                  type="submit"
                  className="w-56 py-2 mb-10 font-semibold bg-yellow-500 rounded md:w-72 text-Looking-Glass"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ارسال..." : "افزودن پروژه"}
                </ButtonProject>
              </div>
            </form>

            {responseMessage && (
              <p className="mt-4 text-center text-yellow-400">
                {responseMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAPIPage;
