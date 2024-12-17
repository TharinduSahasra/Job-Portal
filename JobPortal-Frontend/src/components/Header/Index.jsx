import Logo from "../Logo";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate();

    const isLoggedIn = true;
    return (
      <header className="w-full py-4 2xl:py-6 px-10 font-fira bg-white bg-opacity-10 backdrop-blur-lg fixed z-10">
        <nav className="flex justify-between items-center">
          <div>
            <Link to="/">
              <Logo className="text-lg 2xl:text-2xl" />
            </Link>
          </div>
          <ul className="flex gap-x-4 text-white/80 font-semibold text-lg 2xl:text-2xl">
            <li>
              <button
                onClick={() => navigate("/")}
                className="inline-block px-4 py-2 duration-200 hover:bg-slate-900 hover:text-orange-400 rounded-2xl"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/jobs")}
                className="inline-block px-4 py-2 duration-200 hover:bg-slate-900 hover:text-orange-400 rounded-2xl"
              >
                Job Listings
              </button>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="flex justify-around items-center gap-x-6 2xl:gap-x-8">
              <button className="py-4 px-6 bg-orange-600 hover:opacity-70 rounded-lg text-white text-lg font-semibold shadow-inner shadow-black/80 transition-opacity">
                Logout
              </button>
            </div>
          ) : (
            <button className="py-4 px-6 bg-green-600 hover:opacity-70 rounded-lg text-white text-lg font-semibold shadow-inner shadow-black/80 transition-opacity">
              Register
            </button>
          )}
        </nav>
      </header>
    );
  };
  export default Header;