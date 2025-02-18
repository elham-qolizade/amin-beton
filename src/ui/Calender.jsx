import { useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const CustomCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [shift, setShift] = useState("morning");

  return (
    <div className="flex flex-col items-center w-full gap-6 text-white bg-Bokara-Grey">
      <h2 className="mb-4 text-xl">تاریخ بتن‌ریزی</h2>

      <div className="flex flex-row items-center gap-6 text-white bg-Bokara-Grey">
        <div className="mx-auto w-fit">
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            shouldHighlightWeekends
            locale="fa"
            colorPrimary="#FFD700"
            calendarClassName="custom-calendar"
          />
        </div>

        <div className="flex flex-col items-center gap-3 ">
          <span className="">شیفت کاری</span>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="shift"
              value="night"
              checked={shift === "night"}
              onChange={() => setShift("night")}
            />
            شب
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="shift"
              value="morning"
              checked={shift === "morning"}
              onChange={() => setShift("morning")}
            />
            صبح
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
