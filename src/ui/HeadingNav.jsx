import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";

function HeaderNav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => {
    navigate("/LoginForm");
  };

  return (
    <div className="bg-Eerie-Black opacity-80">
      <div className="container flex flex-row items-center justify-between px-4 py-4 relative">
        {/* دکمه همبرگر یا بستن برای موبایل */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "×" : "☰"} {/* تغییر آیکون بر اساس وضعیت منو */}
        </button>

        {/* لوگو در مرکز */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:transform-none flex flex-row gap-1 text-white text-lg font-medium items-center">
          <span>امین</span>
          <img className="w-10 h-10" src={logo} alt="Company Logo" />
          <span>بتن</span>
        </div>

        {/* منو */}
        <ul
          className={`${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform translate-x-full"
          } flex-col md:gap-4 bg-Eerie-Black opacity-80"    gap-10  flex md:flex-row  w-1/2 text-lg font-medium text-white flex-1 md:top-0 top-16 right-0 md:w-auto p-4  h-[63vh]  md:bg-transparent absolute transition-transform duration-300 ease-in-out md:translate-x-0 md:absolute`}
        >
          <li className="cursor-pointer hover:text-School-Bus">خانه</li>
          <li className="cursor-pointer hover:text-School-Bus">تماس با ما</li>
          <li className="cursor-pointer hover:text-School-Bus">درباره ما</li>
          <li className="cursor-pointer hover:text-School-Bus">اخبار</li>
        </ul>

        {/* آیکون کاربر در سمت چپ */}
        <div className="flex-1 flex justify-end">
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
