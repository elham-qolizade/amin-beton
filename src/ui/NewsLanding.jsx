import React from "react";
import pic1 from "../assets/images/7f247ff51d072c6c8178a90620cfe5de.png";
import pic2 from "../assets/images/8ad8a5c657fb8bb8c34ac0c121856678.png";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function NewsLanding() {
  return (
    <div className="py-20 bg-Bokara-Grey">
      <div className="flex flex-col gap-10 px-4 sm:px-0">
        <div>
          <h2 className="text-4xl font-medium text-white font-custom">اخبار</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mt-10">
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
        <div className="flex flex-row items-center justify-center gap-3 mt-4">
          <span className="text-School-Bus">همه اخبار</span>
          <FaArrowLeftLong className="text-School-Bus" />
        </div>
      </div>
    </div>
  );
}
