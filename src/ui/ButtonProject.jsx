import React from "react";

const ButtonProjectComponent = ({
  children,
  type = "button",

  onClick,
  className = "",
}) => {
  return (
    <button
      className={`md:w-48 md:h-10 md:px-4 text-Looking-Glass md:text-lg transition duration-300 border  border-Looking-Glass rounded 
                 hover:bg-School-Bus hover:border-white hover:text-white ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default ButtonProjectComponent;
