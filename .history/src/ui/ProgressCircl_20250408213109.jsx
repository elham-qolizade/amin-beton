import React from "react";

const ProgressCircle = ({ status }) => {
  const radius = 90; // اندازه دایره بزرگتر شد
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // محاسبه درصد پر شدن نوار بر اساس وضعیت (1 تا 7)
  const percentage = (status * 14.3).toFixed(1); // هر وضعیت معادل 14.3 درصد است
  const dashOffset = circumference * ((100 - percentage) / 100);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "450px", // تغییر اندازه برای تناسب با دایره بزرگتر
        height: "100%",
        maxHeight: "450px", // تغییر اندازه برای تناسب با دایره بزرگتر
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

        {/* دایره زرد که بر اساس درصد پر می‌شود */}
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

        {/* متن درصد */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16px" // اندازه متن بزرگتر
          fill="#fff"
        >
          {percentage}%
        </text>
      </svg>

      {/* برچسب‌ها برای هر مرحله */}
      <div className="absolute top-[20%] left-[-4%] transform -translate-x-1/2 text-white text-xs">
        صدور پیش فاکتور
      </div>
      <div className="absolute top-[17%] left-[80%]  transform -translate-x-1/2 text-white text-xs">
        تایید امین بتن
      </div>
      <div className="absolute top-[45%] left-[100%]  right-[-13%] transform -translate-x-1/2 text-white text-xs">
        خرید اولیه
      </div>
      <div className="absolute top-[68%] left-[95%] transform -translate-x-1/2 text-white text-xs">
        دریافت
      </div>
      <div className="absolute top-[83%] left-[50%] transform -translate-x-1/2 text-white text-xs">
        اجرا
      </div>
      <div className="absolute top-[68%] left-[-1%] transform -translate-x-1/2 text-white text-xs">
        ارسال
      </div>
      <div className="absolute top-[45%] left-[-15%] transform -translate-x-1/2 text-white text-xs">
        تایید پیش فاکتور
      </div>
    </div>
  );
};

export default ProgressCircle;
