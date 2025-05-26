// AddOrderPaymentForm.jsx
import React from "react";
import { useForm } from "react-hook-form";

function AddOrderPaymentForm({ orderId, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("amount", data.amount);
    formData.append("payment_datetime", data.payment_datetime);
    if (data.attachment?.[0]) formData.append("attachment", data.attachment[0]);
    if (data.note) formData.append("note", data.note);

    try {
      const res = await fetch(
        `/order-management/${orderId}/add-order-payments/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("خطا در ارسال");

      const result = await res.json();
      onSuccess?.(result);
      reset();
      alert("پرداخت با موفقیت ثبت شد.");
    } catch (err) {
      console.error(err);
      alert("ثبت پرداخت ناموفق بود.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div>
        <label>عنوان *</label>
        <input {...register("title", { required: true })} />
        {errors.title && <small>عنوان الزامی است.</small>}
      </div>
      <div>
        <label>مبلغ *</label>
        <input
          type="number"
          {...register("amount", { required: true, min: 0 })}
        />
        {errors.amount && <small>مبلغ معتبر نیست.</small>}
      </div>
      <div>
        <label>تاریخ پرداخت *</label>
        <input
          type="datetime-local"
          {...register("payment_datetime", { required: true })}
        />
        {errors.payment_datetime && <small>تاریخ الزامی است.</small>}
      </div>
      <div>
        <label>ضمیمه</label>
        <input type="file" {...register("attachment")} />
      </div>
      <div>
        <label>یادداشت</label>
        <textarea {...register("note")} />
      </div>
      <button type="submit">ثبت پرداخت</button>
    </form>
  );
}

export default AddOrderPaymentForm;
