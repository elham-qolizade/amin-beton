import React from "react";
import pic from "../assets/images/0fbb11d946d42f4c9baad21f14948740.jpg";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <div
      id="contact-section"
      className="flex flex-col-reverse items-center justify-around pt-10 pb-20 text-center md:flex-row bg-b-gray md:pb-52"
    >
      <div className="flex flex-col items-center pt-10 md:pt-40">
        <ul className="flex flex-col gap-4 text-lg text-center text-white cursor-pointer ">
          <li
            className="hover:text-School-Bus"
            onClick={() => navigate("/News")}
          >
            اخبار
          </li>
          <li
            className="hover:text-School-Bus"
            onClick={() => navigate("/About")}
          >
            درباره ما
          </li>
          <li
            className="hover:text-School-Bus"
            onClick={() => navigate("/Contact")}
          >
            تماس با ما
          </li>
          <li className=" hover:text-School-Bus" onClick={() => navigate("/")}>
            خانه
          </li>
        </ul>
      </div>

      <div className="pb-4 text-white border-b-2 ">
        <img
          className="mb-2 w-[200px] h-[150px] md:w-[260px] md:h-[190px]"
          src={pic}
          alt="کارخانه"
        />
        <span>آدرس کارخانه</span>
        <p className="pt-2 text-right">آدرس آدرس آدرس آدرس آدرس آدرس</p>
      </div>

      <div className="flex flex-row-reverse items-center gap-2 pb-10 text-white md:pb-60">
        <span className="text-xl md:text-2xl">امین</span>
        <img className="w-12 md:w-14" src={logo} alt="لوگو" />
        <span className="text-xl md:text-2xl">بتن</span>
      </div>
    </div>
  );
}
