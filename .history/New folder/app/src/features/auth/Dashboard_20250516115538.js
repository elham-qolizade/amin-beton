// src/pages/Dashboard.js
import { Link } from "react-router-dom";

const PANELS = [
  { name: "Financial", path: "/financial-panel" },
  { name: "Sales", path: "/sale-panel" },
  { name: "Execution", path: "/execution-panel" },
  { name: "Lab", path: "/lab-panel" },
];

const hasAccess = (roles, panelName) => {
  return roles.includes("Super User") || roles.includes(panelName);
};

export default function Dashboard() {
  const roles = JSON.parse(localStorage.getItem("roles")) || [];

  const accessiblePanels = PANELS.filter(panel =>
    hasAccess(roles, panel.name)
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>پنل‌های در دسترس شما</h2>

      {roles.length === 0 || accessiblePanels.length === 0 ? (
        <p style={{ color: "red" }}>شما به هیچ پنلی دسترسی ندارید.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {accessiblePanels.map(panel => (
            <li key={panel.name} style={{ marginBottom: "1rem" }}>
              <Link to={panel.path}>
                <button style={{ padding: "0.5rem 1rem" }}>
                  ورود به پنل {panel.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
