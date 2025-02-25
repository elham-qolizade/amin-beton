// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProgressCircle from "../ui/ProgressCircl";
// import HeaderNav from "../ui/HeadingNav";
// import ProjectHeading from "../ui/projectHeading";
// import ButtonProject from "../ui/ButtonProject";
// import MapComponent from "../ui/MapComponent";
// import { MdOutlineFileDownload } from "react-icons/md";

// export default function HistoryProject() {
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTest, setSelectedTest] = useState(null);

//   const selectTest = (test) => setSelectedTest(test);
//   const tests = ["آزمایش 3 روزه", "آزمایش 7 روزه", "آزمایش 14 روزه"];

//   // // دریافت اطلاعات از API
//   // useEffect(() => {
//   //   axios
//   //     .get("http://amin-beton-back.chbk.app/api/orders/get-order-invoices/")
//   //     .then((res) => {
//   //       setInvoice(res.data[0]); // فقط یک فاکتور را نمایش بده
//   //       setLoading(false);
//   //     })
//   //     .catch((err) => {
//   //       console.error("خطا در دریافت اطلاعات فاکتور:", err);
//   //       setError("دریافت اطلاعات با مشکل مواجه شد.");
//   //       setLoading(false);
//   //     });
//   // }, []);

//   return (
//     <div className="min-h-screen bg-b-gray">
//       <HeaderNav className="mx-auto" />
//       <ProjectHeading
//         title="تاریخچه پروژه"
//         subtitles={["آدرس پروژه", "وضعیت", "تاریخ آخرین خرید"]}
//         date="1402/11/10"
//       />

