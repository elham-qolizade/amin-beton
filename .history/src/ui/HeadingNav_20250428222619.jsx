import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-200 bg-red-500 rounded hover:bg-red-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15m3-3h-9m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </button>
  );
};

function HeaderNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => navigate("/LoginForm");

  // بررسی مسیرهای صفحه‌ای که نیاز به مخفی کردن دکمه خروج دارند
  const hiddenLogoutPages = ["/", "/news", "/About", "/Contact"];
  const hideLogoutButton = hiddenLogoutPages.includes(location.pathname);

  return (
    <header className="w-full bg-black md:bg-Eerie-Black md:opacity-80">
      <div className="container relative z-50 flex items-center justify-between w-full px-4 py-4">
        {/* Menu Button (Mobile) */}
        <button
          className="z-50 text-2xl text-white md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>

        {/* Navigation */}
        <nav
          className={`fixed top-0 right-0 z-10 h-full w-1/3 bg-black p-6 shadow-lg transform transition-transform duration-300 ease-in-out md:static md:w-auto md:h-auto md:bg-transparent md:p-0 md:shadow-none ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
          style={{ willChange: "transform" }}
        >
          <ul className="flex flex-col gap-10 pt-12 text-white md:p-0 md:flex-row md:gap-6">
            <li
              className="cursor-pointer hover:text-School-Bus"
              onClick={() => navigate("/")}
            >
              خانه
            </li>
            <li
              className="cursor-pointer hover:text-School-Bus"
              onClick={() => navigate("/Contact")}
            >
              تماس با ما
            </li>
            <li
              className="cursor-pointer hover:text-School-Bus"
              onClick={() => navigate("/About")}
            >
              درباره ما
            </li>
            <li
              className="cursor-pointer hover:text-School-Bus"
              onClick={() => navigate("/News")}
            >
              اخبار
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <div className="absolute flex items-center gap-2 text-lg font-medium text-white transform -translate-x-1/2 left-1/2">
          <span>امین</span>
          <img className="w-10 h-10" src={logo} alt="Company Logo" />
          <span>بتن</span>
        </div>

        {/* User Section */}
        <div className="z-50 flex items-center gap-4">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/24/FFFFFF/user-male-circle.png"
            alt="User Profile Icon"
            className="cursor-pointer"
            onClick={handleUserClick}
          />

          {/* دکمه خروج فقط در صفحات غیر از Home، News، About و Contact نمایش داده شود */}
          {!hideLogoutButton && <LogoutButton />}
        </div>
      </div>
    </header>
  );
}

export default HeaderNav;
