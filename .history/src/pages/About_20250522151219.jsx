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
        </div>

        <div className="mt-6">
          <ProjectHeading />
        </div>

        <div className="flex flex-col gap-4 py-10">
          <p className="text-sm text-School-Bus sm:text-base md:text-lg">
            از ساختمان‌های بلندمرتبه تا پروژه‌های زیرساختی، ما همواره در کنار
            سازندگان هستیم — با بتنی که قابل اعتماد است.
          </p>
        </div>
      </div>
    </div>
  );
}
