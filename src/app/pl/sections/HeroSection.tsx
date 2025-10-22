"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

interface HeroSectionProps {
  className?: string;
}

const MARQUEE_ITEMS = [
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
  "Danske Gas",
];

const BREAKPOINTS = {
  MOBILE_LOGO: 786,
  MOBILE_MENU: 1025,
} as const;

const HeroSection: React.FC<HeroSectionProps> = ({
  className = "",
}) => {
  const [windowWidth, setWindowWidth] = useState(1200);

  const isMobileMenu = windowWidth <= BREAKPOINTS.MOBILE_MENU;
  const isMobileLogo = windowWidth <= BREAKPOINTS.MOBILE_LOGO;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className={`w-full relative ${className}`}>
      <div
        className={`w-full relative bg-cover bg-center bg-no-repeat overflow-hidden   
            3xl:bg-[url('/assets/header-pic/bg.png')] 3xl:h-[600px]
            lg:bg-[url('/assets/header-pic/lg-bg.png')] lg:h-[710px]
            md:bg-[url('/assets/header-pic/md-bg.webp')] md:h-[460px]
            bg-[url('/assets/header-pic/sm-bg.webp')] h-[522px]
        `}
      >
        <div className="container-custom w-full h-full text-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="flex flex-col justify-end items-start h-full  
              pb-[38px] md:pb-[51px] lg:pb-[140px] 3xl:pb-[91px] 
              space-y-[30px] md:space-y-6 lg:space-y-10"
          >
            <div className="space-y-[10px] lg:space-y-1">
              <h1 className="text-[34px] md:text-[48px] lg:text-[64px] leading-[123%] max-w-[350px] md:max-w-[600px] lg:max-w-[845px]">
                <span className="font-medium">Danske Gas</span> – Paliwa, które napędzają Twój biznes
              </h1>

              <p className="text-[20px] md:text-[24px] leading-[150%] max-w-[500px] lg:max-w-[510px] 3xl:max-w-[568px] tracking-[-0.2]">
                Dynamicznie rozwijamy się w całej Europie i tworzymy zespół, który rośnie razem z nami.
              </p>
            </div>

            <Link href="#contact_us"
              className="bg-white rounded-full text-black text-[18px] leading-[140%] font-medium 
                inline-flex items-center justify-center gap-[10px] group
                min-w-full md:min-w-[250px] lg:min-w-[253px] 3xl:min-w-[258px] p-[14px]">
              <span>
                Skontaktuj się z nami
              </span>

              <svg className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 1H13.5M13.5 1L13.5 10M13.5 1L1.5 13" stroke="#171515" stroke-width="1.5" />
              </svg>

            </Link>

          </motion.div>
        </div>
      </div>

      <div className="overflow-hidden flex items-center justify-center 
        py-[8px] 3xl:py-[10px]
        bg-gradient-to-r from-[#A01800] via-[#D80A00] to-[#F99639]"
      >
        <Marquee speed={50} gradient={false} className="">
          {MARQUEE_ITEMS.map((item, index) => (
            <span
              key={index}
              className="text-white font-medium xl:text-[48px] lg:text-[32px] text-[28px] uppercase tracking-wider ml-[40px] lg:ml-[80px]"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default HeroSection;
