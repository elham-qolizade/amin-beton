import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function withRoleGuard(Component, allowedRoles = []) {
  return function GuardedComponent(props) {
    const navigate = useNavigate();
    let roles = [];

    try {
      const storedRoles = localStorage.getItem("roles");
      roles = storedRoles ? JSON.parse(storedRoles) : [];
    } catch {
      roles = [];
    }

    useEffect(() => {
      const normalizedRoles = roles.map(r => r.toLowerCase());
      const hasAccess =
        normalizedRoles.includes("super user") ||
        allowedRoles.some(r => normalizedRoles.includes(r.toLowerCase()));

      if (!hasAccess) {
        navigate("/no-access", { replace: true });
      }
    }, [roles, navigate]);

    return <Component {...props} />;
  };
}

export default withRoleGuard;
