import { Link } from "react-router-dom";

const rolesList = ["Super User", "Financial", "Sales", "Execution", "Lab"];
const panels = [
  { name: "Financial", path: "/financial" },
  { name: "Sales", path: "/sales" },
  { name: "Execution", path: "/execution" },
  { name: "Lab", path: "/lab" },
];

const hasAccess = (userRoles, panelName) => {
  if (userRoles.includes("Super User")) return true;
  return userRoles.includes(panelName);
};

export default function UserPanel() {
  const userRoles = JSON.parse(localStorage.getItem("roles")) || [];

  return (
    <div>
      <h2>پنل‌های قابل دسترسی شما:</h2>
      <ul>
        {panels.map((panel) =>
          hasAccess(userRoles, panel.name) ? (
            <li key={panel.name}>
              <Link to={panel.path}>{panel.name}</Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
