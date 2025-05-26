import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderPaymentSteps({ orderId }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `/orders/${orderId}/get-order-payments/`
        );
        setPayments(response.data);
      } catch (err) {
        setError("خطا در دریافت اطلاعات پرداخت");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [orderId]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">گردش مالی</h2>
      {payments.length === 0 ? (
        <p>پرداختی ثبت نشده است.</p>
      ) : (
        <ul className="space-y-2">
          {payments.map((step) => (
            <li key={step.id} className="p-4 border rounded-lg shadow">
              <div className="flex justify-between">
                <span className="font-medium">مبلغ:</span>
                <span>{step.amount.toLocaleString()} ریال</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">تاریخ پرداخت:</span>
                <span>
                  {new Date(step.payment_datetime).toLocaleString("fa-IR")}
                </span>
              </div>
              {step.note && (
                <div className="mt-2">
                  <span className="font-medium">یادداشت:</span> {step.note}
                </div>
              )}
              {step.attachment && (
                <div className="mt-2">
                  <a
                    href={step.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    مشاهده ضمیمه
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderPaymentSteps;
