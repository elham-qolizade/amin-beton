import React from "react";

const ProgressCircle = ({ status }) => {
  const radius = 90;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const fraction = `${status}/7`;
  const dashOffset = circumference * ((7 - status) / 7);
  const isMobile = window.innerWidth < 768;

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

  // اگر نیاز شد، id برای هر برچسب پاس بده تا موقعیت خاص تغییر کنه
  const labelStyles = (top, left, labelId = null) => {
    // تغییر موقعیت فقط برای موبایل و فقط برچسب‌های خاص
    if (isMobile) {
      if (labelId === "request") (left = "90%"), (top = "-1%");
      if (labelId === "pre-invoice") left = "110%";
    }

    return {
      position: "absolute",
      textAlign: "center",
      fontSize: isMobile ? "10px" : "12px",
      color: "#fff",
      top,
      left,
      transform: "translateX(-50%)",
    };
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
          {fraction}
        </text>
      </svg>

      {/* برچسب‌ها */}
      <div style={labelStyles("-5%", "50%")}>سفارش اجرا شد</div>
      <div style={labelStyles("-1%", "84%", "request")}>درخواست خرید جدید</div>
      <div style={labelStyles("45%", "101%", "pre-invoice")}>پیش فاکتور</div>
      <div style={labelStyles("70%", "100%")}>فاکتور</div>
      <div style={labelStyles("100%", "50%")}>تایید امین بتن</div>
      <div style={labelStyles("68%", "-1%")}>ارسال</div>
      <div style={labelStyles("35%", "-5%")}>اجرا</div>
    </div>
  );
};

export default ProgressCircle;
