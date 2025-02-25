import React from "react";
import background from "../assets/images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";

const ProjectHeading = ({ title, date, subtitles, className = "" }) => {
  const formattedDate = date ? new Date(date) : null;

  const dayName = formattedDate
    ? formattedDate.toLocaleDateString("fa-IR", { weekday: "long" }) // نام روز (شنبه، یکشنبه و ...)
    : "";

  const time = formattedDate
    ? formattedDate.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }) // نمایش ساعت و دقیقه
    : "";

  return (
    <div
      className={`flex items-center justify-between p-8 text-center text-white bg-center bg-no-repeat bg-cover ${className}`}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className={`container flex justify-between ${className}`}>
        <div
          className={`flex flex-row items-start w-full max-w-md gap-4 ${className}`}
        >
          <div className="flex  items-center">
            <h1 className="text-lg pt-4 font-bold text-center">{title}</h1>
          </div>

          <div className={`flex flex-col text-sm text-right${className}`}>
            {subtitles &&
              subtitles.map((subtitle, index) => (
                <p key={index} className="mb-1 md:mb-2">
                  {subtitle}
                </p>
              ))}
          </div>
        </div>

        {date && (
          <div className="flex flex-col gap-2 items-end mt-2 text-xs opacity-75 md:text-sm text-School-Bus">
            <p>{dayName}</p> {/* نام روز */}
            <p>{date}</p> {/* تاریخ اصلی */}
            <p>{time}</p> {/* ساعت */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectHeading;
