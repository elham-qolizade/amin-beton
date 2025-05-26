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
  const customDistances = {
    2: 60, // فاکتور - فاصله بیشتر
    5: 40, // اجرا - فاصله کمتر
  };
  const distanceFromCenter = customDistances[index] ?? 52; // پیش‌فرض 52

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
        // فاصله سفارشی برای برخی ایندکس‌ها
        const customDistances = {
          2: 60, // فاکتور دورتر
          5: 40, // اجرا نزدیک‌تر
        };
        const angle = (360 / labels.length) * index - 90;
        const radians = (angle * Math.PI) / 180;
        const distanceFromCenter = customDistances[index] ?? 52; // فاصله پیش‌فرض

        const x = 50 + distanceFromCenter * Math.cos(radians);
        const y = 50 + distanceFromCenter * Math.sin(radians);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${y}%`,
              left: `${x}%`,
              transform: "translate(-50%, -50%)",
              fontSize: "0.5rem",
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
