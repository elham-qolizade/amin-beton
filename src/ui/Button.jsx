import React from "react";

const Button = ({ onClick, children, className, type = "button" }) => {
  return (
    <button
      type={type} // نوع دکمه را از prop می‌گیریم (پیش‌فرض "button" است)
      onClick={onClick}
      className={`py-2 bg-Bokara-Grey text-Looking-Glass border border-l-Looking-Glass hover:bg-School-Bus focus:outline-none focus:ring-2 focus:ring-School-Bus ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
