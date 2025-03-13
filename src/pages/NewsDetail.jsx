import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";

export default function NewsDetail() {
  const { news_id } = useParams(); // گرفتن آیدی از URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(
          `http://amin-beton-back.chbk.app/api/news/${news_id}/`
        );

        console.log("News Detail:", response.data);

        // داده دریافتی از API
        const apiData = response.data;

        // فیلدی که می‌خوایم content باشه به جای news_text
        const mappedData = {
          ...apiData,
          content: apiData.news_text,
        };

        setNews(mappedData);
      } catch (error) {
        console.error("خطا در دریافت جزئیات خبر:", error);
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
      <div className="min-h-screen bg-Bokara-Grey flex items-center justify-center">
        <p className="text-white">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-Bokara-Grey flex flex-col items-center justify-center gap-4">
        <p className="text-white">خبر پیدا نشد.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-School-Bus flex items-center gap-2"
        >
          <FaArrowRightLong /> بازگشت
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-Bokara-Grey text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-School-Bus flex items-center gap-2 text-lg"
          >
            <FaArrowRightLong /> بازگشت
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-School-Bus font-custom">
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

        <div className="text-sm text-gray-400 mb-6 text-center">
          تاریخ انتشار: {formatDate(news.created_at)}
        </div>

        <div className="prose prose-lg prose-invert max-w-none leading-8 text-justify">
          {news.content || "محتوایی برای این خبر موجود نیست."}
        </div>
      </div>
    </div>
  );
}
