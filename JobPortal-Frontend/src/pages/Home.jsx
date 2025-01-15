import { useSelector } from "react-redux";

import HeroSection from "../components/HeroSection";
import ButtonsSection from "../components/ButtonsSection";
import ProfileSection from "../components/ProfileSection";
import ApplicationsSection from "../components/ApplicationsSection"

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);

  if (!isAuthenticated) {
    return (
      <div className="pt-40 px-6 md:px-16">
        <HeroSection />
        
      </div>
    );
  }

  if (isRecruiter) {
    return (
      <div className="pt-40 px-32">
        <ProfileSection />
        <ApplicationsSection />
      </div>
    );
  }

  // FOR CANDIDATES
  return (
    <div className="pt-40 px-32">
      <ProfileSection />
      <ApplicationsSection />
    </div>
  );
};

export default Home;