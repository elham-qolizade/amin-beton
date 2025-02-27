// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "react-calendar/dist/Calendar.css";
// import dayjs from "dayjs";
// import ButtonProject from "../ui/ButtonProject";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// dayjs.locale("fa");

// export function Button({ children, ...props }) {
//   return (
//     <button
//       className="w-full p-3 text-white border border-white shadow-lg bg-Bokara-Grey rounded-2xl"
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }

// export default function SaleProject() {
//   const { register, handleSubmit } = useForm();
//   const [selectedDay, setSelectedDay] = useState(null);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         title: "سفارش جدید", // عنوان سفارش (می‌توانی مقدار دلخواه بدهی)
//         type: data.type,
//         concreteLevel: data.concreteLevel,
//         priority: data.priority,
//         quantity: data.quantity,
//         delivery_date: selectedDay, // تاریخ انتخاب‌شده از تقویم
//       };

//       const response = await axios.post(
//         "https://amin-beton-back.chbk.app/api/orders/orders_create",
//         payload
//       );

//       console.log("Order Created:", response.data);

//       navigate("/SecondSalePage"); // هدایت به صفحه بعد
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert("خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.");
//     }
//   };

//   return (
//     <div className="py-4 pt-6 mx-auto text-white border rounded-lg bg-Bokara-Grey border-School-Bus">
//       <div className="container items-center w-2/3">
//

//         <form
//           className="flex flex-col items-center justify-center gap-6"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//

//           {/* تقویم */}
//
//           {/* دکمه ادامه */}
//           <ButtonProject
//             className=""
//             type="submit"
//           >
//             ادامه
//           </ButtonProject>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomCalendar from "../ui/Calender";
import Input from "../ui/Input";
import ButtonProjectComponent from "../ui/ButtonProject";
function SaleProject() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [newOrder, setNewOrder] = useState({
    project: "",
    concrete_type: "",
    concrete_pouring_type: "",
    concrete_resistance_class: "",
    concrete_area_size: "",
    delivery_datetime: "", // تاریخ بتن ریزی
    shift: "", // شیفت کاری
  });

  const [selectedDay, setSelectedDay] = useState(null); // تاریخ انتخاب شده از تقویم
  const [shift, setShift] = useState("morning"); // برای شیفت

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

    fetchOrders();
  }, []);

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
        { ...newOrder, shift, delivery_datetime: selectedDay }, // ارسال شیفت و تاریخ
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
    return <div className="text-center py-5">در حال بارگذاری...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-5 text-red-500">
        خطا در بارگذاری: {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen bg-Bokara-Grey">
      <h1 className="text-3xl font-semibold text-center mb-8"></h1>

      {responseMessage && (
        <div className="mb-4 p-3 text-white ">{responseMessage}</div>
      )}

      <div className="mb-8">
        <h2 className="pt-10 text-white mb-8 text-xl text-center md:text-2xl">
          خرید برای پروژه "نام پروژه
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4  p-6 ">
          <div>
            <label className="block text-white">پروژه</label>
            <Input
              type="number"
              value={newOrder.project}
              onChange={(e) =>
                setNewOrder({ ...newOrder, project: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">نوع بتن</label>
            <Input
              type="number"
              value={newOrder.concrete_type}
              onChange={(e) =>
                setNewOrder({ ...newOrder, concrete_type: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">مقطع بتن ریزی</label>
            <Input
              type="number"
              value={newOrder.concrete_pouring_type}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  concrete_pouring_type: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">رده مقاومتی بتن</label>
            <Input
              type="number"
              value={newOrder.concrete_resistance_class}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  concrete_resistance_class: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">متراژ بتن</label>
            <Input
              type="number"
              min="0"
              max="99999"
              value={newOrder.concrete_area_size}
              onChange={(e) =>
                setNewOrder({ ...newOrder, concrete_area_size: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-white">تاریخ و ساعت درخواستی</label>
            <Input
              type="datetime-local"
              value={newOrder.delivery_datetime} // نمایش تاریخ انتخاب‌شده
              onChange={(e) =>
                setNewOrder({ ...newOrder, delivery_datetime: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-white">شیفت</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full p-3 w-full  ltr-input bg-Bokara-Grey p-1 pl-4  border border-l-Looking-Glass text-white focus:outline-none focus:ring-1 focus:ring-School-Bus border border-gray-300 rounded"
              required
            >
              <option value="morning">صبح</option>
              <option value="night">شب</option>
            </select>
          </div>

          <div className="flex py-10 items-center justify-center w-full mt-4">
            <CustomCalendar
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              shift={shift}
              setShift={setShift}
            />
          </div>
          <div className="flex  items-center justify-center">
            <ButtonProjectComponent
              type="submit"
              className="w-full items-center py-2  mt-8 md:w-1/2 md:px-40"
            >
              ادامه
            </ButtonProjectComponent>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaleProject;
