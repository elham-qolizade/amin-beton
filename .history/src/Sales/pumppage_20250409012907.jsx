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
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("⛛ شما احراز هویت نشده‌اید!");
        setLoading(false);
        return;
      }

      try {
        // دریافت لیست پمپ‌ها
        const { data } = await axios.get(
          "https://amin-beton-back.chbk.app/api/sales-pump/", // فرض کنید این آدرس برای پمپ‌هاست
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const parentPumps = data.filter((pump) => pump.parent === null);
        setPumps(parentPumps); // ذخیره پمپ‌ها

        // دریافت اطلاعات پروژه
        const projectRes = await axios.get(
          `https://amin-beton-back.chbk.app/api/orders/${orderId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjectTitle(projectRes.data.title || "بدون عنوان"); // ذخیره عنوان پروژه
      } catch (err) {
        toast.error("❌ خطا در دریافت اطلاعات!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
