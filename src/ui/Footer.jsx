import React from "react";
import pic from "../assets/images/0fbb11d946d42f4c9baad21f14948740.jpg";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";

export default function Footer() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-around items-center pt-10 bg-b-gray pb-20 md:pb-52 text-center">
      <div className="pt-10 md:pt-40 flex flex-col items-center">
        <ul className="flex flex-col gap-4 text-white text-lg text-center">
          <li>اخبار</li>
          <li>درباره ما</li>
          <li>تماس با ما</li>
          <li>خانه</li>
        </ul>
      </div>

      <div className="pb-10 md:pb-20 text-white border-b-2 md:border-none">
        <img
          className="mb-2 w-[200px] h-[150px] md:w-[260px] md:h-[190px]"
          src={pic}
          alt="کارخانه"
        />
        <span>آدرس کارخانه</span>
      </div>

      <div className="flex flex-row-reverse items-center gap-2 text-white pb-10 md:pb-60">
        <span className="text-xl md:text-2xl">امین</span>
        <img className="w-12 md:w-14" src={logo} alt="لوگو" />
        <span className="text-xl md:text-2xl">بتن</span>
      </div>
    </div>
  );
}
