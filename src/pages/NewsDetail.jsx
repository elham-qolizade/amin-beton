import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";

export default function NewsDetail() {
  const { news_id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(
          `https://amin-beton-back.chbk.app/api/news/${news_id}/`
        );

        console.log("🔵 Full API Response:", response.data);

        const apiData = response.data;

        const mappedData = {
          ...apiData,
          content: apiData.content || "محتوایی برای این خبر موجود نیست.",
        };

        console.log("🟡 Mapped Content:", mappedData.content);

        setNews(mappedData);
      } catch (error) {
        console.error("❌ خطا در دریافت جزئیات خبر:", error);
        setNews(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [news_id]);

  const formatDate = (dateString) => {
    if (!dateString) return "تاریخ نامشخص";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-Bokara-Grey">
        <p className="text-white">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-Bokara-Grey">
        <p className="text-white">خبر پیدا نشد.</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-School-Bus"
        >
          <FaArrowRightLong /> بازگشت
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-Bokara-Grey">
      <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-10">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-lg text-School-Bus"
          >
            <FaArrowRightLong /> بازگشت
          </button>
        </div>

        <h1 className="mb-8 text-3xl font-bold text-center md:text-4xl text-School-Bus font-custom">
          {news.title || "عنوان نامشخص"}
        </h1>

        {news.image && (
          <div className="w-full mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-md"
            />
          </div>
        )}

        <div className="mb-6 text-sm text-center text-gray-400">
          تاریخ انتشار: {formatDate(news.created_at)}
        </div>

        {/* ✅ محدوده نمایش content به صورت HTML */}
        <div className="max-w-4xl p-6 mx-auto border shadow-md bg-Bokara-Grey border-School-Bus rounded-2xl">
          <div
            className="leading-8 prose text-justify prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>
      </div>
    </div>
  );
}
