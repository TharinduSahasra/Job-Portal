import HeroSection from "../components/HeroSection";
import ButtonsSection from "../components/ButtonsSection";
import Footer from "../components/footer/Index";
import ProfileSection from "../components/ProfileSelction";
import ApplicationsSection from "../components/ApplicationsSelection";

const Home = () => {
  const isLoggedIn = true;
  const isRecruiter = true;
  if (!isLoggedIn) {
    return (
      <div className="pt-40 px-32">
        <HeroSection />
        <ButtonsSection />
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

  return (
    <div className="pt-40 px-32">
    
    <ProfileSection />
    <ApplicationsSection />
  </div>
);
};
  export default Home;