import { useState } from "react";

export default function ManualDigitalClock() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const format = (val) => val.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono">
      <div className="text-6xl text-green-400 mb-8">
        {format(hour)}:{format(minute)}
      </div>

      <div className="grid grid-cols-2 gap-6 text-black">
        <div className="flex flex-col items-center">
          <label className="text-white mb-2">ساعت</label>
          <input
            type="number"
            min="0"
            max="23"
            value={hour}
            onChange={(e) =>
              setHour(Math.min(23, Math.max(0, +e.target.value)))
            }
            className="w-20 p-2 rounded bg-white text-center"
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="text-white mb-2">دقیقه</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minute}
            onChange={(e) =>
              setMinute(Math.min(59, Math.max(0, +e.target.value)))
            }
            className="w-20 p-2 rounded bg-white text-center"
          />
        </div>
      </div>
    </div>
  );
}
