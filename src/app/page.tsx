// /page.tsx
import ChatComponent from "./components/ChatBot/ChatComponent";
import EnhancedAssistCardBenefits from "./components/EnhancedAssistCardBenefits";
import HeroSectionHome from "./components/HeroSectionHome";
import InfiniteCompanyLogos from "./components/InfiniteCompanyLogos";
import TravelAssistanceCards from "./components/TravelAssistanceCards";

const Home: React.FC = () => {
  return (
    <div>

      <HeroSectionHome />
      <InfiniteCompanyLogos />
      <TravelAssistanceCards />
      <ChatComponent />
      <EnhancedAssistCardBenefits />
    </div>
  );
};

export default Home;
