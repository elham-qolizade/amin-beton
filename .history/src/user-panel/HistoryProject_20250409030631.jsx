import React, { useState } from "react";
import axios from "axios";

const statusMap = {
  1: "در انتظار بررسی",
  2: "تایید شده",
  3: "رد شده",
};

export default function InvoiceList({ invoices }) {
  if (!invoices || invoices.length === 0) {
    return <p className="text-center text-gray-500">پیش‌فاکتوری ثبت نشده</p>;
  }

  const [statusUpdates, setStatusUpdates] = useState({});
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (id, newStatus, reason) => {
    setLoading(true);
    try {
      await axios.post(
        "https://amin-beton-back.chbk.app/api/invoices/change_invoice_status/",
        {
          id,
          status: newStatus,
          deny_reason: reason || "",
        }
      );
      alert("عملیات با موفقیت انجام شد.");
      window.location.reload(); // رفرش صفحه
    } catch (error) {
      console.error(error);
      alert("خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => {
        const currentStatus = statusUpdates[invoice.id]?.status || null;
        const currentReason = statusUpdates[invoice.id]?.deny_reason || "";

        return (
          <div
            key={invoice.id}
            className="p-4 space-y-2 bg-white border shadow-sm rounded-xl"
          >
            <p>
              <strong>شماره سفارش:</strong> {invoice.order}
            </p>
            <p>
              <strong>قیمت:</strong> {invoice.price.toLocaleString()} تومان
            </p>
            <p>
              <strong>وضعیت:</strong> {statusMap[invoice.status]}
            </p>
            <a
              href={invoice.invoice_file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              مشاهده فایل
            </a>

            {invoice.status === 3 && invoice.deny_reason && (
              <p className="text-red-500">
                <strong>دلیل رد:</strong> {invoice.deny_reason}
              </p>
            )}

            {invoice.status === 1 && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-4">
                  <button
                    onClick={() => handleStatusChange(invoice.id, 2)}
                    className="px-4 py-1 text-white bg-green-500 rounded"
                    disabled={loading}
                  >
                    تایید
                  </button>
                  <button
                    onClick={() =>
                      setStatusUpdates((prev) => ({
                        ...prev,
                        [invoice.id]: {
                          status: 3,
                          deny_reason: currentReason,
                        },
                      }))
                    }
                    className="px-4 py-1 text-white bg-red-500 rounded"
                  >
                    رد
                  </button>
                </div>

                {currentStatus === 3 && (
                  <div className="space-y-2">
                    <textarea
                      placeholder="دلیل رد را وارد کنید..."
                      className="w-full p-2 border rounded"
                      value={currentReason}
                      onChange={(e) =>
                        setStatusUpdates((prev) => ({
                          ...prev,
                          [invoice.id]: {
                            status: 3,
                            deny_reason: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() =>
                        handleStatusChange(invoice.id, 3, currentReason)
                      }
                      className="px-4 py-1 text-white bg-red-600 rounded"
                      disabled={loading || !currentReason}
                    >
                      تایید رد کردن
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
