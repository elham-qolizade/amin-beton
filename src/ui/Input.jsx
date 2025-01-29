import React from "react";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  id,
  name,
  maxLength,
}) => {
  return (
    <input
      type={type}
      id={id} // اضافه کردن id به ورودی
      name={name} // اضافه کردن name به ورودی
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      // اضافه کردن maxLength اگر لازم باشد
      className={`w-full  ltr-input bg-Bokara-Grey p-1 pl-4  border border-white text-white focus:outline-none focus:ring-2 focus:ring-School-Bus ${className}`}
    />
  );
};

export default Input;
