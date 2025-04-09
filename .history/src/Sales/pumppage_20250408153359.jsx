import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // برای استخراج orderId از URL
import { toast } from "react-toastify"; // برای نمایش پیام‌ها

const OrderForm = () => {
  const { orderId } = useParams(); // استخراج orderId از URL
  const [formData, setFormData] = useState({
    orderId: "",
    paymentMethod: "",
    additionalInfo: "",
    requestedDate: "",
  });
  const [selectedDate, setSelectedDate] = useState(null); // برای انتخاب تاریخ

  // تابع برای بارگذاری داده‌های سفارش از API
  const fetchOrderData = async (orderId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.warn("⛔️ لطفاً وارد شوید تا بتوانید ویرایش کنید.");
        return;
      }

      // درخواست به API
      const orderDataRes = await axios.get(
        `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // بررسی جواب API و مشاهده داده‌ها در کنسول
      console.log("Fetched Order Data:", orderDataRes.data);

      // اطمینان از اینکه orderId در داده‌ها وجود دارد
      if (orderDataRes.data && orderDataRes.data.id) {
        setFormData({
          orderId: orderDataRes.data.id, // ذخیره orderId
          paymentMethod: orderDataRes.data.settlement_type,
          additionalInfo: orderDataRes.data.additional_description,
          requestedDate: "", // فرض می‌کنیم که کاربر تاریخ را وارد می‌کند
        });
      } else {
        toast.error("خطا: شناسه سفارش یافت نشد.");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      toast.error("خطا در دریافت اطلاعات سفارش.");
    }
  };

  // استفاده از useEffect برای بارگذاری داده‌ها به محض بارگذاری کامپوننت
  useEffect(() => {
    if (orderId) {
      fetchOrderData(orderId); // بارگذاری داده‌ها با استفاده از orderId استخراج شده از URL
    }
  }, [orderId]);

  // تابع برای ارسال داده‌های فرم به API
  const updateOrder = async (id) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.warn("⛔️ لطفاً وارد شوید تا بتوانید ویرایش کنید.");
      return;
    }

    const response = await fetch(
      `https://amin-beton-back.chbk.app/api/orders/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          settlement_type: formData.paymentMethod,
          additional_description: formData.additionalInfo,
        }),
      }
    );

    if (response.ok) {
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد!");
    } else if (response.status === 401) {
      toast.error("خطای 401: لطفاً وارد شوید یا توکن معتبر وارد کنید.");
    } else {
      toast.error("خطا در به‌روزرسانی سفارش!");
    }
  };

  // تابع برای ارسال فرم
  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formattedDate = selectedDate?.format("YYYY/MM/DD HH:mm");
      console.log("Form data:", { ...formData, requestedDate: formattedDate });

      const orderId = formData?.orderId;
      console.log("Order ID in onSubmit:", orderId); // نمایش orderId برای بررسی

      if (orderId) {
        updateOrder(orderId); // فراخوانی updateOrder
      } else {
        toast.error("شناسه سفارش موجود نیست!");
      }
    }
  };

  // تابع برای اعتبارسنجی فرم
  const validateForm = () => {
    if (!formData.paymentMethod) {
      toast.error("لطفاً نوع تسویه را وارد کنید.");
      return false;
    }
    return true;
  };

  return (
    <div>
      <h1>ویرایش سفارش</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>نوع تسویه</label>
          <input
            type="text"
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
          />
        </div>

        <div>
          <label>توضیحات تکمیلی</label>
          <input
            type="text"
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({ ...formData, additionalInfo: e.target.value })
            }
          />
        </div>

        <div>
          <label>تاریخ درخواست</label>
          <input
            type="datetime-local"
            value={formData.requestedDate}
            onChange={(e) =>
              setFormData({ ...formData, requestedDate: e.target.value })
            }
          />
        </div>

        <button type="submit">ارسال</button>
      </form>
    </div>
  );
};

export default OrderForm;
