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

        <div className="flex flex-wrap justify-center gap-8 px-4 md:px-10">
          {loading ? (
            <p className="text-white">در حال بارگذاری...</p>
          ) : !news || news.length === 0 ? (
            <p className="text-white">خبری موجود نیست.</p>
          ) : (
            news.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-[300px] bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/news/${item.id}`)}
                style={{ minHeight: "430px" }} // یکدست کردن ارتفاع کارت‌ها
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title || "بدون عنوان"}
                  className="object-cover w-full aspect-video"
                />

                <div className="flex flex-col justify-between flex-1 gap-3 p-4">
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-Bokara-Grey">
                      {item.title || "عنوان نامشخص"}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item.summary || "خلاصه‌ای موجود نیست."}
                    </p>
                  </div>

                  <span className="mt-auto text-xs text-gray-400">
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-row items-center justify-center gap-2 mt-8 text-white transition cursor-pointer group hover:text-School-Bus">
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
