import ButtonProject from "../ui/ButtonProject";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomCalendar from "../ui/Calender";
import Input from "../ui/Input";

function SaleProject() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [newOrder, setNewOrder] = useState({
    project: "", // مقدار پروژه به‌طور داینامیک
    concrete_type: "",
    concrete_pouring_type: "",
    concrete_resistance_class: "",
    concrete_area_size: "",
    delivery_datetime: "", // تاریخ بتن ریزی
    shift: "", // شیفت کاری
  });
  const { id } = useParams(); // دریافت شناسه پروژه از URL
  const [selectedDay, setSelectedDay] = useState(null); // تاریخ انتخاب شده از تقویم
  const [shift, setShift] = useState(1); // برای شیفت (1 برای روز و 2 برای شب)

  // برای ذخیره مقادیر دریافتی از API
  const [concreteTypes, setConcreteTypes] = useState([]);
  const [concretePouringTypes, setConcretePouringTypes] = useState([]);
  const [concreteResistanceClasses, setConcreteResistanceClasses] = useState(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("⛔ شما احراز هویت نشده‌اید!");
        return;
      }

      try {
        const response = await axios.get(
          "https://amin-beton-back.chbk.app/api/orders/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("❌ خطا در دریافت سفارشات!");
        setLoading(false);
      }
    };

    const fetchConcreteTypes = async () => {
      try {
        const response = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales/concrete-list/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setConcreteTypes(response.data); // ذخیره داده‌ها
      } catch (err) {
        console.error("خطا در دریافت نوع بتن:", err);
      }
    };

    const fetchConcretePouringTypes = async () => {
      try {
        const response = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales/concrete-pouring-type-list/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setConcretePouringTypes(response.data); // ذخیره داده‌ها
      } catch (err) {
        console.error("خطا در دریافت مقطع بتن ریزی:", err);
      }
    };

    const fetchConcreteResistanceClasses = async () => {
      try {
        const response = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales/concrete-resistance-class-list/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setConcreteResistanceClasses(response.data); // ذخیره داده‌ها
      } catch (err) {
        console.error("خطا در دریافت رده مقاومتی بتن:", err);
      }
    };

    fetchOrders();
    fetchConcreteTypes();
    fetchConcretePouringTypes();
    fetchConcreteResistanceClasses();
  }, []);

  useEffect(() => {
    // هنگام بارگذاری صفحه، مقدار شناسه پروژه را به فیلد project اضافه کنید.
    if (id) {
      setNewOrder((prevOrder) => ({
        ...prevOrder,
        project: id, // مقدار پروژه برابر با id پروژه از URL
      }));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("⛔ خطا: شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
      navigate("/LoginForm");
      return;
    }

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/",
        {
          ...newOrder,
          shift, // ارسال شیفت به صورت عدد (1 برای روز و 2 برای شب)
          delivery_datetime: selectedDay
            ? `${selectedDay.year}-${String(selectedDay.month).padStart(
                2,
                "0"
              )}-${String(selectedDay.day).padStart(2, "0")}T00:00`
            : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseMessage("✅ سفارش با موفقیت ثبت شد!");
      setOrders([...orders, response.data]);

      setTimeout(() => {
        navigate("/SecondPage");
      }, 1500);
    } catch (error) {
      console.error("❌ خطا در ارسال اطلاعات:", error);
      if (error.response) {
        setResponseMessage(`❌ خطا: ${JSON.stringify(error.response.data)}`);
      } else {
        setResponseMessage("❌ خطا در ارتباط با سرور!");
      }
    }
  };

  // به‌روزرسانی delivery_datetime در هنگام انتخاب تاریخ از تقویم
  useEffect(() => {
    if (selectedDay) {
      const formattedDate = `${selectedDay.year}-${String(
        selectedDay.month
      ).padStart(2, "0")}-${String(selectedDay.day).padStart(2, "0")}T00:00`; // تبدیل تاریخ به فرمت مناسب برای ورودی datetime-local
      setNewOrder({ ...newOrder, delivery_datetime: formattedDate });
    }
  }, [selectedDay]);

  if (loading) {
    return <div className="py-5 text-center">در حال بارگذاری...</div>;
  }

  if (error) {
    return (
      <div className="py-5 text-center text-red-500">
        خطا در بارگذاری: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 bg-Bokara-Grey">
      <h1 className="mb-8 text-3xl font-semibold text-center"></h1>

      {responseMessage && (
        <div className="p-3 mb-4 text-white ">{responseMessage}</div>
      )}

      <div className="mb-8">
        <h2 className="pt-10 mb-8 text-xl text-center text-white md:text-2xl">
          خرید برای پروژه شماره:
          {` ${id}`}
        </h2>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 ">
          {/* Concrete Type Dropdown */}
          <div>
            <label className="block text-white">نوع بتن</label>
            <select
              value={newOrder.concrete_type}
              onChange={(e) =>
                setNewOrder({ ...newOrder, concrete_type: e.target.value })
              }
              className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus"
              required
            >
              <option value="">انتخاب نوع بتن</option>
              {concreteTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.id}
                </option>
              ))}
            </select>
          </div>

          {/* Concrete Pouring Type Dropdown */}
          <div>
            <label className="block text-white">مقطع بتن ریزی</label>
            <select
              value={newOrder.concrete_pouring_type}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  concrete_pouring_type: e.target.value,
                })
              }
              className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus"
              required
            >
              <option value="">انتخاب مقطع بتن ریزی</option>
              {concretePouringTypes.map((pouring) => (
                <option key={pouring.id} value={pouring.id}>
                  {pouring.id}
                </option>
              ))}
            </select>
          </div>

          {/* Concrete Resistance Class Dropdown */}
          <div>
            <label className="block text-white">رده مقاومتی بتن</label>
            <select
              value={newOrder.concrete_resistance_class}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  concrete_resistance_class: e.target.value,
                })
              }
              className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus"
              required
            >
              <option value="">انتخاب رده مقاومتی بتن</option>
              {concreteResistanceClasses.map((resistance) => (
                <option key={resistance.id} value={resistance.id}>
                  {resistance.id}
                </option>
              ))}
            </select>
          </div>

          {/* Concrete Area Size */}
          <div>
            <label className="block text-white">متراژ بتن</label>
            <Input
              type="number"
              value={newOrder.concrete_area_size}
              onChange={(e) => {
                const value = e.target.value;
                if (value > 0) {
                  setNewOrder({ ...newOrder, concrete_area_size: value });
                } else {
                  // می‌توانید مقدار را پاک کنید یا پیغام خطا نمایش دهید
                  setNewOrder({ ...newOrder, concrete_area_size: "" });
                  // اگر بخواهید پیغام خطا نمایش دهید:
                  // alert("لطفا یک عدد مثبت وارد کنید.");
                }
              }}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>

          {/* Calendar and Submit */}
          <div className="flex items-center justify-center w-full mt-4">
            <CustomCalendar
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              shift={shift}
              setShift={setShift}
            />
          </div>
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
    </div>
  );
}

export default SaleProject;
