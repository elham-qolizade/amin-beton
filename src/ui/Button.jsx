import React from "react";

const Button = ({ onClick, children, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 bg-Bokara-Grey text-Looking-Glass border border-l-Looking-Glass hover:border-School-Bus hover:text-School-Bus focus:outline-none focus:ring-2 focus:ring-School-Bus ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
