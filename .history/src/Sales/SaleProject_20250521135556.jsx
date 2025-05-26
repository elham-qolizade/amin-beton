import ButtonProject from "../ui/ButtonProject";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomCalendar from "../ui/Calender";
import Input from "../ui/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jalaali from "jalaali-js";
import Time from "./Time";
function SaleProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [shift, setShift] = useState(1);
  const [selectedTime, setSelectedTime] = useState("08:00");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [concreteTypes, setConcreteTypes] = useState([]);
  const [concretePouringTypes, setConcretePouringTypes] = useState([]);
  const [resistanceClasses, setResistanceClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // برای کنترل باز و بسته شدن مودال
  const [errorMessage, setErrorMessage] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [newOrder, setNewOrder] = useState({
    project: id || "",
    concrete_type: "",
    concrete_pouring_type: "",
    concrete_area_size: "",
    delivery_datetime: "",
    shift: 1,
    concrete_resistance_class: "",
    max_pipeline_length: "",
    pouring_height: "",
  });

  // گرفتن لیست‌های موردنیاز
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
    if (selectedDay) {
      setIsTimeModalOpen(true);
    }
  }, [selectedDay]);

  const errorMessages = {
    required: "پر کردن این فیلد الزامی است.",
    minZero: "مقدار باید صفر یا بیشتر باشد.",
    invalidDate: "فرمت تاریخ نامعتبر است.",
    dateInPast: "تاریخ انتخابی باید از تاریخ فعلی بزرگتر باشد.",
  };

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

  useEffect(() => {
    if (!selectedDay) return;

    const { gy, gm, gd } = jalaali.toGregorian(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day
    );

    const currentDate = new Date();
    const selectedDate = new Date(gy, gm - 1, gd);

    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (selectedDate < today) {
      setErrorMessage("❌ تاریخ انتخابی نمی‌تواند از امروز گذشته باشد.");
      setIsModalOpen(true);
      setIsTimeModalOpen(false);
      setNewOrder((prev) => ({ ...prev, delivery_datetime: "" }));
    } else {
      setErrorMessage("");
      setIsModalOpen(false);
      setIsTimeModalOpen(true);
    }
  }, [selectedDay]);

  useEffect(() => {
    if (!selectedDay || !selectedTime) return;

    const { gy, gm, gd } = jalaali.toGregorian(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day
    );

    const formattedDate = `${gy}-${String(gm).padStart(2, "0")}-${String(
      gd
    ).padStart(2, "0")}T${selectedTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${selectedTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const currentDate = new Date();
    const selectedDate = new Date(gy, gm - 1, gd);

    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const isToday = selectedDate.getTime() === today.getTime();

    if (isToday) {
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const selectedHour = selectedTime.getHours();
      const selectedMinute = selectedTime.getMinutes();

      if (
        selectedHour < currentHour ||
        (selectedHour === currentHour && selectedMinute <= currentMinute)
      ) {
        setErrorMessage("❌ ساعت انتخابی نمی‌تواند کمتر از زمان فعلی باشد.");
        setIsModalOpen(true);
        setNewOrder((prev) => ({ ...prev, delivery_datetime: "" }));
        return;
      }
    }

    setNewOrder((prev) => ({ ...prev, delivery_datetime: formattedDate }));
    setErrorMessage("");
    setIsModalOpen(false);
  }, [selectedTime]);

  const handleConfirmTime = () => {
    if (!selectedDay || !selectedTime) return;

    const { gy, gm, gd } = jalaali.toGregorian(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day
    );

    const formattedDate = `${gy}-${String(gm).padStart(2, "0")}-${String(
      gd
    ).padStart(2, "0")}T${selectedTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${selectedTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const currentDate = new Date();
    const selectedDate = new Date(gy, gm - 1, gd);

    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const isToday = selectedDate.getTime() === today.getTime();

    if (isToday) {
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();
      const selectedHour = selectedTime.getHours();
      const selectedMinute = selectedTime.getMinutes();

      if (
        selectedHour < currentHour ||
        (selectedHour === currentHour && selectedMinute <= currentMinute)
      ) {
        setErrorMessage("❌ ساعت انتخابی نمی‌تواند کمتر از زمان فعلی باشد.");
        setIsModalOpen(true);
        setNewOrder((prev) => ({ ...prev, delivery_datetime: "" }));
        return;
      }
    }

    setNewOrder((prev) => ({ ...prev, delivery_datetime: formattedDate }));
    setErrorMessage("");
    setIsModalOpen(false);
    setIsTimeModalOpen(false);
  };

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

  const validateField = (field, value) => {
    let error = "";

    if (!value) {
      error = errorMessages.required;
    } else if (
      ["concrete_area_size", "max_pipeline_length", "pouring_height"].includes(
        field
      )
    ) {
      if (isNaN(value) || Number(value) < 0) {
        error = errorMessages.minZero;
      }
    } else if (field === "delivery_datetime") {
      const dateObj = new Date(value);
      if (isNaN(dateObj.getTime())) {
        error = errorMessages.invalidDate;
      } else if (dateObj <= new Date()) {
        error = errorMessages.dateInPast;
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error === "";
  };

  const handleChange = (field, value) => {
    const convertedValue = convertToEnglishDigits(value);
    setNewOrder({ ...newOrder, [field]: convertedValue });
    setShowTimePicker(true);
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
        { ...newOrder, shift: 1 },
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
    }
  };

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
        <div className="flex items-center justify-center w-full mt-4">
          <CustomCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            shift={shift}
            setShift={setShift}
          />
        </div>

        {/* انتخاب ساعت */}
        {isTimeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative z-50 flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-Bokara-Grey">
              <h2 className="mb-4 text-lg text-white">انتخاب ساعت تحویل</h2>
              <Time
                value={selectedTime}
                onChange={(newValue) => {
                  setSelectedTime(newValue);
                  // اگر لازم داری setTime رو هم اینجا صدا بزنی
                }}
              />
              ;
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleConfirmTime}
                  className="px-4 py-2 bg-blue-500 rounded text-School-Bus"
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        )}

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
            className="w-full py-2 mt-8 ml-[16vh] md:px-40"
          >
            ادامه
          </ButtonProject>
        </div>
      </form>
    </div>
  );
}

export default SaleProject;
