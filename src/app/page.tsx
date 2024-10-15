// /page.tsx
import ChatComponent from "./components/ChatComponent";
import HeroSectionHome from "./components/HeroSectionHome";
import InfiniteCompanyLogos from "./components/InfiniteCompanyLogos";
import SearchAndCards from "./components/SearchAndCards";
import MobileCotization from "./components/SearchAndCards";
import TravelAssistanceCards from "./components/TravelAssistanceCards";

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
