import React from "react";
import background from "../assets/images/833eb3f1ed14ecb9a6dfb717f9e3f826.jpg";

const ProjectHeading = ({ title, date, subtitles, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-between p-8 text-center text-white bg-center bg-no-repeat bg-cover ${className}`}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex flex-row  items-start  gap-4 w-full">
        <h1 className="mt-4 md:mt-10 mb-2 md:mb-4 text-xl md:text-3xl font-bold text-center ">
          {title}
        </h1>
        <div className="flex flex-col text-sm md:text-lg  text-right">
          {subtitles &&
            subtitles.map((subtitle, index) => (
              <p key={index} className="mb-1 md:mb-2">
                {subtitle}
              </p>
            ))}
        </div>
      </div>

      {date && (
        <p className="mt-2 text-xs md:text-sm opacity-75 text-School-Bus">
          {date}
        </p>
      )}
    </div>
  );
};

export default ProjectHeading;
