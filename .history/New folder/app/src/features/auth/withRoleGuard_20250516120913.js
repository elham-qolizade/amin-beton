import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withRoleGuard = (Component, allowedRoles) => {
  return function GuardedComponent(props) {
    const navigate = useNavigate();
    const storedRoles = localStorage.getItem("roles");
    const roles = storedRoles ? JSON.parse(storedRoles) : [];

    const isAllowed =
      roles.includes("Super User") || roles.some((r) => allowedRoles.includes(r));

    useEffect(() => {
      if (!isAllowed) {
        navigate("/no-access");
      }
    }, [isAllowed]);

    return isAllowed ? <Component {...props} /> : null;
  };
};

export default withRoleGuard;
