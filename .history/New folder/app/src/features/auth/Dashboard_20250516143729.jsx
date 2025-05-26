import { Link } from "react-router-dom";

const PANELS = [
  { name: "Financial", path: "/financial-panel" },
  { name: "Sales", path: "/sale-panel" },
  { name: "Execution", path: "/execution-panel" },
  { name: "Lab", path: "/lab-panel" },
];

const hasAccess = (roles, panelName) => {
  const normalizedRoles = roles.map((r) => r.toLowerCase().trim());
  return (
    normalizedRoles.includes("super user") ||
    normalizedRoles.includes(panelName.toLowerCase())
  );
};

export default function Dashboard() {
  let roles = [];
  try {
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      roles = JSON.parse(storedRoles);
      if (!Array.isArray(roles)) roles = [];
    }
  } catch {
    roles = [];
  }

  const accessiblePanels = PANELS.filter((panel) =>
    hasAccess(roles, panel.name)
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>پنل‌های در دسترس شما</h2>

      {roles.length === 0 || accessiblePanels.length === 0 ? (
        <p style={{ color: "red" }}>شما به هیچ پنلی دسترسی ندارید.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {accessiblePanels.map((panel) => (
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
