import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      placeholder,
      value,
      onChange,
      className,
      id,
      name,
      maxLength,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full ltr-input bg-Bokara-Grey  py-2 border border-Looking-Glass text-white focus:outline-none focus:ring-1 focus:ring-School-Bus ${className}`}
      />
    );
  }
);

export default Input;
