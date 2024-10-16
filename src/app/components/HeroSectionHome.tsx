"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import "../styles/home.css"; 
import MobileCotization from "../components/MobileCotization";
import AgencyPopUp from "../components/AgencyPopUp"; 

const HeroSectionHome = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Función para detectar el tamaño de la pantalla
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024); // Cambiar a `true` si el ancho es menor a 1024px
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Ejecutar al montar el componente

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const overlay = document.querySelector("section") as HTMLElement;
    const burger = document.getElementById("burger");
    let showMenu = false;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "expo.out",
    });

    burger?.addEventListener("click", () => {
      showMenu = !showMenu;
      if (showMenu) {
        gsap.to(overlay, 1, {
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          ease: "expo.in",
        });
      } else {
        gsap.to(overlay, 1, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "expo.out",
          onComplete: () => {
            overlay.style.display = "none";
          },
        });
      }
    });

    let i = 1;
    while (i < 5) {
      tl.to(`#hero-${i} h2`, 0.9, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        delay: 3,
      })
        .to(
          `#hero-${i} h1`,
          0.9,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
          "-=0.3"
        )
        .to(
          `#hero-${i} h3`,
          0.9,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
          "-=0.3"
        )
        .to(
          `#hero-${i} .hi-${i}`,
          0.7,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
          "-=1"
        )
        .to(`#hero-${i + 1} h2`, 0.9, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        })
        .to(
          `#hero-${i + 1} h1`,
          0.9,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          "-=0.3"
        )
        .to(
          `#hero-${i + 1} h3`,
          0.9,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          "-=0.3"
        );
      i++;
    }
  }, []);

  return (
    <>
      <header className="page-header">
        {/* PopUp de Agencia */}
        <AgencyPopUp />

        <main>
          {[...Array(5)].map((_, idx) => (
            <article
              key={idx}
              id={`hero-${idx + 1}`}
              style={{ "--i": 5 - idx } as React.CSSProperties}
            >
              <div className="hero-info">
                <h2>
                  {["Inter 60", "Inter 100", "Inter 200", "Inter 300", "Change Your"][idx]}
                </h2>
                <h1>{["50% Off", "50% Off", "30% Off", "50% Off", "30% Off"][idx]}</h1>
                <h3>
                  {["+3 cuotas sin interes", "+3 cuotas sin interes", "+3 cuotas sin interes", "+3 cuotas sin interes", "+3 cuotas sin interes"][idx]}
                </h3>
              </div>
              <div className={`hero-image hi-${idx + 1}`}></div>

              {/* Mostrar MobileCotization en la sección "hero" si la resolución es mayor a 1024px */}
              {!isMobile && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
                  <MobileCotization />
                </div>
              )}
            </article>
          ))}
        </main>
      </header>

      {/* Mostrar MobileCotization debajo del Hero si la resolución es menor a 1024px */}
      {isMobile && (
        <section className="flex justify-center items-center mt-12 bg-gray-100 p-8">
          <MobileCotization />
        </section>
      )}
    </>
  );
};

export default HeroSectionHome;