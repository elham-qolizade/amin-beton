import React from "react";

const ProgressCircle = ({ status }) => {
  const radius = 90; // اندازه دایره
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // محاسبه مقدار وضعیت به فرمت 1/7
  const fraction = `${status}/7`;
  const dashOffset = circumference * ((7 - status) / 7); // اینجا مقدار وضعیت به عنوان درصد محاسبه می‌شود

  return (
    <div
      style={{
        position: "relative",
        width: "80%",
        maxWidth: "450px", // اندازه برای تناسب با دایره بزرگتر
        height: "80%",
        maxHeight: "450px", // اندازه برای تناسب با دایره بزرگتر
        margin: "auto",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* دایره پس‌زمینه */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#333"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* دایره زرد که بر اساس وضعیت پر می‌شود */}
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
          transform="rotate(-90 100 100)" // شروع از بالای دایره
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>

        {/* متن مقدار وضعیت به صورت 1/7 */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16px" // اندازه متن بزرگتر
          fill="#fff"
        >
          {fraction}
        </text>
      </svg>

      {/* برچسب‌ها برای هر مرحله */}
      <div
        className="absolute text-xs text-white"
        style={{ top: "10%", left: "50%", transform: "translateX(-50%)" }}
      >
        صدور پیش فاکتور
      </div>
      <div
        className="absolute text-xs text-white"
        style={{
          top: "17%",
          left: "80%",
          transform: "translateX(-50%)",
        }}
      >
        تایید امین بتن
      </div>
      <div
        className="absolute text-xs text-white"
        style={{
          top: "45%",
          left: "100%",
          transform: "translateX(-50%)",
        }}
      >
        خرید اولیه
      </div>
      <div
        className="absolute text-xs text-white"
        style={{
          top: "68%",
          left: "95%",
          transform: "translateX(-50%)",
        }}
      >
        دریافت
      </div>
      <div
        className="absolute text-xs text-white"
        style={{
          top: "83%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        دریافت
      </div>
      <div
        className="absolute text-xs text-white"
        style={{
          top: "68%",
          left: "-1%",
          transform: "translateX(-50%)",
        }}
      >
        ارسال
      </div>
      <div
        className="absolute text-xs text-white"
        style={{
          top: "40%",
          left: "-11%",
          transform: "translateX(-50%)",
        }}
      >
        تایید پیش فاکتور
      </div>
    </div>
  );
};

export default ProgressCircle;
