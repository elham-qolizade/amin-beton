// اطمینان حاصل کنید که فایل CSS شما در اینجا اضافه شده است
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
      <div className="container flex items-center justify-center pt-20 mx-auto mt-20 ">
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
          className="pt-48 mySwiper"
        >
          {slider.map((slide, index) => (
            <SwiperSlide key={index} className="pb-10">
              <div className="flex flex-row items-center justify-center pb-12 text-white">
                <div>
                  <h2 className="text-5xl ps-10 whitespace-nowrap">
                    {slide.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-10 px-10 ps-40 ">
                  <span className="px-24 text-xl">{slide.p1}</span>
                  <span className="px-24 text-xl">{slide.p2}</span>
                  <span className="px-24 text-xl">{slide.p3}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
