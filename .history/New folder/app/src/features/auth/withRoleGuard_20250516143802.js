import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/services/apiAuth";

function WithRoleGuard({ allowed, children }) {
  const [hasAccess, setHasAccess] = useState(null);

  useEffect(() => {
    async function checkRoles() {
      try {
        const user = await getCurrentUser();
        const roles = user.roles || [];
        setHasAccess(roles.includes("Super User") || roles.some(r => allowed.includes(r)));
      } catch {
        setHasAccess(false);
      }
    }

    checkRoles();
  }, [allowed]);

  if (hasAccess === null) return <p>در حال بررسی دسترسی...</p>;
  if (!hasAccess) return <Navigate to="/unauthorized" replace />;

  return children;
}

export default WithRoleGuard;
