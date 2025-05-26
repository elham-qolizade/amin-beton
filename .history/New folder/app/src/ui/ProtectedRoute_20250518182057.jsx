// components/RoleProtectedRoute.jsx
import { Navigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext"; // فرض بر اینکه auth context داری
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/apiAuth"; // اگر context نداری

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // اگه از context استفاده نمی‌کنی:
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getCurrentUser();
        setUser(res);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;

  if (!user) return <Navigate to="/login-admin" replace />;

  const hasAccess =
    user.roles.includes("Super User") || // سوپر یوزر همه جا می‌تونه بره
    allowedRoles.some((role) => user.roles.includes(role));

  if (!hasAccess) return <Navigate to="/unauthorized" replace />;

  return children;
}
