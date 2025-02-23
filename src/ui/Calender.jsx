import { useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const CustomCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [shift, setShift] = useState("morning");

  return (
    <div className="flex flex-col items-center w-full text-white bg-Bokara-Grey">
      {/* کانتینر اصلی - ردیفی در دسکتاپ و ستونی در موبایل */}
      <div className="flex flex-col container justify-start items-start w-full gap-8 md:items-center md:justify-center md:flex-row">
        {/* بخش تقویم */}
        <div className="">
          <h2 className="mb-4 text-xl text-center md:text-2xl">
            تاریخ بتن‌ریزی
          </h2>

          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            shouldHighlightWeekends
            locale="fa"
            colorPrimary="#FFD700"
            calendarClassName="custom-calendar"
          />
        </div>

        {/* بخش انتخاب شیفت */}
        <div className="flex flex-col items-start gap-4 md:items-center">
          <span className="text-lg md:text-xl">شیفت کاری</span>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shift"
              value="night"
              checked={shift === "night"}
              onChange={() => setShift("night")}
              className="w-4 h-4"
            />
            شب
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shift"
              value="morning"
              checked={shift === "morning"}
              onChange={() => setShift("morning")}
              className="w-4 h-4"
            />
            صبح
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
