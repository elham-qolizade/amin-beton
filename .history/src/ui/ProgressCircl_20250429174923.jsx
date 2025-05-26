import React from "react";

const ProgressCircle = ({ status }) => {
  const radius = 90;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * ((7 - status) / 7);
  const center = 100;
  const labelRadius = 110;

  const steps = [
    "سفارش اجرا شد",
    "درخواست خرید جدید",
    "پیش فاکتور",
    "فاکتور",
    "تایید امین بتن",
    "ارسال",
    "اجرا",
  ];

  const renderLabels = () =>
    steps.map((label, index) => {
      const angle = (index / steps.length) * 2 * Math.PI - Math.PI / 2;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);
      return (
        <text
          key={index}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="7"
          fill="#fff"
        >
          {label}
        </text>
      );
    });

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>

        {/* زمینه */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#333"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* دایره پیشرفت */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        {/* عدد وسط */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#fff"
        >
          {`${status}/7`}
        </text>

        {/* برچسب‌ها */}
        {renderLabels()}
      </svg>
    </div>
  );
};

export default ProgressCircle;
