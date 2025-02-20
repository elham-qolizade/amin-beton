import React from "react";
import pic from "../assets/images/0fbb11d946d42f4c9baad21f14948740.jpg";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";

export default function Footer() {
  return (
    <div
      id="contact-section"
      className="flex flex-col-reverse items-center justify-around pt-10 pb-20 text-center md:flex-row bg-b-gray md:pb-52"
    >
      <div className="flex flex-col items-center pt-10 md:pt-40">
        <ul className="flex flex-col gap-4 text-lg text-center text-white">
          <li>اخبار</li>
          <li>درباره ما</li>
          <li>تماس با ما</li>
          <li>خانه</li>
        </ul>
      </div>

      <div className="pb-10 text-white border-b-2 md:pb-20 md:border-none">
        <img
          className="mb-2 w-[200px] h-[150px] md:w-[260px] md:h-[190px]"
          src={pic}
          alt="کارخانه"
        />
        <span>آدرس کارخانه</span>
      </div>

      <div className="flex flex-row-reverse items-center gap-2 pb-10 text-white md:pb-60">
        <span className="text-xl md:text-2xl">امین</span>
        <img className="w-12 md:w-14" src={logo} alt="لوگو" />
        <span className="text-xl md:text-2xl">بتن</span>
      </div>
    </div>
  );
}
