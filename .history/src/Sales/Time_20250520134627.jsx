import React, { useState, useRef, useEffect } from "react";

export default function AnalogTimePicker() {
  const [angle, setAngle] = useState(0);
  const [time, setTime] = useState("00:00");
  const clockRef = useRef(null);

  const handleClick = (e) => {
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const radians = Math.atan2(dy, dx);
    const degrees = (radians * 180) / Math.PI + 90;
    const normalized = (degrees + 360) % 360;
    const hours = Math.floor(normalized / 30);
    const minutes = Math.round((normalized % 30) * 2);
    setAngle(normalized);
    setTime(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        ref={clockRef}
        className="relative w-64 h-64 rounded-full border-4 border-gray-300 bg-white shadow-md"
        onClick={handleClick}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <div
            className="w-1 h-28 bg-blue-600 origin-bottom"
            style={{ transform: `rotate(${angle}deg)` }}
          ></div>
        </div>
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const x = 50 + 40 * Math.sin(angle);
          const y = 50 - 40 * Math.cos(angle);
          return (
            <div
              key={i}
              className="absolute text-sm text-gray-700"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          );
        })}
      </div>
      <div className="text-lg font-semibold">زمان انتخاب شده: {time}</div>
    </div>
  );
}
