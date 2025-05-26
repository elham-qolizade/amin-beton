import { useState, useEffect } from "react";

export default function ManualDigitalClock({ value, onChange }) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  // هر بار که prop مقدارش تغییر کرد، ساعت و دقیقه به‌روزرسانی می‌شود
  useEffect(() => {
    if (value instanceof Date && !isNaN(value)) {
      setHour(value.getHours());
      setMinute(value.getMinutes());
    }
  }, [value]);

  const format = (val) => {
    const num = parseInt(val);
    if (isNaN(num)) return "00";
    return num.toString().padStart(2, "0");
  };

  const updateTime = (newHour, newMinute) => {
    if (onChange) {
      // ارسال یک Date جدید به والد
      const updatedDate = new Date(value || new Date());
      updatedDate.setHours(newHour);
      updatedDate.setMinutes(newMinute);
      onChange(updatedDate);
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
  <ManualDigitalClock
    value={selectedTime}
    onChange={(newValue) => {
      setSelectedTime(newValue);
      // اگر لازم داری setTime رو هم اینجا صدا بزنی
    }}
  />;
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
