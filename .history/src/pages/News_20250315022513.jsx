import React, { useEffect, useState } from "react";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await axios.get(
          "http://amin-beton-back.chbk.app/api/news/"
        );

        console.log("تمام اخبار:", response.data);

        const results = response.data.results || response.data; // اگه دیتا توی results باشه
        if (Array.isArray(results)) {
          setNewsList(results);
        } else {
          setNewsList([]);
        }
      } catch (error) {
        console.error("خطا در دریافت اخبار:", error);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "تاریخ نامشخص";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR"); // فرمت شمسی
  };

  return (
    <div className="min-h-screen bg-Bokara-Grey">
      <div>
        <HeaderNav />
        <ProjectHeading className="flex flex-col justify-center text-center text-School-Bus" />
      </div>

      <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-10 py-10 md:py-20">
            <div>
              <h2 className="text-3xl font-medium text-center md:text-4xl text-School-Bus font-custom">
                اخبار
              </h2>
            </div>

            <div className="flex flex-col items-center justify-center gap-10 px-4 md:px-10 sm:flex-row sm:flex-wrap">
              {loading ? (
                <p className="text-white">در حال بارگذاری...</p>
              ) : newsList.length === 0 ? (
                <p className="text-white">خبری موجود نیست.</p>
              ) : (
                newsList.map((item) => (
                  <div
                    key={item.id}
                    className="w-full overflow-hidden transition-transform duration-300 bg-white shadow-lg cursor-pointer rounded-2xl sm:w-72 hover:scale-105"
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.title || "بدون عنوان"}
                      className="object-cover w-full h-48"
                    />

                    <div className="flex flex-col gap-2 p-4">
                      <h3 className="text-lg font-semibold text-Bokara-Grey">
                        {item.title || "عنوان نامشخص"}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-3">
                        {item.summary || "خلاصه‌ای موجود نیست."}
                      </p>

                      <span className="text-xs text-gray-400">
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
