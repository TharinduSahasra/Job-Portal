import HeroSection from "../components/HeroSection";
import ButtonsSection from "../components/ButtonsSection";
import Footer from "../components/footer/Index";

const Home = () => {
    return (
      <div className="w-screen h-screen flex flex-col justify-between bg-slate-950">
        <div className="pt-40 px-32">
          <HeroSection />
          <ButtonsSection />
        </div>
        <Footer />
      </div>
    );
  };
  export default Home;