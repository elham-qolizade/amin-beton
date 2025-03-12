import { useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const CustomCalendar = ({ selectedDay, setSelectedDay, shift, setShift }) => {
  return (
    <div className="flex flex-col items-center w-full text-white bg-Bokara-Grey">
      <div className="container flex flex-col items-start justify-start w-full gap-8 md:items-center md:justify-center md:flex-row">
        {/* بخش تقویم */}
        <div className="">
          <h2 className="mb-4 text-xl text-center md:text-2xl">
            تاریخ بتن‌ریزی
          </h2>

          <Calendar
            value={selectedDay} // تاریخ انتخاب‌شده
            onChange={setSelectedDay} // setter برای به‌روزرسانی تاریخ
            shouldHighlightWeekends
            locale="fa" // زبان فارسی
            colorPrimary="#FFD700" // رنگ اصلی تقویم
            calendarClassName="custom-calendar"
          />
        </div>

        {/* بخش شیفت کاری */}
        <div className="flex flex-col items-start gap-4 md:items-center">
          <span className="text-lg md:text-xl">شیفت کاری</span>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shift"
              value="night"
              checked={shift === "night"}
              onChange={() => setShift("night")} // تغییر به شیفت شب
              className="w-4 h-4 text-School-Bus focus:ring-School-Bus accent-School-Bus"
            />
            شب
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
