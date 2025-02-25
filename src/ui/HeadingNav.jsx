import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";

function HeaderNav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => navigate("/LoginForm");

  const handleNewsClick = (e) => {
    e.preventDefault();
    const newsSection = document.getElementById("news-section");
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full bg-black md:bg-Eerie-Black md:opacity-80">
      <div className="container w-full px-4 z-50 relative flex items-center justify-between py-4">
        <button
          className="z-50 text-2xl text-white md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>

        <nav
          className={`fixed top-0 right-0 z-10 h-full w-1/3 bg-black p-6 shadow-lg transform transition-transform duration-300 ease-in-out md:static md:w-auto md:h-auto md:bg-transparent md:p-0 md:shadow-none ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
          style={{ willChange: "transform" }}
        >
          <ul className="flex flex-col gap-10 pt-12 text-white md:p-0 md:flex-row md:gap-6 ">
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

        <div className="absolute flex items-center gap-2 text-lg font-medium text-white transform -translate-x-1/2 left-1/2">
          <span>امین</span>
          <img className="w-10 h-10" src={logo} alt="Company Logo" />
          <span>بتن</span>
        </div>

        <div className="z-50">
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
    </header>
  );
}

export default HeaderNav;
