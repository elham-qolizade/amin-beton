// import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types"; // اضافه کردن prop-types

function AddOrderPaymentForm({ orderId, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("amount", data.amount);
    formData.append("payment_datetime", data.payment_datetime);

    if (data.attachment?.[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    if (data.note) {
      formData.append("note", data.note);
    }

    try {
      const response = await fetch(
        `/order-management/${orderId}/add-order-payments/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit payment");
      }

      const result = await response.json();
      onSuccess?.(result);
      reset();
      alert("پرداخت با موفقیت ثبت شد.");
    } catch (error) {
      console.error("خطا در ارسال پرداخت:", error);
      alert(error.message || "ثبت پرداخت با خطا مواجه شد.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px" }}>
      <div>
        <label>عنوان پرداخت *</label>
        <input
          {...register("title", { required: true, minLength: 1 })}
          type="text"
        />
        {errors.title && <p style={{ color: "red" }}>عنوان الزامی است.</p>}
      </div>

      <div>
        <label>مبلغ *</label>
        <input
          {...register("amount", { required: true, min: 0 })}
          type="number"
        />
        {errors.amount && <p style={{ color: "red" }}>مبلغ معتبر وارد کنید.</p>}
      </div>

      <div>
        <label>تاریخ پرداخت *</label>
        <input
          {...register("payment_datetime", { required: true })}
          type="datetime-local"
        />
        {errors.payment_datetime && (
          <p style={{ color: "red" }}>تاریخ الزامی است.</p>
        )}
      </div>

      <div>
        <label>ضمیمه (اختیاری)</label>
        <input {...register("attachment")} type="file" />
      </div>

      <div>
        <label>یادداشت (اختیاری)</label>
        <textarea {...register("note")} />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "در حال ارسال..." : "ثبت پرداخت"}
      </button>
    </form>
  );
}

// اضافه کردن propTypes برای تایید نوع props
AddOrderPaymentForm.propTypes = {
  orderId: PropTypes.number.isRequired, // تایپ number برای orderId
  onSuccess: PropTypes.func.isRequired, // تایپ func برای onSuccess
};

export default AddOrderPaymentForm;
