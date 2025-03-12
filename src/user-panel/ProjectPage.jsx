import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import ButtonProject from "../ui/ButtonProject";

// تابع برای بررسی اعتبار توکن و دریافت اطلاعات کاربر
const checkTokenValidity = async (navigate, setUserData) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // اگر توکن وجود نداشت، کاربر را به صفحه ورود ریدایرکت کن
    navigate("/login");
    return false;
  }

  try {
    // درخواست به endpoint برای بررسی توکن و دریافت اطلاعات کاربر
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
      // توکن معتبر است، اطلاعات کاربر را ذخیره کن
      const userData = await response.json();
      setUserData(userData); // ذخیره اطلاعات کاربر در state
      return true;
    }

    // اگر کد وضعیت 401 یا 403 بود، توکن معتبر نیست
    if (response.status === 401 || response.status === 403) {
      navigate("/login");
      return false;
    }

    // در صورت دریافت کد وضعیت دیگر
    throw new Error("خطا در بررسی اعتبار توکن");
  } catch (error) {
    console.error(error);
    navigate("/login");
    return false;
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    nationalCode: "",
    lastLogin: "",
    activeProjectsCount: 0,
  });

  // واکشی داده‌ها از API برای پروژه‌ها
  const fetchProjects = async () => {
    const tokenIsValid = await checkTokenValidity(navigate, setUserData);
    if (!tokenIsValid) return; // اگر توکن معتبر نباشد، داده‌ها را بارگذاری نمی‌کنیم.

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
      console.log("داده‌های دریافتی از API:", response.data);

      setProjects(response.data);
    } catch (err) {
      console.error("خطا در دریافت لیست پروژه‌ها:", err);
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
            "نام کاربری: " + userData.first_name,
            "کد ملی: " + userData.nationalCode,
          ]}
          date="1402/11/10"
        />
        <div className="container flex flex-col justify-between py-6 mt-4 border-b border-white md:flex-row">
          <div className="flex items-center justify-center mt-4 md:mt-0">
            <ButtonProject
              className="py-1 w-36"
              onClick={() => navigate("/Addproject")}
            >
              افزودن پروژه
            </ButtonProject>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 px-8 py-10 cursor-pointer md:grid-cols-2 md:px-32">
          {/* نمایش پروژه‌ها */}
          {projects.length === 0 ? (
            <p className="text-center text-white">هیچ پروژه‌ای پیدا نشد.</p>
          ) : (
            projects.map((data) => (
              <div
                onClick={() => navigate(`/OrdersPage/${data.id}`)}
                key={data.id}
                className="relative flex flex-col items-center justify-center h-40 gap-10 text-white rounded-lg shadow-lg product-card md:h-60"
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
