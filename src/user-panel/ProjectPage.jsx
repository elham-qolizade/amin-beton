import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "./../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import ButtonProject from "../ui/ButtonProject";
import { projects } from "../constans";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-Bokara-Grey">
      <div className="pb-28">
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
        <div className="container flex flex-col justify-between py-6 mt-4 border-b border-white md:flex-row">
          <ul className="flex-wrap hidden gap-4 text-sm text-white cursor-pointer md:flex md:text-sm">
            <li className="border-b hover:text-School-Bus">پروژه های من</li>
            <li className="border-b hover:text-School-Bus">پیگیری سفارش</li>
            <li className="border-b hover:text-School-Bus">پشتیبانی</li>
          </ul>
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <ButtonProject
              className="py-1 w-36"
              onClick={() => navigate("/Addproject")}
            >
              افزودن پروژه
            </ButtonProject>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 px-8 cursor-pointer md:grid-cols-2 py-10 md:px-32">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative flex items-center justify-center h-40 rounded-lg shadow-lg md:h-60"
            >
              <span
                className={`absolute text-lg md:text-3xl font-medium ${project.color}`}
              >
                {project.title}
              </span>
              <img
                src={project.image}
                className="object-cover w-full h-full rounded-lg product-image"
              />
              {project.description && (
                <span className="absolute px-2 text-xs text-white md:text-lg bottom-2">
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
