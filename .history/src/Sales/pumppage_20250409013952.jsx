import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
const YourComponent = ({ orderId }) => {
  const [pumps, setPumps] = useState([]); // برای ذخیره پمپ‌ها
  const [projectTitle, setProjectTitle] = useState(""); // برای ذخیره عنوان پروژه
  const [loading, setLoading] = useState(true); // برای وضعیت بارگذاری
  const { orderId } = useParams();

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
        {pumps.map((pump) => (
          <li key={pump.id}>{pump.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
