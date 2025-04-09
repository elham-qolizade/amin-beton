import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";

export default function AboutBluck() {
  return (
    <div className="min-h-screen bg-Bokara-Grey">
      <div>
        <HeaderNav />
        <ProjectHeading
          className="flex flex-col justify-center text-center text-School-Bus"
          title="بلوک های بتنی"
          subtitles={[
            "بلوک های بتنی با کیفیت برای ساخت دیوار های مقاوم و پایدار",
          ]}
        />
      </div>

      <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-10">
        {/* بازگشت به صفحه قبل */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-lg text-School-Bus"
          >
            <FaArrowRightLong /> بازگشت
          </button>
        </div>

        {/* محتوا */}
        <div className="flex flex-col gap-4 text-white text-start">
          <p className="text-sm sm:text-base md:text-lg">
            بلوک‌های بتنی ما با استفاده از جدیدترین فناوری‌ها و بهترین مواد
            اولیه تولید می‌شوند تا استانداردهای کیفی بالا را برآورده کنند. این
            بلوک‌ها برای ساخت دیوارهای داخلی و خارجی در ساختمان‌های مسکونی،
            تجاری و صنعتی مناسب هستند. ویژگی‌های برجسته این بلوک‌ها شامل موارد
            زیر است:
          </p>
          <p className="text-School-Bus text-sm sm:text-base md:text-lg pe-4 sm:pe-6 lg:pe-[50rem]">
            <strong>استحکام و دوام بالا:</strong> مقاومت فوق‌العاده در برابر
            فشار و ضربه
            <br />
            <strong>عایق حرارتی و صوتی مناسب:</strong> کاهش هزینه‌های انرژی و
            بهبود راحتی
            <br />
            <strong>اندازه‌ها و طرح‌های متنوع:</strong> از بلوک‌های سبک تا
            بلوک‌های سنگین برای کاربردهای خاص.
          </p>
        </div>

        <div className="flex flex-col gap-4 py-10">
          <p className="text-sm text-white sm:text-base md:text-lg">
            بلوک‌های بتنی ما می‌توانند به بهبود سرعت ساخت، کاهش هزینه‌ها و
            افزایش کیفیت کلی پروژه شما کمک کنند. برای مشاوره و انتخاب بهترین
            محصول، با تیم ما تماس بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
}
