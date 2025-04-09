import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../pages/Modal";
const PumpPage = () => {
  const [pumps, setPumps] = useState([]);
  const [subPumps, setSubPumps] = useState([]);
  const [selectedPumps, setSelectedPumps] = useState([]);
  const [selectedSubPumps, setSelectedSubPumps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tempSelectedPumps, setTempSelectedPumps] = useState([]);
  const [tempSelectedSubPumps, setTempSelectedSubPumps] = useState([]);
  const { orderId } = useParams();
  const [projectTitle, setProjectTitle] = useState("");
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false); // اضافه کردن state برای بررسی ارسال
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleSubmitOrder = async (orderId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.warn("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    if (!orderId || tempSelectedPumps.length === 0) {
      toast.error("❌ سفارش یا پمپ انتخاب نشده است!");
      return;
    }

    const payload = [];

    tempSelectedPumps.forEach((pump) => {
      // پیدا کردن زیرپمپ‌های مربوط به این پمپ
      const subPumpsForThisPump = tempSelectedSubPumps.filter(
        (subPump) => subPump.pumpId === pump.id
      );

      if (subPumpsForThisPump.length > 0) {
        // اگر زیرپمپ دارد، ارسال پمپ و زیرپمپ‌ها با هم
        subPumpsForThisPump.forEach((subPump) => {
          payload.push({
            order: Number(orderId),
            pump: Number(pump.id),
            count: Number(pump.count),
            sub_pump: Number(subPump.id),
          });
        });
      } else {
        // اگر زیرپمپ ندارد، فقط پمپ را ارسال می‌کنیم
        payload.push({
          order: Number(orderId),
          pump: Number(pump.id),
          count: Number(pump.count),
          sub_pump: null, // بدون زیرپمپ
        });
      }
    });

    console.log("📦 Payload:", payload);

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/add-pump-order/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Server Response:", response.data);
      toast.success("✔ سفارش با موفقیت ارسال شد!");
    } catch (error) {
      console.error("❌ Error Sending Request:", error.response?.data || error);
      toast.error("❌ ارسال سفارش با مشکل مواجه شد!");
    }
  };

  const handleAddAndSubmit = async () => {
    console.log("🚀 handleAddAndSubmit اجرا شد!");

    if (tempSelectedPumps.length === 0 && tempSelectedSubPumps.length === 0) {
      setModalMessage("⚠️ پمپی انتخاب نکردید!");
      setIsModalOpen(true); // باز کردن مودال خطا
      return;
    }

    console.log("🔍 Selected SubPumps:", tempSelectedSubPumps);

    // چک کردن orderId قبل از ارسال
    if (!orderId) {
      setModalMessage("❌ شماره سفارش مشخص نشده است!");
      setIsModalOpen(true); // باز کردن مودال خطا
      return;
    }

    // اضافه کردن تعداد به پمپ‌ها و زیرپمپ‌ها
    const newPumps = tempSelectedPumps.map((pump) => ({
      ...pump,
      count: quantity,
    }));

    const newSubPumps = tempSelectedSubPumps.map((subPump) => ({
      ...subPump,
      count: quantity,
    }));

    const payload = [];

    newPumps.forEach((pump) => {
      // پیدا کردن زیرپمپ‌های مربوط به این پمپ
      const subPumpsForThisPump = newSubPumps.filter(
        (subPump) => subPump.pumpId === pump.id
      );

      if (subPumpsForThisPump.length > 0) {
        // اگر پمپ زیرپمپ دارد، ارسال پمپ و زیرپمپ‌ها با هم
        subPumpsForThisPump.forEach((subPump) => {
          payload.push({
            order: Number(orderId),
            pump: Number(pump.id),
            count: Number(pump.count),
            sub_pump: Number(subPump.id), // ارسال زیرپمپ
          });
        });
      } else {
        // اگر پمپ زیرپمپ ندارد، فقط پمپ را ارسال می‌کنیم
        payload.push({
          order: Number(orderId),
          pump: Number(pump.id),
          count: pump.countable ? Number(pump.count) : 1,
          sub_pump: null, // بدون زیرپمپ
        });
      }
    });

    // ارسال تمامی درخواست‌ها به سرور
    console.log("📦 Payload:", payload);

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/add-pump-order/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("✅ Server Response:", response.data);
        toast.success("✔ سفارش با موفقیت ارسال شد!");

        // بروزرسانی لیست‌های انتخاب شده
        setSelectedPumps((prev) => [...prev, ...newPumps]);
        setSelectedSubPumps((prev) => [...prev, ...newSubPumps]);

        // پاک کردن انتخاب‌های موقت
        setTempSelectedPumps([]);
        setTempSelectedSubPumps([]);
        setSubPumps([]);
        setQuantity(1);
      } else {
        setModalMessage("❌ ارسال سفارش با مشکل مواجه شد!");
        setIsModalOpen(true); // باز کردن مودال خطا
      }
    } catch (error) {
      console.error("❌ Error Sending Request:", error.response?.data || error);
      setModalMessage(
        error.response?.data?.message || "❌ ارسال سفارش با مشکل مواجه شد!"
      );
      setIsModalOpen(true); // باز کردن مودال خطا
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("⛛ شما احراز هویت نشده‌اید!");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales-pump/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const parentPumps = data.filter((pump) => pump.parent === null);
        setPumps(parentPumps);

        setProjectTitle(projectRes.data.title || "بدون عنوان");
      } catch (err) {
        toast.error("❌ خطا در دریافت اطلاعات!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  const fetchSubPumps = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://amin-beton-back.chbk.app/api/sales-pump/${id}/sub-pumps/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data && data.length > 0) {
        setSubPumps((prev) => {
          const newSubs = data.filter(
            (subPump) => !prev.some((existing) => existing.id === subPump.id)
          );
          return [...prev, ...newSubs];
        });
      } else {
        setSubPumps([]);
      }
    } catch (err) {
      toast.error("❌ خطا در دریافت زیرمجموعه‌های پمپ!");
    }
  };
  const handlePumpSelection = (id) => {
    if (quantity < 1) {
      toast.warn("⚠️ لطفاً تعداد معتبر وارد کنید!");
      return;
    }

    const pump = pumps.find((p) => p.id === id);
    if (!pump) return;

    const isSelected = tempSelectedPumps.some((p) => p.id === pump.id);

    if (isSelected) {
      // اگه همون پمپ دوباره کلیک بشه، پاکش کن
      setTempSelectedPumps([]);
      setTempSelectedSubPumps([]);
      setSubPumps([]);
    } else {
      // فقط همون یه پمپ رو نگه دار
      setTempSelectedPumps([
        {
          ...pump,
          count: quantity,
        },
      ]);

      // زیرپمپ قبلی حذف بشه
      setTempSelectedSubPumps([]);
      setSubPumps([]);

      fetchSubPumps(id);
    }
  };

  const handleSubPumpSelection = (subPumpId) => {
    if (quantity < 1) {
      toast.warn("⚠️ لطفاً تعداد معتبر وارد کنید!");
      return;
    }

    const subPump = subPumps.find((sp) => sp.id === subPumpId);
    if (!subPump) return;

    const selectedPump = tempSelectedPumps[0]; // چون فقط یکی انتخاب می‌شه
    if (!selectedPump) {
      toast.warn("⚠️ لطفاً ابتدا یک پمپ انتخاب کنید!");
      return;
    }

    const exists = tempSelectedSubPumps.some(
      (sp) => sp.id === subPumpId && sp.pumpId === selectedPump.id
    );

    if (exists) {
      // اگه همون زیرپمپ دوباره کلیک بشه، پاکش کن
      setTempSelectedSubPumps([]);
    } else {
      // فقط همین یه زیرپمپ رو نگه دار
      setTempSelectedSubPumps([
        {
          ...subPump,
          count: quantity,
          pumpId: selectedPump.id,
        },
      ]);
    }
  };

  const handleQuantityChangeForPump = (id, value) => {
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 1) return;

    // تغییر تعداد پمپ انتخاب شده
    setTempSelectedPumps((prev) =>
      prev.map((p) => (p.id === id ? { ...p, count: numericValue } : p))
    );
  };

  const handleQuantityChangeForSubPump = (id, value) => {
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 1) return;

    // تغییر تعداد زیرپمپ انتخاب شده
    setTempSelectedSubPumps((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, count: numericValue } : sp))
    );
  };

  const handleTempQuantityChange = (id, value, isSubPump = false) => {
    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 1) return;

    if (isSubPump) {
      setTempSelectedSubPumps((prev) =>
        prev.map((sp) => (sp.id === id ? { ...sp, count: numericValue } : sp))
      );
    } else {
      setTempSelectedPumps((prev) =>
        prev.map((p) => (p.id === id ? { ...p, count: numericValue } : p))
      );
    }
  };

  const handleQuantityChange = (e) => {
    const updatedCount = Number(e.target.value);
    if (!isNaN(updatedCount) && updatedCount >= 1) {
      setQuantity(updatedCount); // بروزرسانی مقدار quantity
    }
  };

  //   if (!token) {
  //     toast.warn("⛛ شما احراز هویت نشده‌اید!");
  //     return;
  //   }

  //   if (!orderId) {
  //     toast.error("❌ شماره سفارش معتبر نیست!");
  //     return;
  //   }

  //   // فیلتر کردن پمپ‌ها و زیرپمپ‌ها بر اساس ID به‌طوری‌که تکراری نباشند
  //   const uniquePumps = [
  //     ...new Map(pumps.map((p) => [p.id, p])).values(), // حذف پمپ‌های تکراری بر اساس id
  //   ];
  //   const uniqueSubPumps = [
  //     ...new Map(subPumps.map((sp) => [sp.id, sp])).values(), // حذف زیرپمپ‌های تکراری بر اساس id
  //   ];

  //   const payload = [
  //     ...uniqueSubPumps.map((sp) => ({
  //       order: orderId,
  //       pump: sp.parentId,
  //       count: sp.count,
  //       sub_pump: sp.id,
  //     })),
  //     ...uniquePumps
  //       .filter((p) => !uniqueSubPumps.some((sp) => sp.parentId === p.id)) // پمپ‌هایی که زیرپمپ ندارند
  //       .map((p) => ({
  //         order: orderId,
  //         pump: p.id,
  //         count: p.count,
  //         sub_pump: null,
  //       })),
  //   ];

  //   try {
  //     if (payload.length > 0) {
  //       await axios.post(
  //         "https://amin-beton-back.chbk.app/api/orders/add-pump-order/",
  //         payload,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       toast.success("✅ سفارش با موفقیت ثبت شد!");
  //     } else {
  //       toast.warn("⚠️ هیچ آیتمی برای ارسال وجود ندارد!");
  //     }
  //   } catch (err) {
  //     toast.error("❌ خطا در افزودن پمپ به سفارش!");
  //   }
  // };

  const handleRemovePump = (id, isSubPump = false) => {
    if (isSubPump) {
      setSelectedSubPumps((prev) => prev.filter((sp) => sp.id !== id));
    } else {
      setSelectedPumps((prev) => prev.filter((p) => p.id !== id));
    }

    deletePumpOrder(id);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
      <div className="container w-full max-w-5xl p-8 bg-gray-800 rounded-xl">
        <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
          خرید برای <br /> {projectTitle}
        </h1>

        <div className="mb-8">
          <h2 className="text-lg font-bold">پمپ‌ها</h2>
          <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8">
            {pumps.map((pump) => {
              const isSelected = tempSelectedPumps.some(
                (p) => p.id === pump.id
              );

              return (
                <div
                  key={pump.id}
                  className={`flex flex-col gap-2 items-center justify-center text-center w-40 border ${
                    isSelected ? "border-School-Bus" : "border-white"
                  } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                  onClick={() => handlePumpSelection(pump.id)}
                >
                  <div
                    className={`w-4 h-4 mb-2 rounded-full ${
                      isSelected ? "bg-School-Bus" : "bg-white"
                    }`}
                  ></div>
                  <div className="mb-2">{pump.title}</div>
                </div>
              );
            })}
          </div>

          {tempSelectedPumps.length > 0 && subPumps.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold">زیرمجموعه‌های پمپ</h3>
              <div className="flex flex-row flex-wrap gap-6 mt-4">
                {subPumps.map((subPump) => {
                  const isSelected = tempSelectedSubPumps.some(
                    (sp) => sp.id === subPump.id
                  );

                  return (
                    <div
                      key={subPump.id}
                      className={`flex flex-col gap-2 items-center justify-center text-center w-40 border ${
                        isSelected ? "border-School-Bus" : "border-white"
                      } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                      onClick={() => handleSubPumpSelection(subPump.id)}
                    >
                      <div
                        className={`w-4 h-4 mb-2 rounded-full ${
                          isSelected ? "bg-School-Bus" : "bg-white"
                        }`}
                      ></div>
                      <div className="mb-2">{subPump.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {tempSelectedPumps.some((pump) => pump.countable) && (
          <div className="flex items-center gap-2 mt-4">
            <label htmlFor="totalQty" className="text-sm">
              تعداد ویبراتور:
            </label>
            <input
              id="totalQty"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-24 p-2 border rounded-md text-black"
            />
          </div>
        )}

        {/* دکمه افزودن پمپ‌ها */}
        <div className="flex justify-center gap-6 px-10 mt-10">
          <Button className="px-10" onClick={handleAddAndSubmit}>
            افزودن پمپ‌ها
          </Button>
        </div>

        {/* نمایش انتخاب‌های پمپ‌ها */}
        <div className="mb-8">
          <h3 className="text-lg font-bold">پمپ‌های ثبت‌شده برای این سفارش</h3>
          <div className="flex flex-row flex-wrap gap-6 mt-4">
            {selectedPumps.map((pump) => {
              const subPumpsForThisPump = selectedSubPumps.filter(
                (subPump) => subPump.pumpId === pump.id
              );
              return (
                <div
                  key={pump.id}
                  className="flex flex-col items-center justify-center w-40 gap-2 px-4 py-4 text-center border rounded-lg border-School-Bus"
                >
                  <div className="w-4 h-4 mb-2 rounded-full bg-School-Bus"></div>
                  <div className="mb-2">{pump.title}</div>
                  <div>
                    تعداد پمپ: {pump.count} | زیرپمپ‌ها:{" "}
                    {subPumpsForThisPump.length}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Button
          className="px-10"
          onClick={() => {
            handleAddAndSubmit();
            navigate(`/VibratorPage/${orderId}`); // مقدار orderId را مقداردهی کنید
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
    </div>
  );
};

export default PumpPage;
