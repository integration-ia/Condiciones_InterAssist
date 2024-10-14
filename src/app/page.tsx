// /page.tsx
import ChatComponent from "./components/ChatComponent";
import HeroSectionHome from "./components/HeroSectionHome";
import SearchAndCards from "./components/SearchAndCards";
import MobileCotization from "./components/SearchAndCards";
import TravelAssistanceCards from "./components/TravelAssistanceCards";

const Home: React.FC = () => {
  return (
    <div>
      <HeroSectionHome />
      <SearchAndCards />
      <MobileCotization />
      <TravelAssistanceCards />
      
      {/* <ChatComponent /> */}
    
    </div>
  );
};

export default Home;
