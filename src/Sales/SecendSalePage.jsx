import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../ui/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const SecendSalePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get("projectId");
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
  const [projectData, setProjectData] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("⛛ شما احراز هویت نشده‌اید!");
        setLoading(false);
        return;
      }

      try {
        // درخواست اطلاعات پمپ‌ها

        const parentPumps = data.filter((pump) => pump.parent === null);
        setPumps(parentPumps);

        // درخواست اطلاعات ویبراتورها
        const vibratorData = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales-vibrator/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVibrators(vibratorData.data);

        // درخواست اطلاعات پروژه با استفاده از orderId
        const projectResponse = await axios.get(
          `https://amin-beton-back.chbk.app/api/projects/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProjectData(projectResponse.data);
        console.log("Project data:", projectResponse.data); // مشاهده داده‌های پروژه
      } catch (err) {
        toast.error("❌ خطا در دریافت اطلاعات!");
        console.error(err); // نمایش خطا در کنسول
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  //   const token = localStorage.getItem("accessToken");

  //   if (!token) {
  //     toast.error("⛛ شما احراز هویت نشده‌اید!");
  //     return;
  //   }

  //   try {
  //     const { data } = await axios.get(
  //       `https://amin-beton-back.chbk.app/api/sales-pump/${id}/sub-pumps/`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setSubPumps(data);
  //   } catch (err) {
  //     toast.error("❌ خطا در دریافت زیرمجموعه‌های پمپ!");
  //   }
  // };

  const fetchSubVibrators = async (id) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://amin-beton-back.chbk.app/api/sales-vibrator/${id}/sub-vibrators/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubVibrators(data);
    } catch (err) {
      toast.error("❌ خطا در دریافت زیرمجموعه‌های ویبراتور!");
    }
  };

  const handlePumpSelection = (id) => {
    setSelectedPump(id);
    fetchSubPumps(id);
  };

  const handleVibratorSelection = async (id) => {
    setSelectedVibrator(id);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    try {
      const { data } = await axios.get(
        `https://amin-beton-back.chbk.app/api/sales-vibrator/${id}/sub-vibrators/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.length > 0) {
        setSubVibrators(data); // اگر زیرمجموعه‌ها موجود بودند
      } else {
        setSubVibrators(null); // اگر زیرمجموعه‌ای نبود
      }
    } catch (err) {
      toast.error("❌ خطا در دریافت زیرمجموعه‌های ویبراتور!");
    }
  };

  {
    /* زیرمجموعه‌های ویبراتور */
  }
  {
    selectedVibrator && subVibrators !== null && subVibrators.length > 0 && (
      <div className="mb-8">
        <h3 className="text-lg font-bold">زیرمجموعه‌های ویبراتور</h3>
        <div className="flex flex-row flex-wrap gap-6 mt-4">
          {subVibrators.map((subVibrator) => (
            <div
              key={subVibrator.id}
              className={`flex gap-2 flex-row-reverse items-center justify-center text-center w-40 border ${
                selectedSubVibrators.some((item) => item.id === subVibrator.id)
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
    );
  }

  {
    /* در صورتی که هیچ زیرمجموعه‌ای وجود نداشته باشد */
  }
  {
    selectedVibrator && subVibrators === null && (
      <div className="mb-8">
        <p>هیچ زیرمجموعه‌ای برای این ویبراتور موجود نیست.</p>
      </div>
    );
  }

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
      toast.warn("⛛ شما احراز هویت نشده‌اید!");
      return;
    }

    const pumpPayload = selectedSubPumps.map((subPump) => ({
      order: orderId,
      pump: subPump.id,
    }));

    const vibratorPayload = selectedSubVibrators.map((subVibrator) => ({
      order: orderId,
      vibrator: subVibrator.id,
    }));

    try {
      if (pumpPayload.length > 0) {
        await axios.post(
          "https://amin-beton-back.chbk.app/api/orders/add-pump-order/",
          pumpPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (vibratorPayload.length > 0) {
        await axios.post(
          "https://amin-beton-back.chbk.app/api/orders/add-vibrator-order/",
          vibratorPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // پاک کردن انتخاب‌ها
      setSelectedSubPumps([]);
      setSelectedSubVibrators([]);
      toast.success("✅ سفارش با موفقیت ثبت شد!");
    } catch (err) {
      toast.error("❌ خطا در افزودن پمپ یا ویبراتور به سفارش!");
    }
  };

  if (loading) return <p>⏳ در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
      <div className="container w-full max-w-5xl p-8 bg-gray-800 rounded-xl">
        <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
          خرید برای پروژه شماره : {orderId}
        </h1>

        {/* لیست پمپ‌ها */}
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

          {/* زیرمجموعه‌های پمپ */}
          {selectedPump && subPumps.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold">زیرمجموعه‌های پمپ</h3>
              <div className="flex flex-row flex-wrap gap-6 mt-4">
                {subPumps.map((subPump) => (
                  <div
                    key={subPump.id}
                    className={`flex gap-2 flex-row-reverse items-center justify-center text-center w-40 border ${
                      selectedSubPumps.some((item) => item.id === subPump.id)
                        ? "border-School-Bus"
                        : "border-white"
                    } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                    onClick={() => handleSubPumpSelection(subPump.id)}
                  >
                    <div
                      className={`w-4 h-4 mb-10 mr-10 rounded-full ${
                        selectedSubPumps.some((item) => item.id === subPump.id)
                          ? "bg-School-Bus"
                          : "bg-white"
                      }`}
                    ></div>
                    {subPump.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* لیست ویبراتورها */}
        <div className="mb-8">
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

          {/* زیرمجموعه‌های ویبراتور */}
          {selectedVibrator && subVibrators.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold">زیرمجموعه‌های ویبراتور</h3>
              <div className="flex flex-row flex-wrap gap-6 mt-4">
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
        </div>

        <div className="flex justify-center mt-10">
          <Button className="p-10" onClick={handleSubmitOrder}>
            ثبت سفارش با {selectedSubPumps.length + selectedSubVibrators.length}{" "}
            آیتم
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecendSalePage;
