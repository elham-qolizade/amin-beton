import { useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
// import TimePicker from "react-time-picker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "react-time-picker/dist/TimePicker.css";
import { toast } from "react-toastify";
import moment from "moment-jalaali";

const CustomCalendar = ({ selectedDay, setSelectedDay }) => {
  // تبدیل تاریخ شمسی به میلادی
  const convertToGregorian = (shamsiDate) => {
    if (!shamsiDate) return null;
    const { year, month, day } = shamsiDate;
    return moment(`${year}-${month}-${day}`, "jYYYY-jMM-jDD").format(
      "YYYY-MM-DD"
    );
  };

  // انتخاب تاریخ
  const handleDateChange = (date) => {
    setSelectedDay(date);
    setShowTimePicker(true); // نمایش انتخاب زمان فقط زمانی که تاریخ انتخاب شده
  };

  // انتخاب زمان
  const handleTimeChange = (newTime) => {
    setTime(newTime);
    const convertedDate = convertToGregorian(selectedDay);
    setGregorianDate(convertedDate);
    if (convertedDate && newTime) {
      sendToServer(convertedDate, shift, newTime);
    }
  };

  // تغییر شیفت و ارسال به سرور
  // const handleShiftChange = (newShift) => {
  //   setShift(newShift);
  //   if (selectedDay && time) {
  //     const convertedDate = convertToGregorian(selectedDay);
  //     sendToServer(convertedDate, newShift, time);
  //   } else {
  //     toast.error("⛔ لطفاً ابتدا تاریخ و ساعت را انتخاب کنید.");
  //   }
  // };

  // ارسال اطلاعات به سرور
  const sendToServer = (date, selectedTime) => {
    if (!date || !shift || !selectedTime) return;

    const finalDateTime = moment(`${date} ${selectedTime}`, "YYYY-MM-DD HH:mm");
    if (finalDateTime.isBefore(moment())) {
      toast.error("⛔ زمان انتخاب‌شده در گذشته است.");
      return;
    }

    const finalDateForServer = finalDateTime.format("YYYY-MM-DDTHH:mm:ss");
    console.log(
      "📤 تاریخ و زمان نهایی برای ارسال به سرور:",
      finalDateForServer
    );
  };

  return (
    <div className="flex flex-col items-center w-full gap-6 p-4 text-white bg-Bokara-Grey">
      <div className="container flex flex-col items-start justify-start w-full gap-8 md:items-center md:justify-center md:flex-row">
        {/* بخش انتخاب تاریخ */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl md:text-2xl">تاریخ بتن‌ریزی</h2>
          <Calendar
            value={selectedDay}
            onChange={handleDateChange}
            shouldHighlightWeekends
            locale="fa"
            colorPrimary="#FFD700"
            calendarClassName="custom-calendar"
          />
        </div>

        {/* بخش انتخاب شیفت */}
        {/* <div className="flex flex-col items-start gap-4 md:items-center">
          <span className="text-lg md:text-xl">شیفت کاری</span>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shift"
              value={2}
              checked={shift === 2}
              onChange={() => handleShiftChange(2)}
              className="w-4 h-4 text-School-Bus focus:ring-School-Bus accent-School-Bus"
            />
            شب
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="shift"
              value={1}
              checked={shift === 1}
              onChange={() => handleShiftChange(1)}
              className="w-4 h-4 text-School-Bus focus:ring-School-Bus accent-School-Bus"
            />
            روز
          </label>
        </div> */}
      </div>

      {/* پاپ‌آپ انتخاب ساعت */}
    </div>
  );
};

export default CustomCalendar;
