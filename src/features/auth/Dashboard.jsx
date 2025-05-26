import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [access, setAccess] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login"); // اگر کاربر لاگین نکرده باشد، هدایت به صفحه لاگین
      return;
    }

    // ارسال درخواست به API برای دریافت اطلاعات کاربر
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/admin-login");
        return;
      }

      try {
        const res = await fetch("https://amin-beton-back.chbk.app/api/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await res.text(); // دریافت متن خام

        console.log("RAW RESPONSE:", text);

        const data = JSON.parse(text); // تلاش برای تبدیل به JSON
        const roles = data.roles || [];
        localStorage.setItem("roles", JSON.stringify(roles));
        setAccess(getAccessRights(roles));
      } catch (err) {
        console.error("fetchUserData error:", err);
        navigate("/admin-login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">داشبورد</h1>

      <div>
        {access.includes("financial") && (
          <div className="p-4 mb-4 bg-red-600 rounded">پنل مالی</div>
        )}
        {access.includes("sales") && (
          <div className="p-4 mb-4 bg-blue-700 rounded">پنل فروش</div>
        )}
        {access.includes("execution") && (
          <div className="p-4 mb-4 bg-orange-700 rounded">پنل اجرا</div>
        )}
        {access.includes("lab") && (
          <div className="p-4 mb-4 bg-purple-700 rounded">پنل آزمایشگاه</div>
        )}
      </div>

      {access.length === 0 && (
        <div className="text-red-500 mt-4">
          شما دسترسی ورود به هیچ پنلی را ندارید
        </div>
      )}
    </div>
  );
};

export default Dashboard;
