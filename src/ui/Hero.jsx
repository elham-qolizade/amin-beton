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
      <HeaderNav />
      <div className="container flex items-center justify-center pt-20 mx-auto mt-20">
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
          className="pt-48 mySwiper w-full"
        >
          {slider.map((slide, index) => (
            <SwiperSlide key={index} className="pb-10">
              <div className="flex flex-col sm:flex-row items-center justify-center pb-12 text-white">
                <div className="text-center sm:text-left w-full sm:w-1/2">
                  <h2 className="text-2xl sm:text-5xl ps-10 whitespace-nowrap">
                    {slide.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-4 sm:gap-10 px-4 sm:px-10 sm:ps-40 w-full sm:w-1/2">
                  <span className="text-base sm:text-xl">{slide.p1}</span>
                  <span className="text-base sm:text-xl">{slide.p2}</span>
                  <span className="text-base sm:text-xl">{slide.p3}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
