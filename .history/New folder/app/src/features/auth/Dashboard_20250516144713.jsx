import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";

export default function Dashboard() {
  const [allowedPanels, setAllowedPanels] = useState([]);
  const [loading, setLoading] = useState(true);

  const ALL_PANELS = [
    { name: "پنل مالی", role: "Financial", path: "financial-panel" },
    { name: "پنل فروش", role: "Sales", path: "financial-panel" },
    { name: "پنل اجرا", role: "Execution", path: "financial-panel" },
    { name: "پنل آزمایشگاه", role: "Lab", path: "financial-panel" },
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

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      <h1>داشبورد</h1>
      <ul>
        {allowedPanels.map((panel) => (
          <li key={panel.role}>{panel.name}</li>
        ))}
      </ul>
    </div>
  );
}
