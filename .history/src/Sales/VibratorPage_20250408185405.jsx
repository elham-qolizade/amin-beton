import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "./Button"; // فرض می‌کنیم Button کامپوننتی است که از جایی وارد شده
import Modal from "./Modal"; // فرض می‌کنیم Modal کامپوننتی است که از جایی وارد شده
import toast from "react-toastify";

const VibratorPage = () => {
  const { orderId } = useParams(); // گرفتن orderId از URL
  const [selectedVibrators, setSelectedVibrators] = useState([]);
  const [selectedSubVibrators, setSelectedSubVibrators] = useState([]);
  const [tempSelectedVibrators, setTempSelectedVibrators] = useState([]);
  const [tempSelectedSubVibrators, setTempSelectedSubVibrators] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [subVibrators, setSubVibrators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🟢 orderId from useParams:", orderId);
  }, [orderId]);

  // دریافت داده‌های سفارش
  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.warn("⛛ شما احراز هویت نشده‌اید!");
          return;
        }

        // دریافت داده‌های سفارش شامل پمپ‌ها و ویبراتورها
        const orderDataRes = await axios.get(
          `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("ویبراتورها و زیرویبراتورها:", orderDataRes.data);
        setSelectedVibrators(orderDataRes.data.vibrators || []);
        setSelectedSubVibrators(orderDataRes.data.subVibrators || []);
      } catch (err) {
        toast.error("❌ خطا در دریافت داده‌های سفارش!");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);

  const handleAddVibrators = () => {
    // اینجا فرض می‌کنیم که داده‌ها به‌درستی بارگذاری شده‌اند
    const newFormattedVibrators = tempSelectedVibrators.map((vib) => ({
      vibrator: { title: vib.title },
      count: vib.count,
      id: vib.id,
      sub_vibrator: null, // یا اگر زیرویبراتور داشته باشی می‌تونی این رو اضافه کنی
    }));

    const newFormattedSubVibrators = tempSelectedSubVibrators.map((subVib) => ({
      ...subVib, // یا هر چیزی که نیاز داشته باشی
      count: quantity,
    }));

    setSelectedVibrators((prev) => [...prev, ...newFormattedVibrators]);
    setSelectedSubVibrators((prev) => [...prev, ...newFormattedSubVibrators]);

    setTempSelectedVibrators([]);
    setTempSelectedSubVibrators([]);
  };

  const handleAddAndSubmit = async () => {
    if (
      tempSelectedVibrators.length === 0 &&
      tempSelectedSubVibrators.length === 0
    ) {
      setModalMessage("⚠️ ویبراتوری انتخاب نکردید!");
      setIsModalOpen(true); // باز کردن مودال خطا
      return;
    }

    const newVibrators = tempSelectedVibrators.map((vibrator) => ({
      ...vibrator,
      count: quantity,
    }));

    const newSubVibrators = tempSelectedSubVibrators.map((subVibrator) => ({
      ...subVibrator,
      count: quantity,
    }));

    const payload = [];

    newVibrators.forEach((vibrator) => {
      const subVibratorsForThisVibrator = newSubVibrators.filter(
        (subVibrator) => subVibrator.vibratorId === vibrator.id
      );

      if (subVibratorsForThisVibrator.length > 0) {
        subVibratorsForThisVibrator.forEach((subVibrator) => {
          payload.push({
            order: Number(orderId),
            vibrator: Number(vibrator.id),
            count: Number(vibrator.count),
            sub_vibrator: Number(subVibrator.id),
          });
        });
      } else {
        payload.push({
          order: Number(orderId),
          vibrator: Number(vibrator.id),
          count: Number(vibrator.count),
          sub_vibrator: null,
        });
      }
    });

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/add-vibrator-order/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("✔ سفارش با موفقیت ارسال شد!");
        setSelectedVibrators((prev) => [...prev, ...newVibrators]);
        setSelectedSubVibrators((prev) => [...prev, ...newSubVibrators]);

        setTempSelectedVibrators([]);
        setTempSelectedSubVibrators([]);
        setQuantity(1);
      } else {
        setModalMessage("❌ ارسال سفارش با مشکل مواجه شد!");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("❌ Error Sending Request:", error.response?.data || error);
      setModalMessage(
        error.response?.data?.message || "❌ ارسال سفارش با مشکل مواجه شد!"
      );
      setIsModalOpen(true);
    }
  };

  const handleDeleteVibratorOrder = (id) => {
    setSelectedVibrators((prev) =>
      prev.filter((vibrator) => vibrator.id !== id)
    );
    setSelectedSubVibrators((prev) =>
      prev.filter((subVibrator) => subVibrator.id !== id)
    );
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold">ویبراتورهای ثبت‌شده برای این سفارش</h3>
      <div className="flex flex-row flex-wrap gap-6 mt-4">
        {selectedVibrators.map((vibrator) => {
          if (!vibrator.vibrator || !vibrator.vibrator.title) {
            return null;
          }

          const subVibratorsForThis = vibrator.sub_vibrator
            ? [vibrator.sub_vibrator]
            : [];

          return (
            <div
              key={vibrator.id}
              className="flex flex-col items-center justify-center w-40 gap-2 px-4 py-4 text-center border rounded-lg border-School-Bus"
            >
              <div className="w-4 h-4 mb-2 rounded-full bg-School-Bus"></div>
              <div className="mb-2">
                {vibrator.vibrator?.title || "ویبراتور نامشخص"}
              </div>
              <div>تعداد ویبراتور: {vibrator.count}</div>
              {subVibratorsForThis.length > 0 && (
                <div>
                  {subVibratorsForThis.map((sub_vibrator) => (
                    <div key={sub_vibrator.id} className="text-sm">
                      زیرویبراتور: {sub_vibrator.title}
                    </div>
                  ))}
                </div>
              )}
              <button
                className="border-none text-red"
                onClick={() => handleDeleteVibratorOrder(vibrator.id)}
              >
                حذف
              </button>
            </div>
          );
        })}
      </div>

      <Button
        className="px-10"
        onClick={() => {
          handleAddAndSubmit();
        }}
      >
        ادامه
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default VibratorPage;
