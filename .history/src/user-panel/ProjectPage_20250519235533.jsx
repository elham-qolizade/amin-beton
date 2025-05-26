import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import ButtonProject from "../ui/ButtonProject";
import moment from "moment-jalaali"; // import moment-jalaali

// تابع برای بررسی اعتبار توکن و دریافت اطلاعات کاربر
const checkTokenValidity = async (navigate, setUserData) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    navigate("/LoginForm");
    return false;
  }

  try {
    const response = await fetch(
      "https://amin-beton-back.chbk.app/api/users/me/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      console.log("User Data:", userData); // اضافه کردن این خط برای لاگ کردن داده‌ها
      setUserData(userData);
      return true;
    }

    if (response.status === 401 || response.status === 403) {
      navigate("/loginForm");
      return false;
    }

    throw new Error("خطا در بررسی اعتبار توکن");
  } catch (error) {
    console.error(error);
    navigate("/LoginForm");
    return false;
  }
};
const fetchProjects = async () => {
  const tokenIsValid = await checkTokenValidity(navigate, setUserData);
  if (!tokenIsValid) return;

  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "https://amin-beton-back.chbk.app/api/projects/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // ← back-tick و ${}
        },
      }
    );

    const sorted = response.data.sort((a, b) =>
      moment(b.start_date).diff(moment(a.start_date))
    );
    setProjects(sorted);
  } catch (err) {
    console.error("خطا در دریافت لیست پروژه‌ها:", err);
  }
};

// تابع برای دریافت تاریخ شمسی و نام روز هفته
const getCurrentDate = () => {
  moment.locale("fa");
  const date = moment();
  return {
    fullDate: date.format("jYYYY/jMM/jDD HH:mm:ss"),
    dayName: date.format("dddd"),
  };
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [userData, setUserData] = useState({
    first_name: "",
    national_code: "",
    last_order: "",
    projects: 0,
  });

  // واکشی داده‌ها از API برای پروژه‌ها
  const fetchProjects = async () => {
    const tokenIsValid = await checkTokenValidity(navigate, setUserData);
    if (!tokenIsValid) return;

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://amin-beton-back.chbk.app/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const sortedProjects = response.data.sort((a, b) => {
        return moment(b.start_date).diff(moment(a.start_date)); // تغییر به start_date
      });

      setProjects(sortedProjects);
    } catch (err) {
      console.error("خطا در دریافت لیست پروژه‌ها:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // تابع بررسی اتمام پروژه
  const isProjectCompleted = (endDate) => {
    if (!endDate) return false;
    return moment().isAfter(moment(endDate, "YYYY-MM-DD"));
  };

  // استفاده از useEffect برای بروزرسانی تاریخ جاری هر ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getCurrentDate());
      console.log("تاریخ جاری:", currentDate.fullDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-Bokara-Grey">
      <div className="pb-28">
        <HeaderNav className="bg-Armor-Wash" />
        <ProjectHeading
          title="پنل کاربری"
          subtitles={[
            "نام کاربری: " + userData.first_name,
            "کد ملی: " + userData.national_code,
            "تعداد پروژه‌های فعال: " + userData.projects,
            // "تاریخ آخرین خرید: " + userData.last_order,
          ]}
          date={currentDate.fullDate}
        />

        <div className="container flex flex-col w-full py-6 mt-4 border-b border-white md:flex-row">
          <div className="flex flex-col items-center justify-center w-full py-6 mt-4">
            <ButtonProject
              className="w-56 py-1 text-center"
              onClick={() => navigate("/Addproject")}
            >
              افزودن پروژه
            </ButtonProject>
          </div>
        </div>

        <div className="grid items-center justify-center grid-cols-1 gap-4 px-8 py-10 cursor-pointer md:grid-cols-2 md:px-32">
          {/* نمایش پروژه‌ها */}
          {projects.length === 0 ? (
            <p className="text-center text-white">هیچ پروژه‌ای پیدا نشد.</p>
          ) : (
            projects.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/OrdersPage/${p.id}`)}
                className="relative flex flex-col items-center justify-center gap-2 text-white rounded-lg shadow-lg h-44 md:h-60 product-card"
              >
                <p className="text-lg font-semibold">{p.title}</p>

                <p className="text-sm">
                  تاریخ شروع: {moment(p.start_date).format("jYYYY/jMM/jDD")}
                </p>
                <p className="text-sm">سفارش‌ها: {p.orders_count ?? 0}</p>
                <p className="text-sm">مهندس ناظر: {p.supervising_engineer}</p>

                {p.status === 1 ? (
                  <p className="text-School-Bus">در حال انجام</p>
                ) : p.status === 2 ? (
                  <p className="text-red">تمام شده</p>
                ) : (
                  <p className="text-yellow-400">نامشخص</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
