import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login as storeLogin } from "../../store/authSlice";
import api from "../../api/axiosConfig";

const AdminRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/api/v1/admins/signup", { email, password });

      if (response.status === 201) {
        dispatch(storeLogin({ isAdmin: true, userData: response.data }));

        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError("Registration failed! Email might be taken.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-14 mb-24 bg-slate-700 w-full max-w-md 2xl:max-w-xl rounded-lg flex flex-col gap-4 2xl:gap-10 mx-auto"
    >
      <h1 className="text-3xl 2xl:text-5xl font-bold text-white text-center mb-8 2xl:mb-12">
        Admin Signup
      </h1>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold"
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full py-2 px-4 text-lg rounded-lg text-black/80 font-semibold ${
            password === confirmPassword
              ? "border-green-500 outline-green-500"
              : confirmPassword && "border-red-500 outline-red-500"
          }`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !email || !password || !confirmPassword || password !== confirmPassword}
        className={`py-2 px-4 my-10 bg-green-500 hover:opacity-70 rounded-lg text-white text-lg font-semibold transition-opacity ${
          (isLoading || !email || !password || !confirmPassword || password !== confirmPassword) &&
          "opacity-30 hover:opacity-40"
        }`}
      >
        Register
      </button>

      {/* ERROR NOTIFICATION */}
      {error && <p className="text-red-500 text-center text-lg font-black">{error}</p>}

      <p className="text-secondary text-center">
        <Link to="/admin/login" className="text-white/80 hover:text-purple-500 text-lg font-semibold">
          Already Registered? Login here
        </Link>
      </p>
    </form>
  );
};

export default AdminRegisterForm;
