import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddOrderPaymentForm from "./AddOrderPaymentForm";

function OrderPaymentsPanel({ orderId, paymentIds }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const tokenData = JSON.parse(localStorage.getItem("token"));
        const token = tokenData?.access;

        const fetchedPayments = await Promise.all(
          paymentIds.map(async (id) => {
            const response = await fetch(
              `http://amin-beton-back.chbk.app/api/order-payment-steps/${id}/`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (!response.ok) throw new Error("خطا در دریافت پرداخت " + id);
            return await response.json();
          })
        );

        setPayments(fetchedPayments);
      } catch (error) {
        console.error("خطا:", error);
        alert("خطا در بارگذاری پرداخت‌ها.");
      } finally {
        setLoading(false);
      }
    };

    if (paymentIds?.length > 0) {
      fetchPayments();
    }
  }, [paymentIds]);

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

      {showForm && <AddOrderPaymentForm orderId={orderId} />}

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : payments.length === 0 ? (
        <p>پرداختی برای این سفارش یافت نشد.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {payments.map((payment) => (
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
              {payment.attachment && (
                <>
                  <br />
                  ضمیمه:{" "}
                  <a href={payment.attachment} target="_blank" rel="noreferrer">
                    مشاهده فایل
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

OrderPaymentsPanel.propTypes = {
  orderId: PropTypes.number.isRequired,
  paymentIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default OrderPaymentsPanel;
