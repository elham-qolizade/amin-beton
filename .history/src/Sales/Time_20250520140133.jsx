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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono px-4">
      <h1 className="text-4xl font-bold text-white mb-4 tracking-widest">
        ساعت تحویل
      </h1>

      <div className="text-7xl text-green-400 mb-10 tracking-wider drop-shadow-md">
        {format(hour)}:{format(minute)}
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <label className="text-white mb-2 text-lg">دقیقه</label>
          <input
            type="number"
            value={minute}
            onChange={handleMinuteChange}
            className="w-24 p-2 rounded-xl bg-white text-center text-lg font-bold text-black"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-white mb-2 text-lg">ساعت</label>
          <input
            type="number"
            value={hour}
            onChange={handleHourChange}
            className="w-24 p-2 rounded-xl bg-white text-center text-lg font-bold text-black"
          />
        </div>
      </div>
    </div>
  );
}
