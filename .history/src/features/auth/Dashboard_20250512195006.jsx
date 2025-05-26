import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessRights } from "../../utils/access"; // این تابع رو باید توی utils بنویسی (در ادامه توضیح میدم)

const Dashboard = () => {
  const [access, setAccess] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login"); // اگه کاربر لاگین نکرده باشه، میفرستیمش به صفحه لاگین
      return;
    }

    // دریافت نقش‌ها از localStorage
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    setAccess(getAccessRights(roles));
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">داشبورد</h1>

      <div>
        {access.canAccessFinancial && (
          <div className="p-4 mb-4 bg-red rounded">پنل مالی</div>
        )}
        {access.canAccessSales && (
          <div className="p-4 mb-4 bg-blue-700 rounded">پنل فروش</div>
        )}
        {access.canAccessExecution && (
          <div className="p-4 mb-4 bg-orange-700 rounded">پنل اجرا</div>
        )}
        {access.canAccessLab && (
          <div className="p-4 mb-4 bg-purple-700 rounded">پنل آزمایشگاه</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
