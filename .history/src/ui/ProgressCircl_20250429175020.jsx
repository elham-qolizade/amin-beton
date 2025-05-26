import React from "react";

const ProgressCircle = ({ status }) => {
  const radius = 90;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * ((7 - status) / 7);
  const isMobile = window.innerWidth < 768;

  const center = 100;
  const labelRadius = 115; // فاصله از مرکز برای برچسب‌ها

  const steps = [
    "سفارش اجرا شد",
    "درخواست خرید جدید",
    "پیش فاکتور",
    "فاکتور",
    "تایید امین بتن",
    "ارسال",
    "اجرا",
  ];

  const circleStyles = {
    position: "relative",
    width: "50%",
    maxWidth: "450px",
    height: "80%",
    maxHeight: "450px",
    margin: "auto",
  };

  const svgStyles = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const renderLabels = () => {
    return steps.map((label, index) => {
      const angle = (index / steps.length) * 2 * Math.PI - Math.PI / 2; // شروع از بالا
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);

      return (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontSize: isMobile ? "10px" : "12px",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      );
    });
  };

  return (
    <div style={circleStyles}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" style={svgStyles}>
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#333"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={isMobile ? "12px" : "16px"}
          fill="#fff"
        >
          {`${status}/7`}
        </text>
      </svg>
      {renderLabels()}
    </div>
  );
};

export default ProgressCircle;
