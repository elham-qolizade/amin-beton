import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
const YourComponent = () => {
  const [pumps, setPumps] = useState([]); // برای ذخیره پمپ‌ها
  const [projectTitle, setProjectTitle] = useState(""); // برای ذخیره عنوان پروژه
  const [loading, setLoading] = useState(true); // برای وضعیت بارگذاری
  const { orderId } = useParams();
  const uniquePumps = [
    ...new Map(pumps.map((item) => [item.pump.id, item])).values(),
  ];
  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");

        const orderRes = await axios.get(
          `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const orderData = orderRes.data;

        setProjectTitle(orderData.title || "بدون عنوان");
        setPumps(orderData.pumps || []); // ✅ پمپ‌ها از همون ریسپانس
        console.log("پمپ‌ها دریافت شده:", orderData.pumps);
      } catch (err) {
        toast.error("❌ خطا در دریافت اطلاعات سفارش یا پمپ‌ها!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div>
      <h1>{projectTitle}</h1>
      <h2>لیست پمپ‌ها:</h2>
      <ul>
        <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8">
          {uniquePumps.map((pump) => {
            // بررسی عنوان پمپ
            const isSelected = tempSelectedPumps.some((p) => p.id === pump.id); // توجه کنید که باید از pump.pump.id استفاده کنید

            return (
              <div
                key={pump.id} // استفاده از pump.pump.id
                className={`flex flex-col gap-2 items-center justify-center text-center w-40 border ${
                  isSelected ? "border-School-Bus" : "border-white"
                } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                onClick={() => handlePumpSelection(pump.id)} // استفاده از pump.pump.id برای انتخاب پمپ
              >
                <div
                  className={`w-4 h-4 mb-2 rounded-full ${
                    isSelected ? "bg-School-Bus" : "bg-white"
                  }`}
                ></div>
                <div className="mb-2">{pump.pump.title}</div>{" "}
                {/* استفاده از pump.pump.title برای نمایش عنوان */}
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default YourComponent;
