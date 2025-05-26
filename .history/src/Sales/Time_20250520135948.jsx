import { useState } from "react";

export default function ManualDigitalClock() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const format = (val) => {
    const num = parseInt(val);
    if (isNaN(num)) return "00";
    return num.toString().padStart(2, "0");
  };

  const handleHourChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) {
      setHour(0);
      return;
    }
    if (val > 23) setHour(0);
    else if (val < 0) setHour(23);
    else setHour(val);
  };

  const handleMinuteChange = (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) {
      setMinute(0);
      return;
    }
    if (val > 59) setMinute(0);
    else if (val < 0) setMinute(59);
    else setMinute(val);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono">
      <div className="text-6xl text-green-400 mb-8">
        {format(hour)}:{format(minute)}
      </div>

      <div className="grid grid-cols-2 gap-6 text-black">
        <div className="flex flex-col items-center">
          <label className="text-white mb-2">دقیقه</label>
          <input
            type="number"
            value={minute}
            onChange={handleMinuteChange}
            className="w-20 p-2 rounded bg-white text-center"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-white mb-2">ساعت</label>
          <input
            type="number"
            value={hour}
            onChange={handleHourChange}
            className="w-20 p-2 rounded bg-white text-center"
          />
        </div>
      </div>
    </div>
  );
}
