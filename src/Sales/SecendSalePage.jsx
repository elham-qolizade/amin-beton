import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../ui/Button";
import { Formik, Form, Field } from "formik";
import Input from "../ui/Input";

const SecendSalePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [pumps, setPumps] = useState([]);
  const [subPumps, setSubPumps] = useState([]);
  const [vibrators, setVibrators] = useState([]);
  const [subVibrators, setSubVibrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPump, setSelectedPump] = useState(null);
  const [selectedSubPumps, setSelectedSubPumps] = useState([]);
  const [selectedVibrator, setSelectedVibrator] = useState(null);
  const [selectedSubVibrators, setSelectedSubVibrators] = useState([]);

  useEffect(() => {
    console.log("✅ orderId:", orderId);

    if (!orderId) {
      setError("⛔ شناسه سفارش وجود ندارد!");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("⛔ شما احراز هویت نشده‌اید!");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales-pump/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const parentPumps = data.filter((pump) => pump.parent === null);
        setPumps(parentPumps);

        const vibratorData = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales-vibrator/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVibrators(vibratorData.data);
      } catch (err) {
        setError("❌ خطا در دریافت اطلاعات!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  const fetchSubPumps = async (id) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://amin-beton-back.chbk.app/api/sales-pump/${id}/sub-pumps/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubPumps(data);
    } catch (err) {
      console.error("❌ خطا در دریافت زیرمجموعه‌های پمپ!", err);
      alert("❌ خطا در دریافت زیرمجموعه‌های پمپ!");
    }
  };

  const fetchSubVibrators = async (id) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://amin-beton-back.chbk.app/api/sales-vibrator/${id}/sub_vibrators/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("✅ SubVibrators Data:", data);
      setSubVibrators(data);
    } catch (err) {
      console.error("❌ خطا در دریافت زیرمجموعه‌های ویبراتور!", err);
      alert("❌ خطا در دریافت زیرمجموعه‌های ویبراتور!");
    }
  };

  const handlePumpSelection = (id) => {
    setSelectedPump(id);
    fetchSubPumps(id);
  };

  const handleVibratorSelection = (id) => {
    setSelectedVibrator(id);
    fetchSubVibrators(id);
  };

  const handleSubPumpSelection = (subPumpId) => {
    if (!selectedSubPumps.find((item) => item.id === subPumpId)) {
      setSelectedSubPumps([...selectedSubPumps, { id: subPumpId }]);
    } else {
      setSelectedSubPumps(
        selectedSubPumps.filter((item) => item.id !== subPumpId)
      );
    }
  };

  const handleSubVibratorSelection = (subVibratorId) => {
    if (!selectedSubVibrators.find((item) => item.id === subVibratorId)) {
      setSelectedSubVibrators([...selectedSubVibrators, { id: subVibratorId }]);
    } else {
      setSelectedSubVibrators(
        selectedSubVibrators.filter((item) => item.id !== subVibratorId)
      );
    }
  };

  const handleSubmitOrder = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    console.log("📝 orderId:", orderId);
    console.log("📝 selectedSubPumps:", selectedSubPumps);
    console.log("📝 selectedSubVibrators:", selectedSubVibrators);

    const pumpPayload = selectedSubPumps.map((subPump) => ({
      order: orderId,
      pump: subPump.id,
    }));

    const vibratorPayload = selectedSubVibrators.map((subVibrator) => ({
      order: orderId,
      vibrator: subVibrator.id,
    }));

    console.log("📦 pumpPayload:", pumpPayload);
    console.log("📦 vibratorPayload:", vibratorPayload);

    try {
      if (pumpPayload.length > 0) {
        const pumpResponse = await axios.post(
          "https://amin-beton-back.chbk.app/api/orders/add-pump-order/",
          pumpPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("✅ pumpResponse:", pumpResponse.data);
      }

      if (vibratorPayload.length > 0) {
        const vibratorResponse = await axios.post(
          "https://amin-beton-back.chbk.app/api/orders/add-vibrator-order/",
          vibratorPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("✅ vibratorResponse:", vibratorResponse.data);
      }

      // پاک کردن انتخاب‌ها
      setSelectedSubPumps([]);
      setSelectedSubVibrators([]);
      alert("✅ سفارش با موفقیت ثبت شد!");
    } catch (err) {
      console.error("❌ خطا در افزودن پمپ یا ویبراتور به سفارش!", err);
      alert("❌ خطا در افزودن پمپ یا ویبراتور به سفارش!");
    }
  };

  if (loading) return <p>⏳ در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
      <div className="container w-full max-w-5xl p-8 bg-gray-800 rounded-xl">
        <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
          خرید برای پروژه "نام پروژه"
        </h1>

        <div className="mb-8">
          <h2 className="text-lg font-bold">پمپ</h2>
          <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8">
            {pumps.map((pump) => (
              <div
                key={pump.id}
                className={`flex gap-2 flex-row-reverse items-center justify-center text-center w-40 border ${
                  selectedPump === pump.id
                    ? "border-School-Bus"
                    : "border-white"
                } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                onClick={() => handlePumpSelection(pump.id)}
              >
                <div
                  className={`w-4 h-4 mb-10 mr-10 rounded-full ${
                    selectedPump === pump.id ? "bg-School-Bus" : "bg-white"
                  }`}
                ></div>
                {pump.title}
              </div>
            ))}
          </div>
        </div>

        {subPumps.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">زیرمجموعه‌های پمپ انتخاب شده:</h3>
            <ul className="ml-6 list-disc">
              {subPumps.map((subPump) => (
                <li
                  key={subPump.id}
                  className={`mt-2 cursor-pointer transition-colors duration-200 ${
                    selectedSubPumps.some((item) => item.id === subPump.id)
                      ? "text-School-Bus"
                      : "hover:text-School-Bus"
                  }`}
                  onClick={() => handleSubPumpSelection(subPump.id)}
                >
                  {subPump.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {vibrators.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold">ویبراتور</h2>
            <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8">
              {vibrators.map((vibrator) => (
                <div
                  key={vibrator.id}
                  className={`flex gap-2 flex-row-reverse items-center justify-center text-center w-40 border ${
                    selectedVibrator === vibrator.id
                      ? "border-School-Bus"
                      : "border-white"
                  } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                  onClick={() => handleVibratorSelection(vibrator.id)}
                >
                  <div
                    className={`w-4 h-4 mb-10 mr-10 rounded-full ${
                      selectedVibrator === vibrator.id
                        ? "bg-School-Bus"
                        : "bg-white"
                    }`}
                  ></div>
                  {vibrator.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedVibrator && subVibrators.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">
              زیرمجموعه‌های ویبراتور انتخاب شده:
            </h3>
            <div className="flex flex-wrap gap-6">
              {subVibrators.map((subVibrator) => (
                <div
                  key={subVibrator.id}
                  className={`flex gap-2 flex-row-reverse items-center justify-center text-center w-40 border ${
                    selectedSubVibrators.some(
                      (item) => item.id === subVibrator.id
                    )
                      ? "border-School-Bus"
                      : "border-white"
                  } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                  onClick={() => handleSubVibratorSelection(subVibrator.id)}
                >
                  <div
                    className={`w-4 h-4 mb-10 mr-10 rounded-full ${
                      selectedSubVibrators.some(
                        (item) => item.id === subVibrator.id
                      )
                        ? "bg-School-Bus"
                        : "bg-white"
                    }`}
                  ></div>
                  {subVibrator.title}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Button onClick={handleSubmitOrder}>
            ✅ ثبت سفارش با{" "}
            {selectedSubPumps.length + selectedSubVibrators.length} آیتم
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecendSalePage;
