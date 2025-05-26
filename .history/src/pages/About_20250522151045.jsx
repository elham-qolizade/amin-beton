import React from "react";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";

export default function About() {
  return (
    <div className="min-h-screen bg-Bokara-Grey">
      <div>
        <HeaderNav />
        <ProjectHeading className="flex flex-col justify-center text-center text-School-Bus" />
      </div>

      <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 text-white text-start">
          <p className="text-sm sm:text-base md:text-lg">
            کارخانه امین بتن با اتکا به سال‌ها تجربه و دانش تخصصی در زمینه تولید
            بتن آماده، به عنوان یکی از تولیدکنندگان معتبر در صنعت ساختمان کشور
            شناخته می‌شود. این مجموعه با بهره‌گیری از ماشین‌آلات پیشرفته، مواد
            اولیه باکیفیت و نیروی انسانی مجرب، همواره در تلاش است تا محصولاتی
            مطابق با استانداردهای ملی و بین‌المللی ارائه دهد. هدف ما در امین
            بتن، تأمین بتن با کیفیت پایدار، تحویل به‌موقع و پشتیبانی فنی دقیق در
            کلیه پروژه‌های عمرانی، ساختمانی و صنعتی می‌باشد. ما به عنوان یک شریک
            قابل اعتماد در صنعت ساخت‌وساز، متعهد به جلب رضایت مشتریان و ارتقاء
            مداوم کیفیت خدمات خود هستیم.
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

        <div className="mt-6">
          <ProjectHeading />
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
