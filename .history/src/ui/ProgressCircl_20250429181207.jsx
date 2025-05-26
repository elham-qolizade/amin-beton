import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressCircle = ({ status }) => {
  const labels = [
    "درخواست خرید جدید",
    "پیش‌فاکتور",
    "فاکتور",
    "تایید امین بتن",
    "ارسال",
    "اجرا",
    "سفارش اجرا شد",
  ];

  const radius = 120; // شعاع مجازی برای پخش برچسب‌ها
  const percentage = (status / labels.length) * 100;

  return (
    <div
      style={{
        position: "relative",
        width: "60vw",
        maxWidth: 300,
        aspectRatio: 1,
        margin: "auto",
      }}
    >
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor: "#FFA500",
          trailColor: "#333",
        })}
      >
        <div style={{ fontSize: "1.2rem", color: "white" }}>
          {`${status}/${labels.length}`}
        </div>
      </CircularProgressbarWithChildren>

      {labels.map((label, index) => {
        const angle = (360 / labels.length) * index - 90; // -90 برای شروع از بالا
        const radians = (angle * Math.PI) / 180;
        const x = 50 + 42 * Math.cos(radians); // 42 درصد از عرض/ارتفاع برای فاصله از مرکز
        const y = 50 + 42 * Math.sin(radians);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${y}%`,
              left: `${x}%`,
              transform: "translate(-40%, -50%)",
              fontSize: "0.7rem",
              color: "white",
              textAlign: "center",
              width: "70px",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressCircle;
