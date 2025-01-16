import { useNavigate } from "react-router-dom";

const ButtonsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
      <button
        onClick={() => navigate("/register/recruiter")}
        className="py-4 px-10 bg-gradient-to-r from-indigo-600 to-purple-500 hover:opacity-80 rounded-lg text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Hiring
      </button>
      <button
        onClick={() => navigate("/register/candidate")}
        className="py-4 px-6 bg-gradient-to-r from-teal-500 to-green-500 hover:opacity-80 rounded-lg text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Looking for a Job
      </button>
    </div>
  );
};

export default ButtonsSection;