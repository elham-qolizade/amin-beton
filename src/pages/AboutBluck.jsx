import React from "react";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";

export default function AboutBluck() {
  return (
    <div className="container">
      <div className="bg-Bokara-Grey">
        <div>
          <HeaderNav />
          <ProjectHeading
            className="flex flex-col items-center text-School-Bus "
            title="بلوک های بتنی"
            subtitles={[
              "بلوک های بتنی با کیفیت برای ساخت دیوار های مقاوم و پایدار",
            ]}
          />
        </div>

        <div className="flex flex-col gap-4 px-10 py-10 ">
          <p className="text-white text-start ">
            بلوک‌های بتنی ما با استفاده از جدیدترین فناوری‌ها و بهترین مواد
            اولیه تولید می‌شوند تا استانداردهای کیفی بالا را برآورده کنند. این
            بلوک‌ها برای ساخت دیوارهای داخلی و خارجی در ساختمان‌های مسکونی،
            تجاری و صنعتی مناسب هستند. ویژگی‌های برجسته این بلوک‌ها شامل موارد
            زیر است:
          </p>
          <p className="text-School-Bus  pe-[50rem]  ">
            استحکام و دوام بالا: مقاومت فوق‌العاده در برابر فشار و ضربه عایق
            حرارتی و صوتی مناسب: کاهش هزینه‌های انرژی و بهبود راحتی اندازه‌ها و
            طرح‌های متنوع: از بلوک‌های سبک تا بلوک‌های سنگین برای کاربردهای خاص.
          </p>
        </div>
        <div>
          <ProjectHeading />
        </div>

        <div>
          <p className="py-10 text-white">
            بلوک‌های بتنی ما می‌توانند به بهبود سرعت ساخت، کاهش هزینه‌ها و
            افزایش کیفیت کلی پروژه شما کمک کنند. برای مشاوره و انتخاب بهترین
            محصول، با تیم ما تماس بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
}
