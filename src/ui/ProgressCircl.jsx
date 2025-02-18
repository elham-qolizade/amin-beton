import React from "react";

const ProgressCircle = ({ percentage }) => {
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * ((100 - percentage) / 100);

  return (
    <div style={{ position: "relative", width: "400px", height: "400px" }}>
      <svg width="400" height="400" viewBox="0 0 200 200">
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

        <text x="100" y="110" textAnchor="middle" fontSize="14px" fill="#fff">
          1/7 مراحل خرید
        </text>
      </svg>

      <div className="absolute top-[2%] left-[40%] text-white text-xs">
        صدور پیش فاکتور
      </div>
      <div className="absolute top-[15%] left-[75%] text-white text-xs">
        تایید پیش فاکتور
      </div>
      <div className="absolute top-[40%] left-[90%] text-white text-xs">
        تایید امین بتن
      </div>
      <div className="absolute top-[80%] left-[75%] text-white text-xs">
        ارسال
      </div>
      <div className="absolute top-[90%] left-[40%] text-white text-xs">
        اجرا
      </div>
      <div className="absolute top-[80%] left-[5%] text-white text-xs">
        دریافت
      </div>
      <div className="absolute top-[40%] left-[0%] text-white text-xs">
        خرید اولیه
      </div>
    </div>
  );
};

export default ProgressCircle;
