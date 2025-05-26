import { useState } from "react";
import PropTypes from "prop-types";

function EditOrderPaymentForm({ payment, onUpdate, onCancel }) {
  const [title, setTitle] = useState(payment.title || "");
  const [amount, setAmount] = useState(payment.amount || "");
  const [note, setNote] = useState(payment.note || "");
  const [attachment, setAttachment] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const tokenData = JSON.parse(localStorage.getItem("token"));
    const token = tokenData?.access;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("amount", amount);
    formData.append("note", note);
    if (attachment) formData.append("attachment", attachment);

    try {
      const response = await fetch(
        `http://amin-beton-back.chbk.app/api/order-payment-steps-management/${payment.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("خطا در ویرایش پرداخت");

      const updated = await response.json();
      onUpdate(updated); // ارسال پرداخت ویرایش‌شده به کامپوننت والد
      alert("پرداخت با موفقیت ویرایش شد.");
    } catch (error) {
      console.error("ویرایش:", error);
      alert("خطا در ویرایش پرداخت.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff3cd",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
      }}
    >
      <h3>ویرایش پرداخت</h3>

      <div style={{ marginBottom: "1rem" }}>
        <label>عنوان پرداخت:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>مبلغ:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>یادداشت:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ ...inputStyle, height: "80px" }}
        ></textarea>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>ضمیمه جدید (اختیاری):</label>
        <input
          type="file"
          onChange={(e) => setAttachment(e.target.files[0])}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "0.5rem 1.2rem",
          border: "none",
          borderRadius: "8px",
          marginRight: "0.5rem",
        }}
      >
        {submitting ? "در حال ویرایش..." : "ثبت تغییرات"}
      </button>

      <button
        type="button"
        onClick={onCancel}
        style={{
          backgroundColor: "#6c757d",
          color: "white",
          padding: "0.5rem 1.2rem",
          border: "none",
          borderRadius: "8px",
        }}
      >
        لغو
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginTop: "0.3rem",
  fontSize: "1rem",
};

EditOrderPaymentForm.propTypes = {
  payment: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditOrderPaymentForm;