//       <div className="flex flex-col pt-10 px-4 container">
//         {loading && (
//           <p className="text-white text-center">در حال دریافت اطلاعات...</p>
//         )}
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {!loading && !error && invoice && (
//           <div className="md:grid flex flex-col-reverse gap-6 md:grid-cols-2">
//             <div className="flex flex-col gap-4 text-right">
//               <div className="py-2 border-b border-white">
//                 <p className="text-sm text-School-Bus md:text-base">
//                   ارسال این خرید در تاریخ {invoice.purchase_date} و ساعت{" "}
//                   {invoice.purchase_time} ثبت شد
//                 </p>
//               </div>
//               <div className="flex flex-col py-2 text-sm border-b border-white text-School-Bus md:text-base">
//                 <span>{invoice.volume} مترمکعب</span>
//                 <span>{invoice.returned_volume} مترمکعب مرجوعی</span>
//                 <span>تعداد ماشین: {invoice.vehicle_count}</span>
//               </div>

//               {/* دکمه‌های دانلود */}
//               <div className="flex flex-col gap-2 py-6 text-white border-b border-white">
//                 <span>پیش فاکتور</span>
//                 <ButtonProject className="flex flex-row items-center w-36 justify-around gap-4 py-1 text-white border-white md:w-36">
//                   دانلود پیش فاکتور
//                   <MdOutlineFileDownload />
//                 </ButtonProject>

//                 <span>فاکتور</span>
//                 <ButtonProject className="flex flex-row w-36 items-center justify-around gap-8 py-1 text-white border-white md:w-36">
//                   دانلود فاکتور
//                   <MdOutlineFileDownload />
//                 </ButtonProject>
//               </div>

//               {/* بخش آزمایشگاه */}
//               <div className="text-white">
//                 <h4 className="py-2 text-lg md:text-xl">آزمایشگاه</h4>
//                 <ul className="flex flex-wrap gap-4 text-sm">
//                   {tests.map((test) => (
//                     <li
//                       key={test}
//                       className="flex items-center gap-2 cursor-pointer"
//                       onClick={() => selectTest(test)}
//                     >
//                       {test}
//                       <div
//                         className={`w-4 h-4 flex items-center justify-center rounded-full border ${
//                           selectedTest === test ? "bg-School-Bus" : "bg-white"
//                         }`}
//                       >
//                         {selectedTest === test && (
//                           <span className="w-2 h-2 bg-white rounded-full"></span>
//                         )}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="flex flex-col gap-4 mt-4">
//                   <ButtonProject className="flex flex-row w-36 items-center justify-around gap-8 py-1 text-white border-white md:w-36">
//                     دانلود فایل
//                     <MdOutlineFileDownload />
//                   </ButtonProject>
//                   <ButtonProject className="flex w-36 flex-row items-center justify-around gap-8 py-1 text-white border-white md:w-36">
//                     دانلود گزارش
//                     <MdOutlineFileDownload />
//                   </ButtonProject>
//                 </div>
//               </div>
//             </div>

//             {/* نمایش درصد پیشرفت */}
//             <div className="justify-center md:flex">
//               <ProgressCircle
//                 className="w-60 h-60"
//                 percentage={invoice.progress}
//                 style={{ stroke: "School-Bus", zIndex: 10 }}
//               />
//             </div>
//           </div>
//         )}

//         {/* نمایش وضعیت ماشین‌ها */}
//         {!loading && !error && invoice && (
//           <div className="p-4 mt-6 text-white bg-gray-800 rounded-lg">
//             <h3 className="text-lg font-medium">وضعیت حمل‌ونقل</h3>
//             <div className="grid items-center grid-cols-1 gap-6 py-6 mt-4 md:grid-cols-2">
//               {invoice.vehicles.map((vehicle) => (
//                 <div
//                   key={vehicle.id}
//                   className="text-right p-3 py-6 border border-gray-500"
//                 >
//                   <div className="flex flex-row justify-between">
//                     <div className="flex flex-col">
//                       <h3 className="text-sm font-medium">{vehicle.name}</h3>
//                       <p className="py-2 text-sm font-thin text-School-Bus md:text-base">
//                         در مسیر
//                       </p>
//                       <div className="flex flex-col gap-3">
//                         <p className="text-sm font-thin">
//                           نام راننده: {vehicle.driver}
//                         </p>
//                         <p className="text-sm font-thin">
//                           شماره بارنامه: {vehicle.waybill}
//                         </p>
//                         <p className="text-sm font-thin">
//                           شماره پلاک: {vehicle.plate}
//                         </p>
//                         <p className="text-sm font-thin">
//                           حجم بار: {vehicle.load} مترمکعب
//                         </p>
//                         <p className="text-sm font-thin">
//                           ساعت خروج: {vehicle.exit_time}
//                         </p>
//                       </div>
//                     </div>

//                     {/* نمایش نقشه */}
//                     <div className="">
//                       <MapComponent width="200px" height="200px" />
//                     </div>
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
import React, { useState } from "react";
import ProgressCircle from "../ui/ProgressCircl";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import { VehicleTracking } from "../constans/index";
import ButtonProject from "../ui/ButtonProject";
import MapComponent from "../ui/MapComponent";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate

export default function HistoryProject() {
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate(); // استفاده از useNavigate

  const selectTest = (test) => {
    setSelectedTest(test);
  };

  const tests = ["آزمایش 3 روزه", "آزمایش ۷ روزه", "آزمایش ۱۴ روزه"];

  const handleProjectClick = () => {
    navigate("/historyProjectDetail"); // هدایت به صفحه تاریخچه پروژه
  };

  return (
    <div className="min-h-screen bg-b-gray">
      <HeaderNav className=" mx-auto" />
      <ProjectHeading
        title="نام پروژه"
        subtitles={["آدرس پروژه", "وضیعت", "تاریخ اخرین خرید"]}
        date="1402/11/10"
      />
      <div className="flex flex-col pt-10 px-4  container ">
        <div className="md:grid flex flex-col-reverse gap-6 md:grid-cols-2 ">
          <div className="flex flex-col gap-4 text-right">
            <div className="py-2 border-b border-white">
              <p className="text-sm text-School-Bus md:text-base">
                ارسال این خرید در تاریخ 1402/10/22 و ساعت 12:30 ثبت شد
              </p>
            </div>
            <div className="flex flex-col py-2 text-sm border-b border-white text-School-Bus md:text-base">
              <span>1 مترمکعب</span>
              <span>1 مترمکعب مرجوعی</span>
              <span>تعداد ماشین</span>
            </div>

            <div className="flex flex-col gap-2 py-6 text-white border-b border-white">
              <span>پیش فاکتور</span>
              <ButtonProject
                className="flex flex-row items-center  w-36 justify-around gap-4 px-1 py-1 text-white border-white md:w-36 "
                onClick={handleProjectClick}
              >
                دانلود پیش فاکتور
                <MdOutlineFileDownload />
              </ButtonProject>

              <span>فاکتور</span>
              <ButtonProject
                className="flex flex-row w-36 items-center justify-around gap-8 py-1 text-white border-white md:w-36 "
                onClick={handleProjectClick}
              >
                دانلود فاکتور
                <MdOutlineFileDownload />
              </ButtonProject>
            </div>

            <div className="text-white">
              <h4 className="py-2 text-lg md:text-xl">آزمایشگاه</h4>
              <ul className="flex flex-wrap gap-4 text-sm ">
                {tests.map((test) => (
                  <li
                    key={test}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => selectTest(test)}
                  >
                    {test}
                    <div
                      className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                        selectedTest === test ? "bg-School-Bus" : "bg-white"
                      }`}
                    >
                      {selectedTest === test && (
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 mt-4">
                <ButtonProject
                  className="flex flex-row  w-36 items-center justify-around gap-8 py-1 text-white border-white md:w-36 "
                  onClick={handleProjectClick}
                >
                  دانلود فایل
                  <MdOutlineFileDownload />
                </ButtonProject>
                <ButtonProject
                  className="flex w-36 flex-row items-center justify-around gap-8 py-1 text-white border-white md:w-36 "
                  onClick={handleProjectClick}
                >
                  دانلود گزارش
                  <MdOutlineFileDownload />
                </ButtonProject>
              </div>
            </div>
          </div>

          <div className="justify-center md:p-0 px-3 md:flex">
            <ProgressCircle
              className="md:w-60  h-60"
              percentage={14}
              style={{ stroke: "School-Bus", zIndex: 10 }}
            />
          </div>
        </div>

        <div className="p-4 mt-6 text-white bg-gray-800 rounded-lg">
          <div className="grid items-center grid-cols-1 gap-6 py-6 mt-4 md:grid-cols-2">
            {VehicleTracking.map((vehicle) => (
              <div
                key={vehicle.id}
                className=" text-right p-3 py-6  border border-gray-500 "
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium ">{vehicle.name}</h3>
                      <p className="py-2 text-sm font-thin text-School-Bus md:text-base">
                        در مسیر
                      </p>
                    </div>

                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      <div className="flex flex-col gap-3">
                        <p className="text-sm font-thin ">
                          نام راننده: {vehicle.driver}
                        </p>
                        <p className="text-sm font-thin ">
                          شماره بارنامه: {vehicle.waybill}
                        </p>
                        <p className="text-sm font-thin ">
                          شماره پلاک: {vehicle.plate}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <p className="text-sm font-thin">
                          حجم بار: {vehicle.load}
                        </p>
                        <p className="text-sm font-thin">
                          حجم بار تا این ماشین: {vehicle.totalLoad}
                        </p>
                        <p className="text-sm font-thin">
                          ساعت خروج: {vehicle.exitTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <MapComponent width="200px" height="200px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
