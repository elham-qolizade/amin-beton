// import React from "react";
import React, { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// بقیه ایمپورت‌ها

const ProgressCircle = ({ status }) => {
  const [fontSize, setFontSize] = useState(
    window.innerWidth < 480 ? "0.5rem" : "0.6rem"
  );

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth < 480 ? "0.5rem" : "0.6rem");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const labels = [
    "درخواست خرید جدید",
    "پیش‌فاکتور",
    "فاکتور",
    "تایید امین بتن",
    "ارسال",
    "اجرا",
    "سفارش اجرا شد",
  ];

  const radius = 120;
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
        const angle = (360 / labels.length) * index - 90;
        const radians = (angle * Math.PI) / 180;

        let distanceFromCenter = 56;

        if (label === "سفارش اجرا شد") {
          distanceFromCenter = 62;
        } else if (label === "پیش‌فاکتور" || label === "درخواست خرید جدید") {
          distanceFromCenter = 60;
        }

        const x = 51 + distanceFromCenter * Math.cos(radians);
        const y = 52 + distanceFromCenter * Math.sin(radians);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${y}%`,
              left: `${x}%`,
              transform: "translate(-50%, -50%)",
              fontSize,
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
