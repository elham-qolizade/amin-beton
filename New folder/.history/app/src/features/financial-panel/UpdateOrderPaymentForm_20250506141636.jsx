import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function UpdateOrderPaymentForm({
  paymentStepId,
  onSuccess,
  method = "PATCH",
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem("token"));
        const token = tokenData?.access;

        if (!token) {
          alert("توکن احراز هویت موجود نیست.");
          return;
        }

        const response = await fetch(
          `http://amin-beton-back.chbk.app/api/order-payment-steps-management/${paymentStepId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("دریافت اطلاعات پرداخت با خطا مواجه شد.");
        }

        const data = await response.json();

        reset({
          title: data.title || "",
          amount: data.amount || "",
          payment_datetime: data.payment_datetime?.slice(0, 16) || "",
          note: data.note || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("خطا در واکشی اطلاعات:", error);
        alert("خطا در واکشی اطلاعات پرداخت");
      }
    };

    fetchPayment();
  }, [paymentStepId, reset]);

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
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData?.access;

      if (!token) {
        alert("توکن احراز هویت موجود نیست.");
        return;
      }

      const response = await fetch(
        `http://amin-beton-back.chbk.app/api/order-payment-steps-management/${paymentStepId}/`,
        {
          method,
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
          throw new Error(errorData.message || "خطا در به‌روزرسانی پرداخت");
        } catch {
          throw new Error("پاسخ سرور معتبر نیست یا خطای داخلی دارد.");
        }
      }

      const result = await response.json();
      onSuccess?.(result);
      alert("پرداخت با موفقیت به‌روزرسانی شد.");
    } catch (error) {
      console.error("خطا در ارسال:", error);
      alert(error.message || "ویرایش پرداخت با خطا مواجه شد.");
    }
  };

  if (loading) return <p>در حال بارگذاری اطلاعات پرداخت...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px" }}>
      <div>
        <label>عنوان پرداخت *</label>
        <input {...register("title", { required: true })} type="text" />
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
        {isSubmitting ? "در حال ارسال..." : "به‌روزرسانی پرداخت"}
      </button>
    </form>
  );
}

UpdateOrderPaymentForm.propTypes = {
  paymentStepId: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  method: PropTypes.oneOf(["PATCH", "PUT"]),
};

export default UpdateOrderPaymentForm;
