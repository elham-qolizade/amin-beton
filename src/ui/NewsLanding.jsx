import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import pic1 from "../assets/images/7f247ff51d072c6c8178a90620cfe5de.png";
import pic2 from "../assets/images/8ad8a5c657fb8bb8c34ac0c121856678.png";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function NewsLanding() {
  const navigate = useNavigate(); // Initialize navigate

  // Function to handle the click event
  const handleAllNewsClick = () => {
    navigate("/news"); // Navigate to the news page
  };

  return (
    <div id="news-section" className="bg-Bokara-Grey">
      <div className="container flex flex-col gap-10 py-10 md:py-20">
        <div>
          <h2 className="text-3xl font-medium text-center text-white md:text-4xl font-custom">
            اخبار
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 px-10 md:mt-10 sm:flex-row">
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
        <div className="flex flex-row items-center justify-center gap-3 md:mt-4">
          <span
            onClick={handleAllNewsClick} // Add the onClick handler here
            className="text-lg cursor-pointer text-School-Bus md:text-2xl"
          >
            همه اخبار
          </span>
          <FaArrowLeftLong className="text-School-Bus" />
        </div>
      </div>
    </div>
  );
}
