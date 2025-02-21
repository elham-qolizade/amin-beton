import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";

function HeaderNav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => {
    navigate("/LoginForm");
  };
  const handleNewsClick = () => {
    const newsSection = document.getElementById("news-section"); // گرفتن بخش اخبار
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" }); // اسکرول نرم به بخش اخبار
    }
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="bg-Eerie-Black opacity-80">
      <div className="container relative flex flex-row items-center justify-between px-4 py-4">
        {/* دکمه همبرگر یا بستن برای موبایل */}
        <button
          className="text-2xl text-white md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "×" : "☰"} {/* تغییر آیکون بر اساس وضعیت منو */}
        </button>

        {/* لوگو در مرکز */}
        <div className="absolute flex flex-row items-center gap-1 text-lg font-medium text-white transform -translate-x-1/2 left-1/2 md:transform-none">
          <span>امین</span>
          <img className="w-10 h-10" src={logo} alt="Company Logo" />
          <span>بتن</span>
        </div>

        {/* منو */}
        <ul
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col md:flex-row md:gap-2 bg-Eerie-Black opacity-80 gap-10 
  w-1/2 text-lg font-medium text-white flex-1 md:top-0 top-16 right-0 
  md:w-auto p-4  md:bg-transparent absolute transition-transform 
  duration-300 ease-in-out md:translate-x-0 md:absolute`}
        >
          <li
            onClick={() => navigate("/")}
            className="inline-block px-3 py-1 cursor-pointer hover:text-School-Bus"
          >
            خانه
          </li>
          <li
            onClick={() => scrollToSection("contact-section")}
            className="inline-block px-3 py-1 cursor-pointer hover:text-School-Bus"
          >
            تماس با ما
          </li>
          <li
            onClick={() => navigate("/AboutBluck")}
            className="inline-block px-3 py-1 cursor-pointer hover:text-School-Bus"
          >
            درباره ما
          </li>
          <li
            onClick={handleNewsClick}
            className="inline-block px-3 py-1 cursor-pointer hover:text-School-Bus"
          >
            اخبار
          </li>
        </ul>

        {/* آیکون کاربر در سمت چپ */}
        <div className="flex justify-end flex-1">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/24/FFFFFF/user-male-circle.png"
            alt="User Profile Icon"
            className="cursor-pointer"
            onClick={handleUserClick}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
