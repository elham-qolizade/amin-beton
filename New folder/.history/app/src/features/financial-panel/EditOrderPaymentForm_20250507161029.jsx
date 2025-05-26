import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useEffect } from "react";

const StyledForm = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fefefe;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.6rem 0.8rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  p {
    color: red;
    margin-top: -1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 0.5rem;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

function EditOrderPaymentForm({ payment, onUpdate, onCancel }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    setValue("title", payment.title || "");
    setValue("amount", payment.amount || "");
    setValue("payment_datetime", payment.payment_datetime?.slice(0, 16) || "");
    setValue("note", payment.note || "");
  }, [payment, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("amount", data.amount);
    formData.append("payment_datetime", data.payment_datetime);
    if (data.note) formData.append("note", data.note);
    if (data.attachment?.[0]) formData.append("attachment", data.attachment[0]);

    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      if (!token) {
        alert("توکن یافت نشد.");
        return;
      }

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

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || "خطا در بروزرسانی پرداخت");
        } catch {
          throw new Error("پاسخ نامعتبر از سرور");
        }
      }

      const result = await response.json();
      onUpdate(result);
      alert("پرداخت با موفقیت ویرایش شد.");
    } catch (err) {
      console.error("خطا:", err);
      alert(err.message || "ویرایش با خطا مواجه شد.");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>عنوان پرداخت *</label>
        <input {...register("title", { required: true })} type="text" />
        {errors.title && <p>عنوان الزامی است.</p>}
      </div>

      <div>
        <label>مبلغ *</label>
        <input
          {...register("amount", { required: true, min: 0 })}
          type="number"
        />
        {errors.amount && <p>مبلغ معتبر وارد کنید.</p>}
      </div>

      <div>
        <label>تاریخ پرداخت *</label>
        <input
          {...register("payment_datetime", { required: true })}
          type="datetime-local"
        />
        {errors.payment_datetime && <p>تاریخ الزامی است.</p>}
      </div>

      <div>
        <label>ضمیمه جدید (اختیاری)</label>
        <input {...register("attachment")} type="file" />
      </div>

      <div>
        <label>یادداشت (اختیاری)</label>
        <textarea {...register("note")} />
      </div>

      <div style={{ textAlign: "right" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{ backgroundColor: "#6c757d" }}
        >
          انصراف
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "در حال ویرایش..." : "ذخیره تغییرات"}
        </button>
      </div>
    </StyledForm>
  );
}

EditOrderPaymentForm.propTypes = {
  payment: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditOrderPaymentForm;
