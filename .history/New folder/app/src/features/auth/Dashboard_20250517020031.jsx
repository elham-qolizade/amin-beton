import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";
import { useNavigate, Outlet } from "react-router-dom";

export default function Dashboard() {
  const [allowedPanels, setAllowedPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panels, setPanels] = useState([]);
  const navigate = useNavigate();

  const ALL_PANELS = [
    { name: "پنل مالی", role: "Financial", path: "/dashboard/financial-panel" },
    { name: "پنل فروش", role: "Sales", path: "/dashboard/sale-panel" },
    { name: "پنل اجرا", role: "Execution", path: "/dashboard/execution-panel" },
    { name: "پنل آزمایشگاه", role: "Lab", path: "/dashboard/lab-panel" },
  ];

  useEffect(() => {
    async function fetchAndFilter() {
      try {
        const user = await getCurrentUser();
        const roles = user.roles || [];
        const isSuperUser = roles.includes("Super User");
        const filtered = isSuperUser
          ? ALL_PANELS
          : ALL_PANELS.filter((panel) => roles.includes(panel.role));
        setAllowedPanels(filtered);
      } catch (err) {
        console.error("خطا در دریافت نقش‌ها:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAndFilter();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">
          در حال بارگذاری...
        </p>
      </div>
    );

  return (
    <div className="p-8  mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        داشبورد
      </h1>
      <div className="flex justify-center  items-center">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {allowedPanels.map((panel) => (
            <li
              key={panel.role}
              onClick={() => navigate(panel.path)}
              className="cursor-pointer w-28 bg-blue-100 hover:bg-blue-200 rounded-xl shadow transition-all duration-300 text-center text-lg font-medium"
            >
              {panel.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
