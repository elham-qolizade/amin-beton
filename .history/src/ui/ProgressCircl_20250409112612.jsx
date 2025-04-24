import React from "react";

const ProgressCircle = ({ status }) => {
  const radius = 80; // اندازه دایره
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  // محاسبه مقدار وضعیت به فرمت 1/7
  const fraction = `${status}/7`;
  const dashOffset = circumference * ((7 - status) / 7); // اینجا مقدار وضعیت به عنوان درصد محاسبه می‌شود

  const circleStyles = {
    position: "relative",
    width: "60%",
    maxWidth: "450px", // اندازه برای تناسب با دایره بزرگتر
    height: "80%",
    maxHeight: "450px", // اندازه برای تناسب با دایره بزرگتر
    margin: "auto",
  };

  const svgStyles = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  const labelStyles = (top, left) => ({
    position: "absolute",
    textAlign: "center",
    fontSize: "12px",
    color: "#fff",
    top: top,
    left: left,
    transform: "translateX(-50%)",
  });

  return (
    <div style={circleStyles}>
      <svg width="100%" height="100%" viewBox="0 0 200 200" style={svgStyles}>
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
      <div style={labelStyles("10%", "50%")}>صدور پیش فاکتور</div>
      <div style={labelStyles("17%", "80%")}>تایید امین بتن</div>
      <div style={labelStyles("45%", "100%")}>خرید اولیه</div>
      <div style={labelStyles("70%", "95%")}>دریافت</div>
      <div style={labelStyles("83%", "50%")}>اجرا</div>
      <div style={labelStyles("68%", "-1%")}>ارسال</div>
      <div style={labelStyles("40%", "-11%")}>تایید پیش فاکتور</div>
    </div>
  );
};

export default ProgressCircle;
