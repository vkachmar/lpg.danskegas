"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

interface ValuesContent {
  sectionTitle: string;
  mainHeading: string;
  description: string;
}

interface ValueCard {
  id: string;
  title: string;
  description: string;
  number: string;
}

const OurSupply = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { damping: 20, stiffness: 120 });

  const OUR_SUPPLY_CONTENT: ValuesContent = {
    sectionTitle: "NASZE PRODUKTY",
    mainHeading: "Co dostarczamy",
    description: "Danske Gas napędza przemysł, silniki i mistrzów. Oferujemy wszystko – od paliw wyścigowych o wysokiej wydajności, po gazy techniczne i produkty przemysłowe.",
  };

  const VALUE_CARDS: ValueCard[] = [
    { id: "1", title: "Olej napędowy", description: "Niskoemisyjne i wydajne paliwo, przeznaczone dla flot komercyjnych, transportu publicznego oraz stref o podwyższonej ochronie środowiska.", number: "01" },
    { id: "2", title: "LPG", description: "Gaz płynny do zastosowań domowych, przemysłowych i motoryzacyjnych — uniwersalny, wydajny i czysto spalający się.", number: "02" },
    { id: "3", title: "Benzyna", description: "Bezołowiowa 95, 98 oraz paliwa alkilatowe — niezawodna energia do codziennej jazdy przy czystszym spalaniu.", number: "03" },
    { id: "4", title: "Paliwa wyścigowe", description: "Mieszanki premium od światowych marek, zoptymalizowane pod silniki wysokich osiągów w motorsporcie.", number: "04" },
    { id: "5", title: "Paliwa stałe", description: "Biomasa i węgiel dla dużych zakładów energetycznych i ciepłowni — stabilne, przemysłowej jakości źródła energii.", number: "05" },
    { id: "6", title: "Gazy techniczne", description: "Azot, argon, podtlenek azotu i inne — do przetwórstwa spożywczego, spawalnictwa, medycyny i przemysłu high-tech.", number: "06" },
    { id: "7", title: "Produkty chemiczne", description: "Alkohole, kwasy, monomery i tworzywa sztuczne — przemysłowej jakości chemikalia do produkcji i przetwórstwa.", number: "07" },
    { id: "8", title: "Oleje i smary lotnicze", description: "Specjalistyczne oleje i smary, zaprojektowane dla silników samolotów i helikopterów.", number: "08" },
  ];

  const AnimatedCard = ({ card, index }: { card: ValueCard; index: number }) => {
    const totalCards = VALUE_CARDS.length + 2;
    const step = 1 / totalCards;

    // Determine the active card index based on scroll
    const activeIndex = useTransform(smoothScroll, [0, 1], [0, totalCards - 1]);

    // Smoothly animate z-index, background, and text
    const isActive = useTransform(activeIndex, (i) => Math.round(i) === index ? 1 : 0);
    const springActive = useSpring(isActive as unknown as MotionValue<number>, { damping: 25, stiffness: 120 });

    // Slide animation
    const y = useTransform(smoothScroll, [step * index, step * (index + 1)], [550, 0]);

    // const inactiveBg = "#F9F7F7";
    // const activeBg = "linear-gradient(266.49deg, #F99639 -15.12%, #D80A00 58.77%, #A01800 118.54%)";
    // const inactiveText = "#000000";
    // const activeText = "#F9F7F7";

    const inactiveBg = "linear-gradient(266.49deg, #F99639 -15.12%, #D80A00 58.77%, #A01800 118.54%)";
    const activeBg = "#F9F7F7";
    const inactiveText = "#F9F7F7";
    const activeText = "#000";

    return (
      <motion.div style={{ y, zIndex: 10 + index }} className="absolute top-0 w-full right-0" key={card.id}>
        <div className="relative w-full rounded-[8px] md:rounded-[16px] overflow-hidden">
          {/* Background layers */}
          <motion.div
            className="absolute inset-0"
            style={{ background: inactiveBg, opacity: useTransform(springActive, [0, 1], [1, 0]) }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ background: activeBg, opacity: springActive }}
          />
          {/* Content */}
          <motion.div
            className="min-h-[180px] sm:min-h-[162px] lg:min-h-[236px] relative w-full pl-[14px] pr-[19px] pt-[13px] pb-[32px] lg:pl-[32px] lg:pr-[24px] lg:pt-[32px] lg:pb-[56px]"
            style={{ color: useTransform(springActive, [0, 1], [inactiveText, activeText]) }}
          >
            <div className="text-end">
              <span className="text-[18px] lg:text-[22px] leading-[110%] font-medium">{card.number}</span>
            </div>
            <h3 className="text-[18px] lg:text-[22px] leading-[110%] font-bold">{card.title}</h3>
            <p className="text-[16px] leading-[140%] lg:text-[20px] pt-[7px] lg:leading-[150%] tracking-[-0.2px] max-w-[502px] w-full">{card.description}</p>
          </motion.div>
        </div>
      </motion.div>
    );
  };


  return (
    <div ref={containerRef} className="container-custom mt-[110px] md:mt-0" style={{ height: "800vh" }}>
      <div className="items-center max-w-[1280px] grid md:grid-cols-2 grid-cols-1 sticky top-0 lg:h-[94vh] md:h-[94vh] h-[63vh] gap-[42px] md:gap-[30px] lg:gap-[123px]">
        {/* Left Column */}
        <div className="md:col-span-1">
          <span
            className="text-[12px] md:text-[16px] leading-[140%] lg:pl-[7px] font-medium inline-block"
            style={{
              background: "linear-gradient(266.49deg, #F99639 -15.12%, #D80A00 58.77%, #A01800 118.54%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {OUR_SUPPLY_CONTENT.sectionTitle}
          </span>
          <h2 className="text-[34px] lg:text-[48px] leading-[133%] lg:pl-[6px] lg:pt-[6px]">{OUR_SUPPLY_CONTENT.mainHeading}</h2>
          <p className="text-[16px] leading-[140%] lg:text-[20px] lg:leading-[150%] tracking-[-0.2px] lg:pl-[6px] pt-[5px] lg:pt-[9px]">{OUR_SUPPLY_CONTENT.description}</p>
        </div>

        {/* Right Column */}
        <div className="w-full md:max-h-[600px] md:overflow-hidden h-full flex flex-col items-center justify-center">
          <div className="w-full md:max-w-[367px] lg:max-w-[577px] flex flex-col md:items-end justify-center md:col-span-1 relative h-[162px] lg:h-[234px]">
            {VALUE_CARDS.map((card, index) => (
              <AnimatedCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSupply;
