import logo from "../assets//images/84c17d4db54552e3ecc58781c8cefc7a.png";

function HeaderNav() {
  return (
    <div className="bg-Eerie-Black opacity-80">
      <div className="container flex flex-row items-center justify-between px-4 py-4">
        <ul className="flex flex-row-reverse gap-4 text-lg font-medium text-white">
          <li className="cursor-pointer hover:text-School-Bus">خانه</li>
          <li className="cursor-pointer hover:text-School-Bus ">تماس با ما</li>
          <li className="cursor-pointer hover:text-School-Bus ">درباره ما</li>
          <li className="cursor-pointer hover:text-School-Bus ">اخبار</li>
        </ul>

        <div className="flex flex-row items-center gap-2 text-center text-white">
          <span className="text-lg font-medium">امین</span>
          <img className="w-8 h-8" src={logo} alt="Company Logo" />
          <span className="text-lg font-medium">بتن</span>
        </div>
        <div>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/24/FFFFFF/user-male-circle.png"
            alt="User Profile Icon"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
