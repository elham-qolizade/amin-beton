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
      <div className="container md:py-20 flex items-center justify-center  mx-auto ">
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
          className="w-full pt-10 p-0" // حذف padding اضافی
        >
          {slider.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex pb-10 sm:p-0 items-center justify-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center text-white">
                <div className="text-start pb-10 sm:pb-0  sm:text-left w-full sm:w-1/2">
                  <h1 className="text-School-Bus text-2xl font-medium ps-10 sm:hidden ">
                    امین بتن
                  </h1>
                  <h2 className="text-xl sm:text-5xl ps-10">{slide.title}</h2>
                </div>

                <div className="flex flex-col  pb-10 sm:pb-0  gap-2 sm:gap-10 px-4 sm:px-10 sm:ps-40 w-full sm:w-1/2">
                  <span className="text-start  text-sm sm:text-xl sm:text-center ">
                    {slide.p1}
                  </span>
                  <span className="text-start text-sm sm:text-xl sm:text-center">
                    {slide.p2}
                  </span>
                  <span className="text-start text-sm sm:text-xl sm:text-center">
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
