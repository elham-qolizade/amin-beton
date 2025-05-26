// utils/access.js
export const getAccessRights = (roles) => {
    const isSuperUser = roles.includes("Super User");
    
    return {
      canAccessFinancial: isSuperUser || roles.includes("Financial"),
      canAccessSales: isSuperUser || roles.includes("Sales"),
      canAccessExecution: isSuperUser || roles.includes("Execution"),
      canAccessLab: isSuperUser || roles.includes("Lab"),
    };
  };
  