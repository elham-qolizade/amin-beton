import React from "react";
import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../ui/Button";
// import { useParams, useNavigate } from "react-router-dom";
import Modal from "../pages/Modal";
const [pumps, setPumps] = useState([]); // برای ذخیره پمپ‌ها
const [projectTitle, setProjectTitle] = useState(""); // برای ذخیره عنوان پروژه
const [loading, setLoading] = useState(true); // برای وضعیت بارگذاری

useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("⛛ شما احراز هویت نشده‌اید!");
      setLoading(false);
      return;
    }

    try {
      // دریافت لیست پمپ‌ها
      const { data } = await axios.get(
        "https://amin-beton-back.chbk.app/api/sales-pump/", // فرض کنید این آدرس برای پمپ‌هاست
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const parentPumps = data.filter((pump) => pump.parent === null);
      setPumps(parentPumps); // ذخیره پمپ‌ها

      // دریافت اطلاعات پروژه
      const projectRes = await axios.get(
        `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjectTitle(projectRes.data.title || "بدون عنوان"); // ذخیره عنوان پروژه
    } catch (err) {
      toast.error("❌ خطا در دریافت اطلاعات!");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [orderId]);
export default function () {
  return (
    <div>
      <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
        <div className="container w-full max-w-5xl p-8 bg-gray-800 rounded-xl">
          <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
            خرید برای <br />
          </h1>

          <div className="mb-8">
            <h2 className="text-lg font-bold">پمپ‌ها</h2>
            <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8"></div>
            <div className="mb-8">
              <h3 className="text-lg font-bold">زیرمجموعه‌های پمپ</h3>
              <div className="flex flex-row flex-wrap gap-6 mt-4"></div>
            </div>
          </div>

          {/* دکمه افزودن پمپ‌ها */}
          <div className="flex justify-center gap-6 px-10 mt-10">
            <Button className="px-10">افزودن پمپ‌ها</Button>
          </div>

          {/* نمایش انتخاب‌های پمپ‌ها */}

          <Button
            className="px-10"
            onClick={() => {
              navigate(`/VibratorPage/${orderId}`); // مقدار orderId را مقداردهی کنید
            }}
          >
            ادامه
          </Button>
        </div>
      </div>
    </div>
  );
}
