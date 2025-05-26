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
      className={`flex items-center justify-between p-10 py-20 text-center text-white bg-center bg-no-repeat bg-cover ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.74), rgba(0, 0, 0, 0.75)), url(${background})`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className={`container flex justify-between ${className}`}>
        <div
          className={`flex flex-row items-start w-full max-w-md gap-4 ${className}`}
        >
          <div className="flex items-center">
            <h1 className="pt-4 text-2xl font-bold text-right">{title}</h1>
          </div>

          <div className={`flex flex-col text-sm text-right ${className}`}>
            {subtitles &&
              subtitles.map((subtitle, index) => (
                <p key={index} className="mb-1 text-lg font-medium md:mb-2">
                  {subtitle}
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* نمایش تاریخ و ساعت فقط اگر مسیرش تو لیست نبود */}
      {shouldShowDate && (
        <div className="flex flex-col items-center mt-4 text-lg font-medium text-right text-School-Bus">
          <p>امروز</p>
          <p>{`${formattedDate}`}</p>
          <p>{`${time}`}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectHeading;
