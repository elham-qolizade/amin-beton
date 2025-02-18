import React from "react";
import ProgressCircle from "../ui/ProgressCircl";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import { VehicleTracking } from "../constans/index";
import ButtonProjectComponent from "../ui/ButtonProject";
import MapComponent from "../ui/MapComponent";
export default function HistoryProject() {
  return (
    <div className="container px-4">
      <HeaderNav className="bg-Armor-Wash" />
      <ProjectHeading
        title="نام پروژه"
        subtitles={["آدرس پروژه", "وضیعت", "تاریخ اخرین خرید"]}
        date="1402/11/10"
      />

      <div className="flex flex-col pt-10 bg-b-gray">
        {/* دایره پیشرفت در موبایل بالاتر از همه نمایش داده می‌شود */}
        <div className="flex justify-center mb-6 md:hidden order-first">
          <ProgressCircle className="w-60 h-60" percentage={14} />
        </div>

        {/* اطلاعات خرید */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-b-gray">
          <div className="flex flex-col gap-4 px-2 text-right">
            <div className="py-2 border-b border-white">
              <p className="text-School-Bus text-sm md:text-base">
                ارسال این خرید در تاریخ 1402/10/22 و ساعت 12:30 ثبت شد
              </p>
            </div>
            <div className="flex flex-col py-2 border-b border-white text-School-Bus text-sm md:text-base">
              <span>1 مترمکعب</span>
              <span>1 مترمکعب مرجوعی</span>
              <span>تعداد ماشین</span>
            </div>

            {/* دانلود پیش فاکتور و فاکتور */}
            <div className="flex flex-col gap-2 py-6 text-white border-b border-white">
              <span>پیش فاکتور</span>
              <ButtonProjectComponent className="text-sm px-3 py-2 md:text-base md:px-5 md:py-3">
                دانلود پیش فاکتور
              </ButtonProjectComponent>

              <span>فاکتور</span>
              <ButtonProjectComponent className="text-sm px-3 py-2 md:text-base md:px-5 md:py-3">
                دانلود فاکتور
              </ButtonProjectComponent>
            </div>

            {/* آزمایشگاه */}
            <div className="text-white">
              <h4 className="py-2 text-lg md:text-xl">آزمایشگاه</h4>
              <ul className="flex flex-wrap gap-4 text-sm md:text-base">
                <li>آزمایش 3 روزه</li>
                <li>آزمایش 7 روزه</li>
                <li>آزمایش 14 روزه</li>
              </ul>

              <div className="flex flex-col gap-2 mt-4">
                <ButtonProjectComponent className="text-sm px-3 py-2 md:text-base md:px-5 md:py-3">
                  دانلود فایل
                </ButtonProjectComponent>
                <ButtonProjectComponent className="text-sm px-3 py-2 md:text-base md:px-5 md:py-3">
                  دانلود گزارش
                </ButtonProjectComponent>
              </div>
            </div>
          </div>

          {/* دایره پیشرفت فقط در دسکتاپ در کنار اطلاعات باقی بماند */}
          <div className="hidden md:flex justify-center">
            <ProgressCircle className="w-60 h-60" percentage={14} />
          </div>
        </div>

        {/* رهگیری ماشین‌ها */}
        <div className="p-4 text-white bg-gray-800 rounded-lg mt-6">
          <h2 className="text-lg font-semibold text-center md:text-right">
            رهگیری ماشین‌ها
          </h2>
          <div className="grid grid-cols-1 gap-6 mt-4 py-6 md:grid-cols-2">
            {VehicleTracking.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-4 text-right bg-gray-800 border border-gray-500 rounded-lg"
              >
                <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                <p className="py-2 font-medium text-School-Bus text-sm md:text-base">
                  در مسیر
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                  {/* اطلاعات ماشین */}
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm md:text-base">
                      شماره پلاک: {vehicle.plate}
                    </p>
                    <p className="text-gray-300 text-sm md:text-base">
                      نام راننده: {vehicle.driver}
                    </p>
                    <p className="text-gray-300 text-sm md:text-base">
                      شماره بارنامه: {vehicle.waybill}
                    </p>
                  </div>

                  {/* اطلاعات بار */}
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm md:text-base">
                      حجم بار: {vehicle.load}
                    </p>
                    <p className="text-gray-300 text-sm md:text-base">
                      حجم بار تا این ماشین: {vehicle.totalLoad}
                    </p>
                    <p className="text-gray-300 text-sm md:text-base">
                      ساعت خروج: {vehicle.exitTime}
                    </p>
                  </div>

                  {/* نقشه */}
                  <div className="flex justify-center">
                    <MapComponent
                      width="150px"
                      height="150px"
                      className="md:w-52 md:h-52"
                    />
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
