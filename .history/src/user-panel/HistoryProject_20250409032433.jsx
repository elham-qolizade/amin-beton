import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const HistoryProject = () => {
  const [invoices, setInvoices] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const { id } = useParams();
  const navigate = useNavigate();

  // بررسی اینکه توکن معتبر است
  if (!token) {
    alert("⛔ شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
    navigate("/LoginForm");
    return;
  }

  useEffect(() => {
    if (id) {
      console.log("Order ID received:", id); // چاپ مقدار orderId در کنسول
      getInvoices(id); // دریافت اینویس‌ها برای orderId جدید
    }
  }, [id]); // فقط زمانی که id تغییر کند، getInvoices فراخوانی می‌شود.

  const getInvoices = async (orderId) => {
    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/get-order-invoices/",
        { order_id: parseInt(orderId) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const invoices = response.data; // فرض بر اینکه داده‌ها در invoices قرار دارند

      if (!invoices || invoices.length === 0) {
        alert("⛔ هیچ پیش‌فاکتوری برای این سفارش ثبت نشده.");
        return;
      }

      console.log("لیست اینویس‌ها:", invoices); // چاپ لیست اینویس‌ها در کنسول

      // ذخیره اینویس‌ها در state
      setInvoices(invoices);
    } catch (error) {
      console.error("❌ خطا در دریافت اینویس‌ها:", error);
      alert("⚠️ مشکلی در دریافت یا نمایش اینویس‌ها پیش آمده است.");
    }
  };

  return (
    <div>
      {invoices.length === 0 ? (
        <p>هیچ فاکتوری وجود ندارد</p>
      ) : (
        invoices.map((invoice) => (
          <div key={invoice.id}>
            <p>شماره سفارش: {invoice.order}</p>
            <p>قیمت: {invoice.price}</p>
            <p>وضعیت: {invoice.status}</p>
            <a
              href={invoice.invoice_file}
              target="_blank"
              rel="noopener noreferrer"
            >
              مشاهده فایل
            </a>
            {invoice.status === 3 && invoice.deny_reason && (
              <p>دلیل رد: {invoice.deny_reason}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryProject;
