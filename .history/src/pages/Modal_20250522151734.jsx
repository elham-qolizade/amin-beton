import React from "react";

export default function Modal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div id="news-section" className="bg-Bokara-Grey">
      <div className="container flex flex-col gap-10 py-10 md:py-20">
        <div>
          <h2 className="text-3xl font-medium text-center text-white md:text-4xl font-custom">
            اخبار
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 px-6 md:mt-10">
          {loading ? (
            <p className="text-white">در حال بارگذاری...</p>
          ) : !news || news.length === 0 ? (
            <p className="text-white">خبری موجود نیست.</p>
          ) : (
            news.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-xs overflow-hidden transition-transform duration-300 bg-white shadow-lg cursor-pointer rounded-2xl hover:scale-105"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                {/* عکس خبر */}
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title || "بدون عنوان"}
                  className="object-cover w-full aspect-video"
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

        <div className="flex flex-row items-center justify-center gap-2 mt-6 text-white transition-colors cursor-pointer group hover:text-School-Bus">
          <span
            onClick={handleAllNewsClick}
            className="text-lg font-medium md:text-xl group-hover:underline"
          >
            همه اخبار
          </span>
          <FaArrowLeftLong className="transition-transform group-hover:-translate-x-1 text-School-Bus" />
        </div>
      </div>
    </div>
  );
}
