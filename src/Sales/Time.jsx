import { useState, useEffect } from "react";

export default function ManualDigitalClock({ value, onChange }) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  // به روزرسانی ساعت و دقیقه در صورت تغییر مقدار prop (که الان رشته است)
  useEffect(() => {
    if (typeof value === "string" && /^\d{2}:\d{2}$/.test(value)) {
      const [h, m] = value.split(":").map(Number);
      setHour(h);
      setMinute(m);
    }
  }, [value]);

  const updateTime = (newHour, newMinute) => {
    if (onChange) {
      const formattedTime = `${newHour.toString().padStart(2, "0")}:${newMinute
        .toString()
        .padStart(2, "0")}`;
      onChange(formattedTime);
    }
  };

  const handleHourChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    if (val > 23) val = 0;
    else if (val < 0) val = 23;

    setHour(val);
    updateTime(val, minute);
  };

  const handleMinuteChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    if (val > 59) val = 0;
    else if (val < 0) val = 59;

    setMinute(val);
    updateTime(hour, val);
  };

  const format = (val) => {
    const num = parseInt(val);
    if (isNaN(num)) return "00";
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-900 text-white font-mono px-4">
      <h1 className="text-2xl font-semibold mb-2 tracking-wide">ساعت تحویل</h1>

      <div className="text-5xl text-green-400 mb-6 tracking-wide drop-shadow-sm">
        {format(hour)}:{format(minute)}
      </div>

      <div className="bg-gray-800 p-4 rounded-xl shadow grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <label className="text-white text-sm mb-1">دقیقه</label>
          <input
            type="number"
            value={minute}
            onChange={handleMinuteChange}
            className="w-20 p-1.5 rounded bg-white text-center text-base font-semibold text-black"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-white text-sm mb-1">ساعت</label>
          <input
            type="number"
            value={hour}
            onChange={handleHourChange}
            className="w-20 p-1.5 rounded bg-white text-center text-base font-semibold text-black"
          />
        </div>
      </div>
    </div>
  );
}
