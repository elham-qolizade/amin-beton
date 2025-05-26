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

  const percentage = (status / labels.length) * 100;

  return (
    <div
      style={{ position: "relative", width: 250, height: 250, margin: "auto" }}
    >
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          pathColor: "#FFA500",
          trailColor: "#333",
        })}
      >
        <div
          style={{ fontSize: 16, color: "white" }}
        >{`${status}/${labels.length}`}</div>
      </CircularProgressbarWithChildren>

      {/* برچسب‌ها در اطراف دایره */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: 10,
        }}
      >
        {labels[0]}
      </div>
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "90%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: 10,
        }}
      >
        {labels[1]}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "100%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: 10,
        }}
      >
        {labels[2]}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "90%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: 10,
        }}
      >
        {labels[3]}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: 10,
        }}
      >
        {labels[4]}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "10%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: 10,
        }}
      >
        {labels[5]}
      </div>
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: 10,
        }}
      >
        {labels[6]}
      </div>
    </div>
  );
};

export default ProgressCircle;
