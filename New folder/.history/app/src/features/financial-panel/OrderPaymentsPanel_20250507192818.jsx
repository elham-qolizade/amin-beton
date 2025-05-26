import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddOrderPaymentForm from "./AddOrderPaymentForm";
import EditOrderPaymentForm from "./EditOrderPaymentForm";

function OrderPaymentsPanel({ orderId }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!orderId) return;

      setLoading(true);
      try {
        const tokenData = JSON.parse(localStorage.getItem("token"));
        const token = tokenData?.access;

        const response = await fetch(
          `http://amin-beton-back.chbk.app/api/orders/${orderId}/get-order-payments/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("خطا در دریافت لیست پرداخت‌ها");

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("پاسخ سرور معتبر نیست (باید آرایه باشد)");
        }

        setPayments(data);
      } catch (error) {
        console.error("خطا در بارگذاری پرداخت‌ها:", error);
        alert(error.message || "خطا در دریافت پرداخت‌ها.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [orderId]);

  const handleDelete = async (id) => {
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

      if (!response.ok) throw new Error("خطا در حذف پرداخت");

      setPayments((prev) => prev.filter((p) => p.id !== id));
      alert("پرداخت با موفقیت حذف شد.");
    } catch (error) {
      console.error("خطا:", error);
      alert("خطا در حذف پرداخت.");
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setShowForm(false);
  };

  const handleUpdate = (updatedPayment) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === updatedPayment.id ? updatedPayment : p))
    );
    setEditingPayment(null);
  };

  const handleAddPayment = (newPayment) => {
    setPayments((prev) => [...prev, newPayment]);
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2>لیست پرداخت‌های سفارش</h2>

      {!editingPayment && (
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
      )}

      {editingPayment ? (
        <EditOrderPaymentForm
          payment={editingPayment}
          onUpdate={handleUpdate}
          onCancel={() => setEditingPayment(null)}
        />
      ) : showForm ? (
        <AddOrderPaymentForm
          orderId={orderId}
          onSuccess={handleAddPayment} // ✅ اصلاح شده
        />
      ) : null}

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : payments.length === 0 ? (
        <p>پرداختی برای این سفارش ثبت نشده است.</p>
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
              <strong>{payment.title}</strong> – مبلغ:{" "}
              {payment.amount.toLocaleString()} تومان
              <br />
              تاریخ:{" "}
              {new Date(payment.payment_datetime).toLocaleString("fa-IR")}
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
              <div style={{ marginTop: "1rem" }}>
                <button
                  onClick={() => handleEdit(payment)}
                  style={{
                    marginRight: "0.5rem",
                    padding: "0.4rem 1rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(payment.id)}
                  style={{
                    padding: "0.4rem 1rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

OrderPaymentsPanel.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderPaymentsPanel;
