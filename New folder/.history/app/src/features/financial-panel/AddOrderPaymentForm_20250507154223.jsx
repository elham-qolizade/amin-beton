import { useState } from "react";
import PropTypes from "prop-types";

function AddOrderPaymentForm({ orderId, onAddPayment }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const tokenData = JSON.parse(localStorage.getItem("token"));
    const token = tokenData?.access;

    const formData = new FormData();
    formData.append("order", orderId);
    formData.append("title", title);
    formData.append("amount", amount);
    if (note) formData.append("note", note);
    if (attachment) formData.append("attachment", attachment);

    try {
      const response = await fetch(
        "http://amin-beton-back.chbk.app/api/order-payment-steps/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("خطا در ثبت پرداخت جدید");

      const data = await response.json();
      onAddPayment(data);

      // Reset form
      setTitle("");
      setAmount("");
      setNote("");
      setAttachment(null);
      alert("پرداخت با موفقیت ثبت شد.");
    } catch (error) {
      console.error("خطا:", error);
      alert("خطا در ثبت پرداخت.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#f9f9f9",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
      }}
    >
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
        <label>یادداشت (اختیاری):</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ ...inputStyle, height: "80px", resize: "vertical" }}
        ></textarea>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>ضمیمه (اختیاری):</label>
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
          padding: "0.6rem 1.4rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {submitting ? "در حال ارسال..." : "ثبت پرداخت"}
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

AddOrderPaymentForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  onAddPayment: PropTypes.func.isRequired,
};

export default AddOrderPaymentForm;
