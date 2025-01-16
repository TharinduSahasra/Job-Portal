import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-center p-6 sm:p-12">
      {/* Dark Background with Overlay Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?business,technology")' }}></div>

      {/* Main content */}
      <div className="relative z-10 space-y-8">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-teal-400 to-purple-500 animate-gradient-text">
          JobFix
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-teal-400 to-purple-500 animate-gradient-text opacity-80">
          Unlocking Opportunities, Empowering Careers
        </h2>
        <div className="mt-8">
          <button className="py-3 px-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 text-white font-semibold text-lg rounded-lg shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out hover:shadow-xl focus:outline-none">
            Start Your Journey
          </button>
        </div>
      </div>

      {/* Buttons Section */}
      <ButtonsSection />
    </div>
  );
};

const ButtonsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
      <button
        onClick={() => navigate("/register/recruiter")}
        className="py-4 px-10 bg-gradient-to-r from-indigo-600 to-purple-500 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 text-white text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none">
        Hiring
      </button>
      <button
        onClick={() => navigate("/register/candidate")}
        className="py-4 px-6 bg-gradient-to-r from-teal-500 to-green-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 text-white text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none">
        Looking for a Job
      </button>
    </div>
  );
};

export default HeroSection;
