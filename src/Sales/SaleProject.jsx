import ButtonProject from "../ui/ButtonProject";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomCalendar from "../ui/Calender";
import Input from "../ui/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// پیام‌های خطا به فارسی
const errorMessages = {
  required: "پر کردن این فیلد الزامی است.",
  minZero: "مقدار باید صفر یا بیشتر باشد.",
  invalidDate: "فرمت تاریخ نامعتبر است.",
};

function SaleProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [shift, setShift] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [concreteTypes, setConcreteTypes] = useState([]);
  const [concretePouringTypes, setConcretePouringTypes] = useState([]);

  const [newOrder, setNewOrder] = useState({
    project: id || "",
    concrete_type: "",
    concrete_pouring_type: "",
    concrete_area_size: "",
    delivery_datetime: "",
    shift: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("⛔ شما احراز هویت نشده‌اید! لطفاً وارد شوید.");
        navigate("/LoginForm");
        return;
      }

      try {
        const [typesRes, pouringRes] = await Promise.all([
          axios.get(
            "https://amin-beton-back.chbk.app/api/sales/concrete-list/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            "https://amin-beton-back.chbk.app/api/sales/concrete-pouring-type-list/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        setConcreteTypes(typesRes.data);
        setConcretePouringTypes(pouringRes.data);
      } catch (err) {
        toast.error("❌ خطا در دریافت داده‌ها!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (selectedDay) {
      const formattedDate = `${selectedDay.year}-${String(
        selectedDay.month
      ).padStart(2, "0")}-${String(selectedDay.day).padStart(2, "0")}T00:00`;
      setNewOrder((prev) => ({ ...prev, delivery_datetime: formattedDate }));
    }
  }, [selectedDay]);

  // اعتبارسنجی مقادیر ورودی
  const validateField = (field, value) => {
    let error = "";

    if (!value) {
      error = errorMessages.required;
    } else if (field === "concrete_area_size" && (isNaN(value) || value < 0)) {
      error = errorMessages.minZero;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));

    return error === "";
  };

  // تابع مدیریت تغییر مقادیر فیلدها و بررسی آن‌ها
  const handleChange = (field, value) => {
    setNewOrder((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    Object.keys(newOrder).forEach((field) => {
      if (!validateField(field, newOrder[field])) {
        formValid = false;
      }
    });

    if (!formValid) {
      toast.error("⚠ لطفاً خطاهای فرم را برطرف کنید.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("⛔ شما احراز هویت نشده‌اید! لطفاً وارد شوید.");
      navigate("/LoginForm");
      return;
    }

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/",
        { ...newOrder, shift },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ سفارش با موفقیت ثبت شد!");
      navigate(`/SecondSalePage/${response.data.id}`); // هدایت به صفحه SecondSalePage با استفاده از id سفارش
    } catch (error) {
      toast.error("❌ مشکلی پیش آمده است!");
    }
  };

  if (loading) {
    return (
      <div className="py-5 text-center text-white">در حال بارگذاری...</div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 bg-Bokara-Grey">
      <h2 className="pt-10 mb-8 text-xl text-center text-white md:text-2xl">
        خرید برای پروژه شماره: {id}
      </h2>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* نوع بتن */}
        <div>
          <label className="block text-white">نوع بتن</label>
          <select
            value={newOrder.concrete_type}
            onChange={(e) => handleChange("concrete_type", e.target.value)}
            className="w-full p-2 pl-4 text-white border bg-Bokara-Grey"
          >
            <option value="">انتخاب نوع بتن</option>
            {concreteTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.id}
              </option>
            ))}
          </select>
          {errors.concrete_type && (
            <p className="text-red">{errors.concrete_type}</p>
          )}
        </div>

        {/* مقطع بتن‌ریزی */}
        <div>
          <label className="block text-white">مقطع بتن ریزی</label>
          <select
            value={newOrder.concrete_pouring_type}
            onChange={(e) =>
              handleChange("concrete_pouring_type", e.target.value)
            }
            className="w-full p-2 pl-4 text-white border bg-Bokara-Grey"
          >
            <option value="">انتخاب مقطع بتن ریزی</option>
            {concretePouringTypes.map((pouring) => (
              <option key={pouring.id} value={pouring.id}>
                {pouring.id}
              </option>
            ))}
          </select>
          {errors.concrete_pouring_type && (
            <p className="text-red">{errors.concrete_pouring_type}</p>
          )}
        </div>

        {/* متراژ بتن */}
        <div>
          <label className="block text-white">متراژ بتن</label>
          <Input
            type="number"
            value={newOrder.concrete_area_size}
            onChange={(e) => handleChange("concrete_area_size", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.concrete_area_size && (
            <p className="text-red">{errors.concrete_area_size}</p>
          )}
        </div>

        {/* تاریخ تحویل */}
        <div className="flex items-center justify-center w-full mt-4">
          <CustomCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            shift={shift}
            setShift={setShift}
          />
        </div>

        {/* دکمه ارسال */}
        <div className="flex items-center justify-center">
          <ButtonProject
            type="submit"
            className="w-full py-2 mt-8 md:w-2/3 md:px-40"
          >
            ادامه
          </ButtonProject>
        </div>
      </form>
    </div>
  );
}

export default SaleProject;
