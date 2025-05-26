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
      try {
        const response = await fetch({
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userRoles = data.roles || [];

          // بررسی دسترسی‌ها برای نمایش پنل‌ها
          if (userRoles.includes("Super User")) {
            setAccess(["financial", "sales", "execution", "lab"]); // دسترسی کامل
          } else if (userRoles.includes("Execution")) {
            setAccess(["execution"]); // فقط پنل اجرا
          } else if (userRoles.length === 0) {
            alert("شما دسترسی ورود به هیچ پنلی را ندارید");
            navigate("/admin-login"); // هدایت به صفحه لاگین در صورت عدم دسترسی
          } else {
            setAccess(userRoles); // دسترسی‌های معمولی طبق نقش‌ها
          }
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.error(error);
        navigate("/admin-login"); // در صورت بروز خطا، هدایت به صفحه لاگین
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
