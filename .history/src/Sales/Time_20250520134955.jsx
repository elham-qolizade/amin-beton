// CoolDigitalClock.jsx
import Clock from "react-live-clock";

export default function CoolDigitalClock() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 text-green-400 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl mb-4 text-center text-white font-bold tracking-wider">
          ساعت دیجیتال ۲۴ ساعته
        </h1>
        <div className="text-6xl font-mono text-center">
          <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Tehran"} />
        </div>
      </div>
    </div>
  );
}
