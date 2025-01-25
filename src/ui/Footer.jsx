import React from "react";
import pic from "../assets/images/0fbb11d946d42f4c9baad21f14948740.jpg";
import logo from "../assets//images/84c17d4db54552e3ecc58781c8cefc7a.png";
export default function Footer() {
  return (
    <div className="flex flex-row justify-around pt-10 bg-b-gray pb-52">
      <div className="pt-40">
        <ul className="flex flex-col gap-4 text-white ">
          <li> اخبار </li>
          <li> درباره ما</li>
          <li> تماس با ما</li>
          <li> خانه</li>
        </ul>
      </div>
      <div className="pb-20 text-white border-b-2 ">
        <img className=" mb-2 w-[260px] h-[190px] " src={pic} alt="" />
        <span className="">آدرس کارخانه</span>
      </div>

      <div className="flex flex-row-reverse items-center gap-1 text-center text-white pb-60">
        <span>امین</span>
        <img className="w-14" src={logo} alt="" />
        <span>بتن</span>
      </div>
    </div>
  );
}
