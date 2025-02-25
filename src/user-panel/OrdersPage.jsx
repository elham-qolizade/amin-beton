// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ButtonProject from "../ui/ButtonProject";
// import HeaderNav from "../ui/HeadingNav";
// import ProjectHeading from "../ui/projectHeading";
// import { useNavigate } from "react-router-dom";

// export default function OrdersPage() {
//   const navigate = useNavigate();
//   const [purchases, setPurchases] = useState([]); // ذخیره لیست خریدها
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // واکشی داده‌ها از API
//   useEffect(() => {
//     axios
//       .get("https://amin-beton-back.chbk.app/api/orders/")
//       .then((res) => {
//         setPurchases(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("خطا در دریافت لیست خریدها:", err);
//         setError("دریافت اطلاعات با مشکل مواجه شد.");
//         setLoading(false);
//       });
//   }, []);

//   // حذف طبقات 6 و 7 در موبایل و نمایش فقط دو آیتم اول
//   const filteredPurchases = purchases.filter(
//     (purchase) => purchase.floor !== "طبقه 6" && purchase.floor !== "طبقه 7"
//   );
//   const visiblePurchases =
//     window.innerWidth < 768 ? filteredPurchases.slice(0, 2) : purchases;

//   return (
//     <div className="min-h-screen overflow-x-hidden bg-Bokara-Grey">
//       <div className="mx-auto">
//         <HeaderNav className="bg-Armor-Wash" />
//         <ProjectHeading
//           title="نام پروژه"
//           subtitles={["آدرس پروژه", "وضیعت", "تاریخ آخرین خرید"]}
//           date="1402/11/10"
//         />

//         {/* دکمه‌های بالای لیست خرید */}
//         <div className="container flex px-4 flex-row justify-between gap-4 my-10">
//           <div className="flex flex-col gap-4 sm:flex-row md:items-center">
//             <h2 className="text-lg text-white md:text-2xl">
//               لیست خریدهای پروژه
//             </h2>
//             <div className="flex flex-col gap-4 sm:flex-row">
//               <ButtonProject
//                 className="text-sm w-36"
//                 onClick={() => navigate("/SaleProject")}
//               >
//                 <span className="text-xl">+</span> خرید برای این پروژه
//               </ButtonProject>
//               <ButtonProject
//                 className="self-center h-8 px-0 py-0 text-sm md:self-auto w-36"
//                 onClick={() => navigate("/HistoryProject")}
//               >
//                 تاریخچه خریدهای پروژه
//               </ButtonProject>
//             </div>
//           </div>
//           <ButtonProject
//             className="self-center h-8 px-0 py-0 text-sm md:self-auto w-36"
//             onClick={() => navigate("/ProjectPage")}
//           >
//             بازگشت به صفحه پروژه‌ها
//           </ButtonProject>
//         </div>

//         {/* نمایش وضعیت بارگذاری یا خطا */}
//         {loading && (
//           <p className="text-white text-center">در حال دریافت اطلاعات...</p>
//         )}
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {/* لیست خریدها */}
//         {!loading && !error && (
//           <div className="flex flex-col items-center px-6 py-8">
//             <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
//               {visiblePurchases.map((purchase) => (
//                 <div
//                   key={purchase.id}
//                   className="flex flex-col w-full gap-4 px-5 py-8 text-white bg-gray-800 border rounded-sm cursor-pointer md:flex-row md:gap-20"
//                 >
//                   <div className="flex flex-col flex-1 gap-2 pb-5 text-start md:text-right">
//                     <div className="flex justify-between md:gap-10">
//                       <h2 className="font-bold hover:text-yellow-500">
//                         {purchase.floor}
//                       </h2>
//                       <p className="text-sm">{purchase.status}</p>
//                     </div>
//                     <p className="text-sm">{purchase.name}</p>
//                     <p className="text-sm">{purchase.order}</p>
//                     <p className="text-sm">{purchase.delivery}</p>
//                   </div>
//                   <div className="flex flex-col justify-center gap-2 text-sm md:items-center text-start">
//                     <p>{purchase.details}</p>
//                     <p>{purchase.number}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React from "react";
import ButtonProject from "../ui/ButtonProject";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import { purchases } from "../constans/index";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const navigate = useNavigate();
  const handleProjectClick = (projectId) => {
    // هدایت به صفحه تاریخچه پروژه با استفاده از شناسه پروژه
    navigate(`/HistoryProject`);
  };

  // حذف طبقات 6 و 7 در موبایل و نمایش فقط دو آیتم اول
  const filteredPurchases = purchases.filter(
    (purchase) => purchase.floor !== "طبقه 6" && purchase.floor !== "طبقه 7"
  );
  const visiblePurchases =
    window.innerWidth < 768 ? filteredPurchases.slice(0, 2) : purchases;

  return (
    <div className="min-h-screen overflow-x-hidden bg-Bokara-Grey">
      <div className="mx-auto ">
        <HeaderNav className="bg-Armor-Wash" />
        <ProjectHeading
          title="نام پروژه"
          subtitles={["آدرس پروژه", "وضیعت", "تاریخ اخرین خرید"]}
          date="1402/11/10"
        />

        {/* دکمه‌های بالای لیست خرید */}
        <div className="container flex px-4 flex-row justify-between gap-4 my-10">
          <div className="flex flex-col gap-4 sm:flex-row md:items-center">
            <h2 className="text-lg text-white md:text-2xl">
              لیست خریدهای پروژه
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <ButtonProject
                className="text-sm w-36"
                onClick={() => navigate("/SaleProject")}
              >
                <span className="text-xl ">+</span> خرید برای این پروژه
              </ButtonProject>
              <ButtonProject
                className="self-center h-8 px-0 py-0 text-sm md:self-auto w-36"
                onClick={() => navigate("/HistoryProject")}
              >
                تاریخچه خریدهای پروژه
              </ButtonProject>
            </div>
          </div>
          <ButtonProject
            className="self-center h-8 px-0 py-0 text-sm md:self-auto w-36"
            onClick={() => navigate("/ProjectPage")}
          >
            بازگشت به صفحه پروژه‌ها
          </ButtonProject>
        </div>

        {/* لیست خریدها */}
        <div className="flex flex-col items-center px-6 py-8">
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {visiblePurchases.map((purchase) => (
              <div
                key={purchase.id}
                onClick={() => handleProjectClick(projectId)}
                className="flex flex-col w-full gap-4 px-5 py-8 text-white bg-gray-800 border rounded-sm cursor-pointer md:flex-row md:gap-20"
              >
                <div className="flex flex-col flex-1 gap-2 pb-5 text-start md:text-right">
                  <div className="flex justify-between md:gap-10">
                    <h2 className="font-bold hover:text-yellow-500">
                      {purchase.floor}
                    </h2>
                    <p className="text-sm">{purchase.status}</p>
                  </div>
                  <p className="text-sm">{purchase.name}</p>
                  <p className="text-sm">{purchase.order}</p>
                  <p className="text-sm">{purchase.delivery}</p>
                </div>
                <div className="flex flex-col justify-center gap-2 text-sm md:items-center text-start">
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
