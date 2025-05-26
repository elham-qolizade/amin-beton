import React from "react";
import moment from "moment-jalaali";
import background from "../assets/images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";
import { useLocation } from "react-router-dom";

const ProjectHeading = ({ title, date, subtitles, className = "" }) => {
  const location = useLocation();

  moment.locale("fa");
  moment.loadPersian({ usePersianDigits: false });

  const isValidDate =
    date && moment(date, "jYYYY/jMM/jDD HH:mm:ss", true).isValid();

  const formattedDate = isValidDate
    ? moment(date, "jYYYY/jMM/jDD HH:mm:ss").format("jYYYY/jMM/jDD")
    : "تاریخ نامعتبر";

  const time = isValidDate
    ? moment(date, "jYYYY/jMM/jDD HH:mm:ss").format("HH:mm")
    : "00:00";

  // مسیرهایی که تاریخ و ساعت نباید نشون داده بشه
  const hideDateOnPaths = [
    "/News",
    "/About",
    "/Contact",
    "/product/1",
    "/product/2",
    "/product/3",
    "/product/4",
  ];
  const shouldShowDate = !hideDateOnPaths.includes(location.pathname);

  return (
    <div
      className={`flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-10 py-16 md:py-20 text-white bg-center bg-no-repeat bg-cover rounded-xl backdrop-blur-md bg-black/40 shadow-xl gap-6 ${className}`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container flex flex-col md:flex-row justify-between items-center md:items-start w-full gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-2xl gap-4 text-center md:text-right">
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {title}
            </h1>
          </div>

          <div className="flex flex-col text-sm sm:text-base md:text-lg font-medium gap-1 md:gap-2">
            {subtitles &&
              subtitles.map((subtitle, index) => (
                <p key={index} className="leading-snug">
                  {subtitle}
                </p>
              ))}
          </div>
        </div>
      </div>

      {shouldShowDate && (
        <div className="flex flex-col items-center text-sm sm:text-base md:text-lg font-semibold text-School-Bus text-center md:text-right">
          <p>امروز</p>
          <p>{formattedDate}</p>
          <p>{time}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectHeading;
