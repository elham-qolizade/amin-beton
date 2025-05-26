import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ProgressCircle.css"; // فایل استایل جدا برای مدیا‌کوئری

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

  const percentage = (status / labels.length) * 100;

  return (
    <div className="circle-container">
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor: "#FFA500",
          trailColor: "#333",
        })}
      >
        <div className="circle-text">{`${status}/${labels.length}`}</div>
      </CircularProgressbarWithChildren>

      {/* برچسب‌ها */}
      {labels.map((label, index) => (
        <div key={index} className={`circle-label label-${index}`}>
          {label}
        </div>
      ))}
    </div>
  );
};

export default ProgressCircle;
