// imports...
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import AddOrderPaymentForm from "./AddOrderPaymentForm";

function OrderPaymentsPanel({ orderId }) {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      const response = await fetch(
        `http://amin-beton-back.chbk.app/api/order-management/${orderId}/list-order-payments/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("خطا در دریافت داده‌ها");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("خطا:", error);
      alert("بارگذاری پرداخت‌ها با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // 🔴 حذف پرداخت
  const handleDeletePayment = async (id) => {
    if (!window.confirm("آیا از حذف این پرداخت مطمئن هستید؟")) return;

    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      const response = await fetch(
        `http://amin-beton-back.chbk.app/api/order-payment-steps-management/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        alert("پرداخت با موفقیت حذف شد.");
        fetchPayments(); // Refresh list
      } else {
        throw new Error("خطا در حذف پرداخت.");
      }
    } catch (error) {
      console.error("خطا:", error);
      alert("خطا در حذف پرداخت.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2>لیست پرداخت‌های سفارش</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginBottom: "1rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {showForm ? "بستن فرم افزودن" : "افزودن پرداخت جدید"}
      </button>

      {showForm && (
        <AddOrderPaymentForm orderId={orderId} onSuccess={fetchPayments} />
      )}

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {payments.length === 0 ? (
            <p>هیچ پرداختی ثبت نشده است.</p>
          ) : (
            payments.map((payment) => (
              <li
                key={payment.id}
                style={{
                  background: "#f1f1f1",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                }}
              >
                <strong>{payment.title}</strong> – مبلغ: {payment.amount} تومان
                <br />
                تاریخ: {new Date(payment.payment_datetime).toLocaleString()}
                {payment.note && (
                  <>
                    <br />
                    یادداشت: {payment.note}
                  </>
                )}
                {/* 🟡 دکمه‌های حذف و ویرایش */}
                <div style={{ marginTop: "1rem" }}>
                  <button
                    onClick={() => handleDeletePayment(payment.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "0.4rem 0.8rem",
                      border: "none",
                      borderRadius: "6px",
                      marginRight: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    حذف
                  </button>

                  {/* دکمه ویرایش (قابل گسترش بعداً) */}
                  <button
                    onClick={() => alert("فرم ویرایش هنوز پیاده‌سازی نشده")}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "0.4rem 0.8rem",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ویرایش
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

OrderPaymentsPanel.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderPaymentsPanel;
