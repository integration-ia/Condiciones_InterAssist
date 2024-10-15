// /page.tsx
import ChatComponent from "./components/visual/ChatComponent";
import HeroSectionHome from "./components/visual/HeroSectionHome";
import InfiniteCompanyLogos from "./components/visual/InfiniteCompanyLogos";
import SearchAndCards from "./components/visual/SearchAndCards";
import MobileCotization from "./components/visual/SearchAndCards";
import TravelAssistanceCards from "./components/visual/TravelAssistanceCards";

const Home: React.FC = () => {
  return (
    <div>
      <HeroSectionHome />
      <MobileCotization />
      <InfiniteCompanyLogos />
      <TravelAssistanceCards />
      <ChatComponent />
    </div>
  );
};

export default Home;
