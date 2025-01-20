import logo from "../assets/84c17d4db54552e3ecc58781c8cefc7a.png";
function HeaderNav() {
  return (
    <div className="bg-Eerie-Black opacity-80 ">
      <div className="flex flex-row py-4  container items-center justify-between ">
        <div>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/24/FFFFFF/user-male-circle.png"
            alt="user-male-circle"
          />
        </div>
        <div className="text-white text-center items-center gap-1 flex flex-row">
          <span>امین</span>
          <img className="w-10" src={logo} alt="" />
          <span>بتن</span>
        </div>
        <ul className="flex gap-8 text-white flex-row">
          <li>خانه</li>
          <li>تماس با ما</li>
          <li>اخبار</li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderNav;
