// export default Vibrator
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../pages/Modal";
const VibratorPage = () => {
  const [vibrators, setVibrators] = useState([]); // لیست ویبراتورها
  const [subVibrators, setSubVibrators] = useState([]); // زیر ویبراتورها
  const [selectedVibrators, setSelectedVibrators] = useState([]); // ویبراتورهای انتخاب‌شده
  const [selectedSubVibrators, setSelectedSubVibrators] = useState([]); // زیر ویبراتورهای انتخاب‌شده
  const [loading, setLoading] = useState(true); // در حال بارگذاری؟
  const [tempSelectedVibrators, setTempSelectedVibrators] = useState([]); // ویبراتورهای انتخاب‌شده موقت
  const [tempSelectedSubVibrators, setTempSelectedSubVibrators] = useState([]); // زیر ویبراتورهای انتخاب‌شده موقت
  const { orderId } = useParams(); // شماره سفارش
  const [projectTitle, setProjectTitle] = useState(""); // عنوان پروژه
  const navigate = useNavigate(); // برای مسیریابی
  const [malepSelected, setMalepSelected] = useState(""); // ماله پروانه
  const [quantity, setQuantity] = useState(1); // تعداد ویبراتورها
  const [isSubmitting, setIsSubmitting] = useState(false); // بررسی وضعیت ارسال
  const [showVibratorModal, setShowVibratorModal] = useState(false); // نمایش مدال ویبراتور
  const [showVibratorSelection, setShowVibratorSelection] = useState(false); // نمایش انتخاب ویبراتور
  const [supervisionSelected, setSupervisionSelected] = useState(null); // نظارت انتخاب‌شده
  const [supervisionDescription, setSupervisionDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [newVibrators, setNewVibrators] = useState([]); // فرض می‌کنیم داده‌ها اینجا ذخیره می‌شوند
  const [newSubVibrators, setNewSubVibrators] = useState([]);

  const handleVibratorSelection = (id) => {
    if (quantity < 1) {
      toast.warn("⚠️ لطفاً تعداد معتبر وارد کنید!");
      return;
    }

    const vibrator = vibrators.find((v) => v.id === id);
    if (!vibrator) return;

    const isSelected = tempSelectedVibrators.some((v) => v.id === vibrator.id);

    if (isSelected) {
      // اگر دوباره کلیک کرد، انتخاب رو حذف کن
      setTempSelectedVibrators([]);
      setTempSelectedSubVibrators([]);
      setSubVibrators([]);
    } else {
      // هر انتخاب قبلی رو حذف کن و فقط این ویبراتور رو انتخاب کن
      setTempSelectedVibrators([
        {
          ...vibrator,
          count: quantity,
        },
      ]);

      setTempSelectedSubVibrators([]); // زیر ویبراتورهای قبلی پاک بشه
      setSubVibrators([]);
      fetchSubVibrators(id);
    }

    // ذخیره انتخاب‌ها در localStorage
    localStorage.setItem(
      "tempSelectedVibrators",
      JSON.stringify(tempSelectedVibrators)
    );
    localStorage.setItem(
      "tempSelectedSubVibrators",
      JSON.stringify(tempSelectedSubVibrators)
    );
  };
  const handleAddVibrators = () => {
    console.log("newVibrators before add:", newVibrators);
    console.log("newSubVibrators before add:", newSubVibrators);

    // استفاده از تابع بازگشتی برای اطمینان از همگام‌سازی درست
    setSelectedVibrators((prev) => {
      const updatedVibrators = [...prev, ...newVibrators];
      console.log("updatedVibrators:", updatedVibrators);
      return updatedVibrators;
    });

    setSelectedSubVibrators((prev) => {
      const updatedSubVibrators = [...prev, ...newSubVibrators];
      console.log("updatedSubVibrators:", updatedSubVibrators);
      return updatedSubVibrators;
    });

    // می‌توانید پس از به‌روزرسانی داده‌ها این‌ها را پاک کنید
    setNewVibrators([]);
    setNewSubVibrators([]);
  };

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.warn("⛛ شما احراز هویت نشده‌اید!");
        return;
      }

      // دریافت داده‌های سفارش شامل پمپ‌ها و زیرپمپ‌ها
      const orderDataRes = await axios.get(
        `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("پمپ‌ها و زیرپمپ‌ها:", orderDataRes.data); // برای بررسی
      console.log("ویبراتورها و زیرویبراتورها:", orderDataRes.data); // بررسی پاسخ دریافتی

      // داده‌های مربوط به ویبراتور
      setSelectedVibrators(orderDataRes.data.vibrators || []);
      setSelectedSubVibrators(orderDataRes.data.subVibrators || []);
    } catch (err) {
      toast.error("❌ خطا در دریافت داده‌های سفارش!");
    } finally {
      setLoading(false);
    }
  };

  // این useEffect فقط در صورتی که orderId تغییر کند، فراخوانی می‌شود
  useEffect(() => {
    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);

  const handleAddAndSubmit = async () => {
    console.log("🚀 handleAddAndSubmit اجرا شد!");

    if (
      tempSelectedVibrators.length === 0 &&
      tempSelectedSubVibrators.length === 0
    ) {
      setModalMessage("⚠️ ویبراتوری انتخاب نکردید!");
      setIsModalOpen(true); // باز کردن مودال خطا
      return;
    }

    console.log("🔍 Selected SubVibrators:", tempSelectedSubVibrators);

    // چک کردن orderId قبل از ارسال
    if (!orderId) {
      setModalMessage("❌ شماره سفارش مشخص نشده است!");
      setIsModalOpen(true); // باز کردن مودال خطا
      return;
    }

    // اضافه کردن تعداد به ویبراتورها و زیر ویبراتورها
    const newVibrators = tempSelectedVibrators.map((vibrator) => ({
      ...vibrator,
      count: quantity,
    }));

    const newSubVibrators = tempSelectedSubVibrators.map((subVibrator) => ({
      ...subVibrator,
      count: quantity,
    }));

    // ارسال داده‌ها به سرور
    const payload = [];
    // window.location.reload();
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
          count: vibrator.countable ? Number(vibrator.count) : 1,
          sub_vibrator: null,
        });
      }
    });

    console.log("📦 Payload:", payload);

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/add-vibrator-order/", // فرض کنید این آدرس جدید است
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
        await fetchOrderData();
        // پاک کردن انتخاب‌های موقت بعد از ارسال موفق
        setTempSelectedVibrators([]);
        setTempSelectedSubVibrators([]);
        setSubVibrators([]);
        setQuantity(1);

        // آپدیت وضعیت‌ها در UI برای رفرش صفحه
        // اضافه کردن ویبراتورها و زیر ویبراتورها به لیست‌های انتخاب شده
        setSelectedVibrators((prev) => {
          return [...prev, ...newVibrators];
        });

        setSelectedSubVibrators((prev) => {
          return [...prev, ...newSubVibrators];
        });

        // پس از بروزرسانی state، کامپوننت دوباره رندر خواهد شد و UI به‌روزرسانی می‌شود.
      } else {
        setModalMessage("❌ لطفا همه فیلدهارو تکمیل کنید!");
        setIsModalOpen(true); // باز کردن مودال خطا
      }
    } catch (error) {
      console.error("❌ Error Sending Request:", error.response?.data || error);
      setModalMessage(
        error.response?.data?.message || "❌ لطفا همه فیلدهارو تکمیل کنید"
      );
      setIsModalOpen(true); // باز کردن مودال خطا
    }
  };

  // useEffect برای دریافت اطلاعات سفارش

  // useEffect برای دریافت داده‌های ویبراتورهای جدید
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
          "https://amin-beton-back.chbk.app/api/sales-vibrator/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const parentVibrators = data.filter(
          (vibrator) => vibrator.parent === null
        );
        setVibrators(parentVibrators); // Renamed variable from setPumps to setVibrators

        const projectRes = await axios.get(
          `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjectTitle(projectRes.data.title || "بدون عنوان");
      } catch (err) {
        toast.error("❌ خطا در دریافت اطلاعات!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  const fetchSubVibrators = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://amin-beton-back.chbk.app/api/sales-vibrator/${id}/sub-vibrators/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data && data.length > 0) {
        setSubVibrators((prev) => {
          // Changed setSubPumps to setSubVibrators
          const newSubs = data.filter(
            (subVibrator) =>
              !prev.some((existing) => existing.id === subVibrator.id)
          );
          return [...prev, ...newSubs];
        });
      } else {
        setSubVibrators([]); // Make sure you're using setSubVibrators here
      }
    } catch (err) {
      toast.error("❌ خطا در دریافت زیرمجموعه‌های ویبراتور!"); // Updated error message
    }
  };

  const handleSubVibratorSelection = (subVibratorId) => {
    if (quantity < 1) {
      toast.warn("⚠️ لطفاً تعداد معتبر وارد کنید!");
      return;
    }

    const subVibrator = subVibrators.find((sv) => sv.id === subVibratorId);
    if (!subVibrator) return;

    // فقط یک ویبراتور انتخاب می‌شه پس اول اون رو می‌گیریم
    const selectedVibrator = tempSelectedVibrators[0];
    if (!selectedVibrator) {
      toast.warn("⚠️ لطفاً ابتدا یک ویبراتور انتخاب کنید!");
      return;
    }

    const exists = tempSelectedSubVibrators.some(
      (sv) => sv.id === subVibratorId && sv.vibratorId === selectedVibrator.id
    );

    if (exists) {
      // اگه دوباره انتخاب بشه، حذف کن
      setTempSelectedSubVibrators([]);
    } else {
      // قبلی رو حذف کن و فقط این رو بذار
      setTempSelectedSubVibrators([
        {
          ...subVibrator,
          count: quantity,
          vibratorId: selectedVibrator.id,
        },
      ]);
    }
  };

  const handleQuantityChange = (e) => {
    const updatedCount = Number(e.target.value);
    if (!isNaN(updatedCount) && updatedCount >= 1) {
      setQuantity(updatedCount); // بروزرسانی مقدار quantity
    }
  };

  //     return;
  //   }

  //   try {
  //     await axios.delete(
  //       `https://amin-beton-back.chbk.app/api/vibrator-orders/${id}/`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     toast.success("✅ با موفقیت حذف شد!");
  //   } catch (err) {
  //     toast.error("❌ خطا در حذف آیتم!");
  //   }
  // };
  const handleDeleteVibratorOrder = async (vibratorOrderId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.warn("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    try {
      await axios.delete(
        `https://amin-beton-back.chbk.app/api/vibrator-orders/${vibratorOrderId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✔ ویبراتور با موفقیت حذف شد!");
      // حذف از UI
      setSelectedVibrators((prev) =>
        prev.filter((v) => v.id !== vibratorOrderId)
      );
    } catch (error) {
      console.error("❌ خطا در حذف ویبراتور:", error.response?.data || error);
      toast.error("❌ حذف ویبراتور با مشکل مواجه شد!");
    }
  };
  const handleUpdateOrder = async () => {
    // ابتدا اعتبارسنجی قبل از هرچیز

    if (!supervisionSelected) {
      setModalMessage("لطفاً گزینه‌ای برای نظارت و آب‌بندی انتخاب کنید.");
      setIsModalOpen(true);
      return;
    }

    if (supervisionSelected === "yes" && supervisionDescription.trim() === "") {
      setModalMessage("لطفاً توضیحات مربوط به نظارت و آب‌بندی را وارد کنید.");
      setIsModalOpen(true);
      return;
    }

    if (!malepSelected) {
      setModalMessage("لطفاً گزینه‌ای برای ماله پروانه انتخاب کنید.");
      setIsModalOpen(true);
      return;
    }

    if (showVibratorSelection && selectedVibrators.length === 0) {
      setModalMessage("لطفاً حداقل یک ویبراتور انتخاب کنید.");
      setIsModalOpen(true);
      return;
    }

    // بعد از عبور از همه اعتبارسنجی‌ها:
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setModalMessage("⛛ شما احراز هویت نشده‌اید!");
      setIsModalOpen(true);
      return;
    }

    const payload = {
      sealing_implementation: supervisionSelected === "yes" ? "Yes" : "No",
      power_trowel: malepSelected === "yes",
      power_trowel_count: quantity,
      additional_description: supervisionDescription,
    };

    try {
      const response = await axios.patch(
        `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setModalMessage("سفارش با موفقیت به‌روزرسانی شد");
      setIsModalOpen(true);

      // setTimeout(() => {
      //   navigate(`/FormPage/${orderId}`);
      // }, 1500); // 1.5 ثانیه برای نمایش پیام موفقیت
    } catch (error) {
      console.error("Error updating order:", error);
      setModalMessage("در به‌روزرسانی سفارش خطایی رخ داده است.");
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    console.log("تأیید مودال کلیک شد");
    setIsModalOpen(false); // اگر لازم باشه مودال رو ببندی
    navigate(`/FormPage/${orderId}`); // هدایت به صفحه بعد
  };

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
      <div className="container w-full max-w-5xl p-8 bg-gray-800 rounded-xl">
        {/* <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
          خرید برای <br /> {projectTitle}
        </h1> */}
        {/* Form Fields for Sealing Implementation (اجرا و نظارت آب‌بندی) */}
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-lg font-bold">اجرا و نظارت آب‌بندی</h2>
          <div className="flex gap-4">
            <Button
              className={`rounded-full w-16 h-16 flex items-center justify-center text-sm transition-all duration-200 ${
                supervisionSelected === "yes"
                  ? "bg-School-Bus text-black"
                  : "border border-white text-white"
              }`}
              variant={supervisionSelected === "yes" ? "default" : "outline"}
              onClick={() => setSupervisionSelected("yes")}
            >
              بله
            </Button>
            <Button
              className={`rounded-full w-16 h-16 flex items-center justify-center text-sm transition-all duration-200 ${
                supervisionSelected === "no"
                  ? "bg-School-Bus text-black"
                  : "border border-white text-white"
              }`}
              variant={supervisionSelected === "no" ? "default" : "outline"}
              onClick={() => setSupervisionSelected("no")}
            >
              خیر
            </Button>
          </div>

          {supervisionSelected === "yes" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="supervisionDescription">توضیحات:</label>
              <textarea
                id="supervisionDescription"
                className="w-full p-2 text-black border rounded-md"
                rows={4}
                placeholder="توضیحات مربوط به اجرا و نظارت آب‌بندی را وارد کنید..."
                value={supervisionDescription}
                onChange={(e) => setSupervisionDescription(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Form Fields for Power Trowel (ماله پروانه) */}
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-lg font-bold">ماله پروانه</h2>
          <div className="flex gap-4">
            <Button
              className={`rounded-full w-16 h-16 flex items-center justify-center text-sm transition-all duration-200 ${
                malepSelected === "yes"
                  ? "bg-School-Bus text-black"
                  : "border border-white text-white"
              }`}
              variant="ghost"
              onClick={() => setMalepSelected("yes")}
            >
              بله
            </Button>
            <Button
              className={`rounded-full w-16 h-16 flex items-center justify-center text-sm transition-all duration-200 ${
                malepSelected === "no"
                  ? "bg-School-Bus text-black"
                  : "border border-white text-white"
              }`}
              variant="ghost"
              onClick={() => setMalepSelected("no")}
            >
              خیر
            </Button>
          </div>
        </div>

        {/* Submit Button to Update Order */}
        {/* <div className="flex justify-center mb-8">
          <Button className="px-10">به روز رسانی سفارش</Button>
        </div> */}

        <div className="flex flex-col justify-start gap-4 mb-8">
          <p className="text-lg">ایا میخواهید ویبراتور انتخاب کنید؟</p>

          <div className="flex gap-4">
            <Button
              className="flex items-center justify-center w-16 h-16 text-sm transition-all duration-200 rounded-full"
              onClick={() => setShowVibratorSelection(true)}
            >
              بله
            </Button>
            <Button
              className="flex items-center justify-center w-16 h-16 text-sm transition-all duration-200 rounded-full"
              onClick={() => setShowVibratorSelection(false)}
            >
              خیر
            </Button>
          </div>
        </div>
        {/* انتخاب نوع ویبراتور وقتی showVibratorSelection فعال شد */}
        {showVibratorSelection && (
          <div className="mb-8">
            <h2 className="pb-2 mb-4 text-xl font-extrabold border-b border-gray-700">
              🛠️ نوع ویبراتور
            </h2>
            <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8">
              {vibrators.map((vibrator) => {
                const isSelected = tempSelectedVibrators.some(
                  (v) => v.id === vibrator.id
                );

                return (
                  <div
                    key={vibrator.id}
                    className={`flex flex-col gap-2 items-center justify-center text-center w-40 border ${
                      isSelected ? "border-School-Bus" : "border-white"
                    } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                    onClick={() => handleVibratorSelection(vibrator.id)}
                  >
                    <div
                      className={`w-4 h-4 mb-2 rounded-full ${
                        isSelected ? "bg-School-Bus" : "bg-white"
                      }`}
                    ></div>
                    <div className="mb-1 text-sm">{vibrator.title}</div>
                  </div>
                );
              })}
            </div>

            {tempSelectedVibrators.length > 0 && subVibrators.length > 0 && (
              <div className="mb-10">
                <h3 className="pb-2 mb-4 text-lg font-bold border-b border-gray-700">
                  🔧 زیرمجموعه‌های ویبراتور
                </h3>
                <div className="flex flex-row flex-wrap gap-6 mt-4">
                  {subVibrators.map((subVibrator) => {
                    const isSelected = tempSelectedSubVibrators.some(
                      (sv) => sv.id === subVibrator.id
                    );

                    return (
                      <div
                        key={subVibrator.id}
                        className={`flex flex-col gap-2 items-center justify-center text-center w-40 border ${
                          isSelected ? "border-School-Bus" : "border-white"
                        } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                        onClick={() =>
                          handleSubVibratorSelection(subVibrator.id)
                        }
                      >
                        <div
                          className={`w-4 h-4 mb-2 rounded-full ${
                            isSelected ? "bg-School-Bus" : "bg-white"
                          }`}
                        ></div>
                        <div className="mb-1 text-sm">{subVibrator.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* فیلد تعداد */}
            {tempSelectedVibrators.some((vibrator) => vibrator.countable) && (
              <div className="flex items-center gap-2">
                <label htmlFor="totalQty"> 📦 تعداد ویبراتور ها:</label>
                <input
                  id="totalQty"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 p-2 text-black border rounded-md border-School-Bus focus:outline-none"
                />
              </div>
            )}
            {/* دکمه افزودن ویبراتور */}
            <div className="flex justify-center gap-6 px-10 mt-10">
              <Button
                className="px-10 py-2 text-white shadow-md rounded-xl"
                onClick={handleAddAndSubmit}
              >
                افزودن ویبراتور
              </Button>
            </div>
          </div>
        )}
        {/* نمایش انتخاب‌های کاربر */}
        <div className="mb-8">
          <h3 className="pb-2 mb-4 text-lg font-bold border-b border-gray-700">
            ✅ ویبراتورهای ثبت‌شده برای این سفارش
          </h3>
          <div className="flex flex-row flex-wrap gap-6 mt-4">
            {selectedVibrators.map((vibrator) => {
              if (!vibrator.vibrator || !vibrator.vibrator.title) {
                return null;
              }

              // پیدا کردن زیرویبراتورهای مربوط به هر ویبراتور
              const subVibratorsForThis = vibrator.sub_vibrator
                ? [vibrator.sub_vibrator]
                : [];

              return (
                <div
                  key={vibrator.id}
                  className="flex flex-col items-center justify-center w-40 gap-2 px-4 py-4 text-center border rounded-lg border-School-Bus"
                >
                  <div className="w-4 h-4 mb-2 rounded-full bg-School-Bus"></div>
                  <div className="mb-1 font-semibold">
                    {vibrator.vibrator?.title || "ویبراتور نامشخص"}
                  </div>
                  <div className="text-sm">
                    تعداد ویبراتور: {vibrator.count}
                  </div>
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
                    className="mt-2 text-sm border-none text-red hover:underline"
                    onClick={() => handleDeleteVibratorOrder(vibrator.id)}
                  >
                    حذف
                  </button>
                </div>
              );
            })}
          </div>

          <Button
            className="py-2 mt-10 text-white shadow-md px-14 rounded-xl"
            onClick={async () => {
              const result = await handleUpdateOrder(); // فقط اگر نتیجه موفق بود ادامه بده
              if (result === true) {
                handleModalConfirm(); // این تابع هم navigate میکنه
              }
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

        {showVibratorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 text-black bg-white rounded-lg w-96">
              <h2 className="mb-4 text-lg font-bold text-center">
                آیا می‌خواهید ویبراتور اضافه کنید؟
              </h2>
              <div className="flex justify-center gap-4">
                <Button
                  className="px-2"
                  onClick={() => {
                    setShowVibratorSelection(true); // بخش انتخاب ویبراتور باز شه
                    setShowVibratorModal(false); // مودال بسته شه
                  }}
                >
                  بله
                </Button>
                <Button
                  className="px-2"
                  variant="outline"
                  onClick={() => setShowVibratorModal(false)} // فقط مودال ببند
                >
                  خیر
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        // onClick={handleModalConfirm}
      />
    </div>
  );
};

export default VibratorPage;
