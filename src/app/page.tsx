// /page.tsx
import HeroSectionHome from "./components/HeroSectionHome";
import SearchAndCards from "./components/SearchAndCards";
import MobileCotization from "./components/SearchAndCards";

const Home: React.FC = () => {
  return (
    <div>
      <HeroSectionHome />
      <SearchAndCards />
      <MobileCotization />
    </div>
  );
};

export default Home;
