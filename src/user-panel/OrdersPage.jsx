import React from "react";
import ButtonProject from "../ui/ButtonProject";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import { purchases } from "../constans/index";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const navigate = useNavigate();

  // حذف طبقات 6 و 7 در موبایل و نمایش فقط دو آیتم اول
  const filteredPurchases = purchases.filter(
    (purchase) => purchase.floor !== "طبقه 6" && purchase.floor !== "طبقه 7"
  );
  const visiblePurchases =
    window.innerWidth < 768 ? filteredPurchases.slice(0, 2) : purchases;

  return (
    <div className="bg-Bokara-Grey min-h-screen overflow-x-hidden">
      <div className="container mx-auto ">
        <HeaderNav className="bg-Armor-Wash" />
        <ProjectHeading
          title="نام پروژه"
          subtitles={["آدرس پروژه", "وضیعت", "تاریخ اخرین خرید"]}
          date="1402/11/10"
        />

        {/* دکمه‌های بالای لیست خرید */}
        <div className="flex flex-row justify-between px-4 my-10 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 md:items-center">
            <h2 className="md:text-2xl text-lg text-white">
              لیست خریدهای پروژه
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <ButtonProject
                className="w-36 h-8 px-0 py-0 text-sm"
                onClick={() => navigate("/SaleProject")}
              >
                <span className="pl-2 text-xl">+</span> خرید برای این پروژه
              </ButtonProject>
              <ButtonProject
                className="w-36 h-8 px-0 py-0 text-sm"
                onClick={() => navigate("/HistoryProject")}
              >
                تاریخچه خریدهای پروژه
              </ButtonProject>
            </div>
          </div>
          <ButtonProject
            className="self-center md:self-auto w-36 h-8 px-0 py-0 text-sm"
            onClick={() => navigate("/ProjectPage")}
          >
            بازگشت به صفحه پروژه‌ها
          </ButtonProject>
        </div>

        {/* لیست خریدها */}
        <div className="flex flex-col items-center py-10">
          <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-6">
            {visiblePurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex flex-col md:flex-row w-full gap-4 px-5 py-8 text-white bg-gray-800 border rounded-lg shadow-lg cursor-pointer md:gap-20"
              >
                <div className="flex flex-col flex-1 gap-2 text-center md:text-right">
                  <div className="flex justify-between md:gap-10">
                    <h2 className="font-bold hover:text-yellow-500">
                      {purchase.floor}
                    </h2>
                    <p>{purchase.status}</p>
                  </div>
                  <p>{purchase.name}</p>
                  <p>{purchase.delivery}</p>
                  <p>{purchase.order}</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <p>{purchase.details}</p>
                  <p>{purchase.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
