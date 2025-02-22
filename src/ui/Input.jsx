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
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className={`w-full  ltr-input bg-Bokara-Grey p-1 pl-4  border border-l-Looking-Glass text-white focus:outline-none focus:ring-1 focus:ring-School-Bus ${className}`}
    />
  );
};

export default Input;
