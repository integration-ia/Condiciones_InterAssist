"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Importa usePathname para obtener la ruta actual

const Navbar: React.FC = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Usa usePathname para detectar la ruta actual

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Detecta si estamos en la home ("/")
  const isHomePage = pathname === "/";

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        navScrolled || !isHomePage ? "bg-gray-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4 ">
        {/* Logo */}
        <div className="text-white text-2xl font-bold sm: w-40 ">
          <Link href="/">
            <Image
              src="/images/Horizontal_blanco.png" // Asegúrate de que el logo esté en esta ruta
              alt="Your Logo"
              width={320} // Ajusta el ancho según tus necesidades
              height={180} // Ajusta la altura según tus necesidades
            />
          </Link>
        </div>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link href="/terms">Términos & Condiciones</Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <Link href="/terms" className="block px-4 py-2">
          Términos & Condiciones
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
