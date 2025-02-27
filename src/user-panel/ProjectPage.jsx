import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import ButtonProject from "../ui/ButtonProject";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  // واکشی داده‌ها از API
  const fetchProjects = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("توکن موجود نیست، هدایت به صفحه ورود...");
        navigate("/LoginForm");
        return;
      }

      const response = await axios.get(
        "https://amin-beton-back.chbk.app/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("داده‌های دریافتی از API:", response.data);

      setProjects(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        console.log("توکن منقضی شده، در حال تلاش برای دریافت توکن جدید...");
        // تلاش برای دریافت توکن جدید
      } else {
        console.error("خطا در دریافت لیست پروژه‌ها:", err);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // تبدیل تاریخ رشته‌ای به شیء Date
  const isProjectCompleted = (endDate) => {
    const currentDate = new Date(); // تاریخ جاری
    const projectEndDate = new Date(endDate); // تاریخ پایان پروژه

    // مقایسه تاریخ‌ها
    return currentDate > projectEndDate;
  };

  return (
    <div className="w-full min-h-screen bg-Bokara-Grey">
      <div className="pb-28">
        <HeaderNav className="bg-Armor-Wash" />
        <ProjectHeading
          title="پنل کاربری"
          subtitles={[
            "نام کاربری",
            "کد ملی",
            "تعداد پروژه‌های فعال",
            "تاریخ آخرین بازدید",
          ]}
          date="1402/11/10"
        />
        <div className="container flex flex-col justify-between py-6 mt-4 border-b border-white md:flex-row">
          <ul className="flex-wrap hidden gap-4 text-sm text-white cursor-pointer md:flex md:text-sm">
            <li className="border-b hover:text-School-Bus">پروژه‌های من</li>
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
          {/* نمایش پروژه‌ها */}
          {projects.length === 0 ? (
            <p className="text-white text-center">هیچ پروژه‌ای پیدا نشد.</p>
          ) : (
            projects.map((data) => (
              <div
                onClick={() => navigate("/OrdersPage")}
                key={data.id}
                className="relative  flex flex-col gap-10 text-white product-card  items-center justify-center h-40 rounded-lg shadow-lg md:h-60"
              >
                <p> {data.title}</p>

                {/* بررسی تاریخ پایان پروژه */}
                {isProjectCompleted(data.end_date) ? (
                  <p>پروژه به اتمام رسید</p>
                ) : (
                  <p>پروژه در حال انجام است</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
