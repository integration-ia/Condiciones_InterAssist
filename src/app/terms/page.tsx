"use client";
import { useEffect } from "react";
import HeroSection from "../components/visual/HeroSection";
import SearchAndCards from "../components/visual/SearchAndCards";
import InfiniteCompanyLogos from "../components/visual/InfiniteCompanyLogos";



const TermsPage: React.FC = () => {
  useEffect(() => {
    if (!window.location.href.includes("#loaded")) {
      window.location.href = window.location.href + "#loaded";
      window.location.reload();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-4 text-gray-700"></h1>
      <HeroSection />
      <SearchAndCards />
      <InfiniteCompanyLogos />
      
    </div>
  );
};

export default TermsPage;
