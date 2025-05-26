import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import jalaali from "jalaali-js";
import ButtonProject from "../ui/ButtonProject";
import CustomCalendar from "../ui/Calender";
import Input from "../ui/Input";
import ManualDigitalClock from "./Time";
import "react-toastify/dist/ReactToastify.css";

function SaleProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [concreteTypes, setConcreteTypes] = useState([]);
  const [concretePouringTypes, setConcretePouringTypes] = useState([]);
  const [resistanceClasses, setResistanceClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [newOrder, setNewOrder] = useState({
    project: id || "",
    concrete_type: "",
    concrete_pouring_type: "",
    concrete_area_size: "",
    delivery_datetime: "",
    concrete_resistance_class: "",
    max_pipeline_length: "",
    pouring_height: "",
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
        const [typesRes, pouringRes, resistanceRes] = await Promise.all([
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
          axios.get(
            "https://amin-beton-back.chbk.app/api/sales/concrete-resistance-class-list/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        setConcreteTypes(typesRes.data);
        setConcretePouringTypes(pouringRes.data);
        setResistanceClasses(resistanceRes.data);
      } catch (err) {
        toast.error("❌ خطا در دریافت داده‌ها!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchProjectTitle = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("⛔ شما احراز هویت نشده‌اید! لطفاً وارد شوید.");
        navigate("/LoginForm");
        return;
      }

      try {
        const response = await axios.get(
          `https://amin-beton-back.chbk.app/api/projects/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjectTitle(response.data.title);
      } catch (error) {
        console.error("خطا در دریافت عنوان پروژه:", error);
        toast.error("❌ خطا در دریافت اطلاعات پروژه!");
      }
    };

    fetchProjectTitle();
  }, [id, navigate]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const convertToEnglishDigits = (input) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return input
      .split("")
      .map((char) => {
        const index = persianDigits.indexOf(char);
        return index !== -1 ? englishDigits[index] : char;
      })
      .join("");
  };

  const handleChange = (field, value) => {
    const convertedValue = convertToEnglishDigits(value);
    setNewOrder({
      ...newOrder,
      [field]: convertedValue,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newOrder.concrete_type)
      newErrors.concrete_type = "نوع بتن را انتخاب کنید.";
    if (!newOrder.concrete_pouring_type)
      newErrors.concrete_pouring_type = "مقطع بتن‌ریزی را انتخاب کنید.";
    if (!newOrder.concrete_resistance_class)
      newErrors.concrete_resistance_class = "رده مقاومت بتن را انتخاب کنید.";
    if (!newOrder.concrete_area_size)
      newErrors.concrete_area_size = "متراژ بتن را وارد کنید.";
    if (!newOrder.max_pipeline_length)
      newErrors.max_pipeline_length = "حداکثر متراژ لوله‌کشی را وارد کنید.";
    if (!newOrder.pouring_height)
      newErrors.pouring_height = "ارتفاع بتن‌ریزی را وارد کنید.";
    if (!newOrder.delivery_datetime)
      newErrors.delivery_datetime = "تاریخ و زمان تحویل را وارد کنید.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("⚠ لطفاً خطاهای فرم را برطرف کنید.");
      return;
    }

    const currentDateTime = new Date();
    const selectedDateTime = new Date(newOrder.delivery_datetime);

    if (selectedDateTime <= currentDateTime) {
      toast.error("❌ تاریخ و زمان انتخابی نمی‌تواند از زمان حال گذشته باشد.");
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
        { ...newOrder },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/PumpPage/${response.data.id}?reload=true`);
    } catch (error) {
      console.error("خطای سرور:", error);
      toast.error("❌ خطا در ثبت سفارش!");
    }
  };

  useEffect(() => {
    if (!selectedDay || !selectedTime) return;

    const { gy, gm, gd } = jalaali.toGregorian(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day
    );

    const selectedDate = new Date(gy, gm - 1, gd);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setErrorMessage("❌ تاریخ انتخابی نمی‌تواند از امروز گذشته باشد.");
      setIsModalOpen(true);
      setNewOrder((prev) => ({ ...prev, delivery_datetime: "" }));
      return;
    }

    const [hour, minute] = selectedTime.split(":").map(Number);
    const selectedDateTime = new Date(gy, gm - 1, gd, hour, minute);
    const now = new Date();

    if (
      selectedDate.getTime() === today.getTime() &&
      (hour < now.getHours() ||
        (hour === now.getHours() && minute <= now.getMinutes()))
    ) {
      setErrorMessage("❌ ساعت انتخابی نمی‌تواند کمتر از زمان فعلی باشد.");
      setIsModalOpen(true);
      setNewOrder((prev) => ({ ...prev, delivery_datetime: "" }));
      return;
    }

    setErrorMessage("");
    setIsModalOpen(false);
    setNewOrder((prev) => ({
      ...prev,
      delivery_datetime: selectedDateTime.toISOString(),
    }));
  }, [selectedDay, selectedTime]);

  if (loading) {
    return (
      <div className="py-5 text-center text-white">در حال بارگذاری...</div>
    );
  }
  return (
    <div className="min-h-screen p-8 bg-gray-100 bg-Bokara-Grey">
      <h2 className="pt-10 mb-4 text-xl text-center text-white md:text-2xl">
        خرید برای
        <p>{projectTitle || "در حال دریافت عنوان پروژه..."}</p>
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
                {type.title}
              </option>
            ))}
          </select>
          {errors.concrete_type && (
            <p className="text-red">{errors.concrete_type}</p>
          )}
        </div>
        {/* مقطع بتن‌ریزی */}
        <div>
          <label className="block text-white">مقطع بتن‌ریزی</label>
          <select
            value={newOrder.concrete_pouring_type}
            onChange={(e) =>
              handleChange("concrete_pouring_type", e.target.value)
            }
            className="w-full p-2 pl-4 text-white border bg-Bokara-Grey"
          >
            <option value="">انتخاب مقطع بتن‌ریزی</option>
            {concretePouringTypes.map((pouring) => (
              <option key={pouring.id} value={pouring.id}>
                {pouring.title}
              </option>
            ))}
          </select>
          {errors.concrete_pouring_type && (
            <p className="text-red">{errors.concrete_pouring_type}</p>
          )}
        </div>
        {/* رده مقاومت بتن */}
        {/* رده مقاومت بتن */}
        <div>
          <label className="block text-white">رده مقاومت بتن</label>
          <select
            value={newOrder.concrete_resistance_class}
            onChange={(e) =>
              handleChange("concrete_resistance_class", e.target.value)
            }
            className="w-full p-2 pl-4 text-white border bg-Bokara-Grey"
          >
            <option value="">انتخاب کلاس مقاومت بتن</option>
            {resistanceClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.title}
              </option>
            ))}
          </select>
          {errors.concrete_resistance_class && (
            <p className="text-red">{errors.concrete_resistance_class}</p>
          )}
        </div>
        {/* متراژ بتن */}
        <div>
          <label className="block mb-1 text-white">متراژ بتن (مترمکعب)</label>
          <Input
            type="number"
            name="concrete_area_size"
            value={newOrder.concrete_area_size}
            onChange={(e) => handleChange("concrete_area_size", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.concrete_area_size && (
            <p className="mt-1 text-sm text-red">{errors.concrete_area_size}</p>
          )}
        </div>
        {/* حداکثر طول لوله کشی */}
        <div>
          <label className="block mb-1 text-white">
            حداکثر متراژ لوله‌کشی (متر)
          </label>
          <Input
            type="number"
            value={newOrder.max_pipeline_length}
            onChange={(e) =>
              handleChange("max_pipeline_length", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.max_pipeline_length && (
            <p className="mt-1 text-sm text-red">
              {errors.max_pipeline_length}
            </p>
          )}
        </div>
        {/* ارتفاع بتن‌ریزی */}
        <div>
          <label className="block mb-1 text-white">
            ارتفاع بتن‌ریزی از محل پمپ (متر)
          </label>
          <Input
            type="number"
            value={newOrder.pouring_height}
            onChange={(e) => handleChange("pouring_height", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.pouring_height && (
            <p className="mt-1 text-sm text-red">{errors.pouring_height}</p>
          )}
        </div>
        {/* تقویم و انتخاب ساعت */}

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse">
          {/* بخش تاریخ */}
          <div className="flex flex-col items-center">
            <CustomCalendar
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </div>

          <ManualDigitalClock
            value={selectedTime}
            onChange={(newValue) => {
              setSelectedTime(newValue);
              // اگر لازم داری setTime رو هم اینجا صدا بزنی
            }}
          />
        </div>
        {/* انتخاب تاریخ */}

        {/* <input
          type="time"
          value={selectedTime}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="p-2 border rounded"
        /> */}

        {/* مودال انتخاب ساعت */}

        {/* نمایش ارور کلی */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative z-50 p-6 rounded-lg bg-red">
              <h2 className="text-white">{errorMessage}</h2>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 mt-4 text-white rounded bg-School-Bus"
              >
                بستن
              </button>
            </div>
          </div>
        )}
        {/* دکمه ادامه */}
        <div className="flex items-center justify-center w-full ">
          <ButtonProject
            type="submit"
            className="w-full py-2 mt-8 md:ml-[15vh] md:px-40"
          >
            ادامه
          </ButtonProject>
        </div>
      </form>
    </div>
  );
}

export default SaleProject;
