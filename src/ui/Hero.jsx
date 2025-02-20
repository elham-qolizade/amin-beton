import HeaderNav from "./HeadingNav";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { slider } from "../constans/index";
import { Autoplay, Pagination } from "swiper/modules";

export default function Hero() {
  const [backgroundImage, setBackgroundImage] = useState(
    slider[0]?.backgroundImage || ""
  );

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex % slider.length;
    setBackgroundImage(slider[newIndex]?.backgroundImage || "");
  };

  return (
    <div
      className="hero"
      style={{
        background: `url(${backgroundImage}) center center / cover no-repeat`,
      }}
    >
      <HeaderNav className="" />
      <div className="container flex items-center justify-center mx-auto md:py-20 ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Pagination]}
          className="w-full p-0 pt-10" // حذف padding اضافی
        >
          {slider.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center pb-10 sm:pb-40"
            >
              <div className="flex flex-col items-center justify-center text-white sm:flex-row">
                <div className="w-full pb-10 text-start sm:pb-0 sm:text-center sm:w-1/2">
                  <h1 className="text-2xl font-medium text-School-Bus ps-10 sm:ps-0 sm:hidden ">
                    امین بتن
                  </h1>
                  <h2 className="text-xl sm:text-5xl sm:ps-0 ps-10">
                    {slide.title}
                  </h2>
                </div>

                <div className="flex flex-col w-full gap-2 pb-10 text-start sm:pb-0 sm:gap-10 sm:px-10 sm:w-1/2">
                  <span className="text-sm text-start sm:text-xl sm:text-center ">
                    {slide.p1}
                  </span>
                  <span className="text-sm text-start sm:text-xl sm:text-center">
                    {slide.p2}
                  </span>
                  <span className="text-sm text-start sm:text-xl sm:text-center">
                    {slide.p3}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
