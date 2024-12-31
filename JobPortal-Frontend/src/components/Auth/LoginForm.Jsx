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
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isRecruiter = userType === "recruiter";
    const loginObject = { email, password };

    setIsLoading(true);

    try {
      const apiEndpoint = isRecruiter
        ? "/api/v1/recruiters/login"
        : "/api/v1/candidates/login";

      const response = await api.post(apiEndpoint, loginObject);

      if (response.status === 200) {
        dispatch(
          storeLogin({
            isRecruiter,
            userData: isRecruiter
              ? response.data.recruiter
              : response.data.candidate,
          })
        );
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setError("This email or username is not registered");
      } else if (error.response.status === 401) {
        setError("Wrong password");
      } else {
        setError("Something went wrong!");
      }

      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-14 mb-24 w-full max-w-md 2xl:max-w-xl rounded-lg flex flex-col gap-4 2xl:gap-10 mx-auto ${
        userType === "recruiter" ? "bg-slate-700" : "bg-slate-800"
      }`}
    >
      <h1 className="text-3xl 2xl:text-5xl font-bold text-white text-center mb-8 2xl:mb-12">
        {userType === "recruiter" ? "Recruiter Login" : "Candidate Login"}
      </h1>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80"
          required={true}
        />
      </div>

      <div className="flex justify-between gap-1 items-center">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80"
          required={true}
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
        className={`py-2 px-4 my-10 bg-green-500 hover:opacity-70 rounded-lg text-white text-lg font-semibold transition-opacity ${
          isLoading && "opacity-30 hover:opacity-40"
        }`}
      >
        Login
      </button>

      {/* ERROR NOTIFICATION */}
      <p className="text-red-500 text-center text-lg font-black">{error}</p>

      <p className="text-secondary text-center">
        <Link
          to={`/register/${
            userType === "recruiter" ? "recruiter" : "candidate"
          }`}
          className="text-white/80 hover:text-purple-500 text-lg font-semibold"
        >
          Are you new here? Create a New Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;