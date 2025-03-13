import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function NewsLanding() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://amin-beton-back.chbk.app/api/news/?count=4"
        );

        console.log("News API Response:", response.data);

        // چون داده به شکل آرایه است، مستقیم ست می‌کنیم
        const results = response.data.results || response.data;

        if (Array.isArray(results)) {
          setNews(results);
        } else {
          console.warn("News data is not an array!", results);
          setNews([]);
        }
      } catch (error) {
        console.error("خطا در دریافت اخبار:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleAllNewsClick = () => {
    navigate("/news");
  };

  // تابع برای فرمت کردن تاریخ (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return "تاریخ نامشخص";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR"); // تاریخ شمسی؛ می‌تونی تغییر بدی میلادی اگه خواستی
  };

  return (
    <div id="news-section" className="bg-Bokara-Grey">
      <div className="container flex flex-col gap-10 py-10 md:py-20">
        <div>
          <h2 className="text-3xl font-medium text-center text-white md:text-4xl font-custom">
            اخبار
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 px-10 md:mt-10 sm:flex-row sm:flex-wrap">
          {loading ? (
            <p className="text-white">در حال بارگذاری...</p>
          ) : !news || news.length === 0 ? (
            <p className="text-white">خبری موجود نیست.</p>
          ) : (
            news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden w-full sm:w-72 hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                {/* عکس خبر */}
                <img
                  src={item.image || "/placeholder.jpg"} // اگه عکسی نبود، یه پیش‌فرض بذار
                  alt={item.title || "بدون عنوان"}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 flex flex-col gap-2">
                  {/* عنوان خبر */}
                  <h3 className="text-lg font-semibold text-Bokara-Grey">
                    {item.title || "عنوان نامشخص"}
                  </h3>

                  {/* خلاصه خبر */}
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.summary || "خلاصه‌ای موجود نیست."}
                  </p>

                  {/* تاریخ ایجاد */}
                  <span className="text-xs text-gray-400">
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-row items-center justify-center gap-3 md:mt-4">
          <span
            onClick={handleAllNewsClick}
            className="text-lg cursor-pointer text-School-Bus md:text-2xl"
          >
            همه اخبار
          </span>
          <FaArrowLeftLong className="text-School-Bus" />
        </div>
      </div>
    </div>
  );
}
