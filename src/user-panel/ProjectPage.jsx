import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "./../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import ButtonProject from "../ui/ButtonProject";
import { projects } from "../constans";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-Bokara-Grey min-h-screen">
      <div className="container pb-28  ">
        <HeaderNav className="bg-Armor-Wash" />
        <ProjectHeading
          title="پنل کاربری"
          subtitles={[
            "نام کاربری",
            "کد ملی",
            "تعداد پروژه های فعال",
            "تاریخ آخرین بازدید",
          ]}
          date="1402/11/10"
        />
        <div className="flex flex-col md:flex-row justify-between px-4 py-6 mt-4 border-b border-white">
          <ul className="hidden md:flex flex-wrap gap-4 text-white cursor-pointer text-sm md:text-base">
            <li className="border-b hover:text-School-Bus">پروژه های من</li>
            <li className="border-b hover:text-School-Bus">پیگیری سفارش</li>
            <li className="border-b hover:text-School-Bus">پشتیبانی</li>
          </ul>
          <div className="mt-4 md:mt-0">
            <ButtonProject onClick={() => navigate("/Addproject")}>
              افزودن پروژه
            </ButtonProject>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-10 md:px-32">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative flex items-center justify-center rounded-lg shadow-lg h-40 md:h-60"
            >
              <span
                className={`absolute text-sm md:text-3xl font-bold ${project.color}`}
              >
                {project.title}
              </span>
              <img
                src={project.image}
                className="product-image w-full h-full object-cover rounded-lg"
              />
              {project.description && (
                <span className="absolute text-xs md:text-lg text-white bottom-2 px-2">
                  {project.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
