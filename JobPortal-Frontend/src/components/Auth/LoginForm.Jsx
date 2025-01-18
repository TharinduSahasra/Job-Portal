import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as storeLogin } from "../../store/authSlice";
import api from "../../api/axiosConfig";
import EyeIcon from "../Icons/EyeIcon";
import EyeCloseIcon from "../Icons/EyeCloseIcon";

const LoginForm = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(userType === "admin" ? "/admin/dashboard" : "/");
    }
  }, [isAuthenticated, navigate, userType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loginObject = { email, password };
    setIsLoading(true);

    try {
      let apiEndpoint = "";

      if (userType === "admin") {
        apiEndpoint = "/api/v1/admins/login";
      } else if (userType === "recruiter") {
        apiEndpoint = "/api/v1/recruiters/login";
      } else {
        apiEndpoint = "/api/v1/candidates/login";
      }

      const response = await api.post(apiEndpoint, loginObject);

      if (response.status === 200) {
        dispatch(
          storeLogin({
            isAdmin: userType === "admin",
            isRecruiter: userType === "recruiter",
            userData:
              userType === "admin"
                ? response.data.admin
                : userType === "recruiter"
                ? response.data.recruiter
                : response.data.candidate,
          })
        );

        navigate(userType === "admin" ? "/admin/dashboard" : "/");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError("This email is not registered.");
      } else if (error.response?.status === 401) {
        setError("Incorrect password.");
      } else {
        setError("Something went wrong. Try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 max-w-lg mx-auto mt-24 bg-gray-800 rounded-lg shadow-md flex flex-col gap-6"
    >
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        {userType === "admin"
          ? "Admin Login"
          : userType === "recruiter"
          ? "Recruiter Login"
          : "Candidate Login"}
      </h1>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 text-lg rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-between items-center gap-2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 text-lg rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <EyeIcon
          height="1.7em"
          width="1.7em"
          className={`cursor-pointer ${showPassword && "hidden"}`}
          onClick={() => setShowPassword(true)}
        />
        <EyeCloseIcon
          height="1.7em"
          width="1.7em"
          className={`cursor-pointer ${!showPassword && "hidden"}`}
          onClick={() => setShowPassword(false)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`py-3 px-6 mt-8 bg-indigo-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
          isLoading && "opacity-50"
        }`}
      >
        {isLoading ? "Logging In..." : "Login"}
      </button>

      {/* Error Notification */}
      {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}

      <p className="text-center mt-6 text-white">
        <Link
          to={`/register/${
            userType === "admin"
              ? "admin"
              : userType === "recruiter"
              ? "recruiter"
              : "candidate"
          }`}
          className="text-gray-300 hover:text-indigo-400 text-lg font-medium"
        >
          {userType === "admin"
            ? "New here? Register as Admin"
            : "New here? Create a New Account"}
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
