import { useNavigate } from "react-router-dom";

const ButtonsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 flex justify-evenly">
      <button
        onClick={() => navigate("/register/recruiter")}
        className="py-4 px-10 bg-purple-600 hover:opacity-70 rounded-lg text-white text-lg font-semibold shadow-inner shadow-black/80 transition-opacity"
      >
        Hiring
      </button>
      <button
        onClick={() => navigate("/register/candidate")}
        className="py-4 px-6 bg-green-600 hover:opacity-70 rounded-lg text-white text-lg font-semibold shadow-inner shadow-black/80 transition-opacity"
      >
        Looking for a Job
      </button>
    </div>
  );
};

export default ButtonsSection;