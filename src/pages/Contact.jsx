import React from "react";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import pic1 from "../assets/images/7f247ff51d072c6c8178a90620cfe5de.png";
import pic2 from "../assets/images/8ad8a5c657fb8bb8c34ac0c121856678.png";
export default function Contact() {
  return (
    <div className="min-h-screen bg-Bokara-Grey">
      <div>
        <HeaderNav />
        <ProjectHeading className="py-3" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col gap-4 text-white text-start">
          <div className="flex container md:py-20 py-10 flex-col gap-10  ">
            <div>
              <h2 className="md:text-4xl text-3xl font-medium text-center text-School-Bus font-custom">
                تماس با ما
              </h2>
            </div>
            <div className="flex flex-col px-10 items-center justify-center gap-10 md:mt-10 sm:flex-row">
              <img
                className="w-full sm:w-[260px] h-auto sm:h-[138px] object-cover"
                src={pic1}
                alt=""
              />
              <img
                className="w-full sm:w-[260px] h-auto sm:h-[138px] object-cover"
                src={pic2}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ProjectHeading />
        </div>

        <div className="flex flex-col gap-4 py-10">
          <p className="text-sm sm:text-base md:text-lg text-white">آدرس:</p>
        </div>
      </div>
    </div>
  );
}
