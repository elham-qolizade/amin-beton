import React from "react";

const ButtonProjectComponent = ({
  children,
  type = "button",

  onClick,
  className = "",
}) => {
  return (
    <button
      className={`md:w-44   text-center font-medium  text-sm  text-Looking-Glass  transition  border border-Looking-Glass  
             hover:border-School-Bus   hover:text-School-Bus whitespace-nowrap ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default ButtonProjectComponent;
