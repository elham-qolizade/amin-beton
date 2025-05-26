import { useEffect, useState } from "react";

export default function CoolDigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 text-green-400 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl mb-4 text-center text-white font-bold tracking-wider">
          ساعت دیجیتال ۲۴ ساعته
        </h1>
        <div className="text-6xl font-mono text-center">{formatTime(time)}</div>
      </div>
    </div>
  );
}
