import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiUser, FiLogOut, FiHome, FiBriefcase, FiSettings } from "react-icons/fi"; // Icons
import Logo from "../Logo";
import api from "../../api/axiosConfig";
import { logout as storeLogout } from "../../store/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      let apiEndpoint = "";
      if (isAdmin) {
        apiEndpoint = "/api/v1/admins/logout";
      } else if (isRecruiter) {
        apiEndpoint = "/api/v1/recruiters/logout";
      } else {
        apiEndpoint = "/api/v1/candidates/logout";
      }

      const response = await api.post(apiEndpoint);
      setIsLoading(false);

      if (response.status === 200) {
        dispatch(storeLogout());
        navigate("/");
      }
    } catch {
      console.log("Logging out due to error");
      dispatch(storeLogout());
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="w-full py-4 px-10 font-fira bg-white bg-opacity-10 backdrop-blur-lg fixed z-10 shadow-lg">
      <nav className="flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <Link to="/">
            <Logo className="text-xl 2xl:text-2xl" />
          </Link>
        </div>

        {/* Navigation Links */}
        {isAuthenticated && (
          <ul className="hidden md:flex gap-x-6 text-white/80 font-semibold text-base 2xl:text-xl">
            <li>
              <button
                onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/")}
                className="flex items-center gap-2 px-4 py-2 duration-200 hover:bg-slate-900 hover:text-purple-400 rounded-2xl"
              >
                <FiHome />
                {isAdmin ? "Dashboard" : "Home"}
              </button>
            </li>
            {!isAdmin && (
              <li>
                <button
                  onClick={() => navigate("/jobs")}
                  className="flex items-center gap-2 px-4 py-2 duration-200 hover:bg-slate-900 hover:text-purple-400 rounded-2xl"
                >
                  <FiBriefcase />
                  Job Listings
                </button>
              </li>
            )}
            {isAdmin && (
              <li>
                <button
                  onClick={() => navigate("/admin/manage-users")}
                  className="flex items-center gap-2 px-4 py-2 duration-200 hover:bg-slate-900 hover:text-purple-400 rounded-2xl"
                >
                  <FiSettings />
                  Manage Users
                </button>
              </li>
            )}
          </ul>
        )}

        {/* Auth Buttons / Profile Dropdown */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full text-white text-base font-semibold transition-all hover:shadow-lg"
            >
              <FiUser className="text-xl" />
              Profile
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg shadow-xl overflow-hidden">
                <button
                  onClick={() => navigate("/")}
                  className="w-full text-left px-4 py-3 hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white transition-all"
                >
                  View Profile
                </button>
                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin/manage-users")}
                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r from-yellow-500 to-orange-500 hover:text-white transition-all"
                  >
                    Manage Users
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className={`w-full text-left px-4 py-3 hover:bg-gradient-to-r from-red-500 to-orange-500 hover:text-white transition-all ${
                    isLoading && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between gap-4">
            <button
              onClick={() => navigate("/login/recruiter")}
              className="py-2 px-6 bg-purple-600 hover:opacity-70 rounded-lg text-white text-base font-semibold transition-opacity"
            >
              Recruiter Login
            </button>

            <button
              onClick={() => navigate("/login/candidate")}
              className="py-2 px-6 bg-green-600 hover:opacity-70 rounded-lg text-white text-base font-semibold transition-opacity"
            >
              Candidate Login
            </button>

            <button
              onClick={() => navigate("/login/admin")}
              className="py-2 px-6 bg-red-600 hover:opacity-70 rounded-lg text-white text-base font-semibold transition-opacity"
            >
              Admin Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
