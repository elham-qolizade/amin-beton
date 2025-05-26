import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddOrderPaymentForm from "./AddOrderPaymentForm";
import EditOrderPaymentForm from "./EditOrderPaymentForm";
import styled from "styled-components";

const ScrollContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;

  /* اسکرول بار سفارشی */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

function OrderPaymentsPanel({ orderId }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    const fetchOrderPayments = async () => {
      setLoading(true);
      try {
        const tokenData = JSON.parse(localStorage.getItem("token"));
        const token = tokenData?.access;

        if (!token) {
          alert("لطفاً ابتدا وارد شوید.");
          return;
        }

        const res = await fetch(
          `http://amin-beton-back.chbk.app/api/orders/${orderId}/get-order-payments/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("خطا در دریافت لیست پرداخت‌ها");

        const data = await res.json();
        setPayments(data.payments || []);
      } catch (error) {
        console.error("fetchOrderPayments error:", error);
        alert("خطا در بارگذاری پرداخت‌ها");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderPayments();
    }
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
        <AddOrderPaymentForm orderId={orderId} onSuccess={handleAddPayment} />
      ) : null}

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : payments.length === 0 ? (
        <p>پرداختی برای این سفارش یافت نشد.</p>
      ) : (
        <ScrollContainer>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
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
                    <a
                      href={payment.attachment}
                      target="_blank"
                      rel="noreferrer"
                    >
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
        </ScrollContainer>
      )}
    </div>
  );
}

OrderPaymentsPanel.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderPaymentsPanel;
