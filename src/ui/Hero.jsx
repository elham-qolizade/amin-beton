import HeaderNav from "./HeadingNav";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { slider1 } from "../constans/index";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <div className="hero   ">
      <HeaderNav />
      <div className="container ">
        <div className="flex py-40 ">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwiper p-24 pt-10"
          >
            <SwiperSlide className="">
              {slider1.map((slide, index) => (
                <div
                  key={index}
                  className="flex flex-row-reverse  justify-center items-center text-white gap-10"
                >
                  <h2 className="">{slide.title}</h2>
                  <div className="flex flex-col gap-10">
                    <span className=" px-24 pe-96 font-[40px]">{slide.p1}</span>
                    <span className=" px-24 pe-96 font-[40px]">{slide.p2}</span>
                    <span className=" px-24 pe-96 font-[40px]">{slide.p3}</span>
                  </div>
                </div>
              ))}
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
