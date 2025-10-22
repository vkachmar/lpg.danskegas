"use client";

import React, { useEffect, useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const BREAKPOINTS = {
    MOBILE_LOGO: 786,
    MOBILE_MENU: 1025,
    DESKTOP_LARGE: 1275,
  } as const;
  const isMobileMenu = windowWidth <= BREAKPOINTS.MOBILE_MENU;
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
  
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What types of fuels and gases do you supply?",
      answer:
        "We supply a comprehensive range of fuels including premium diesel, gasoline, heating oil, and various industrial gases including oxygen, nitrogen, argon, and specialty gas mixtures for different industrial applications.",
    },
    {
      id: 2,
      question: "Do you import the products yourselves?",
      answer:
        "Yes, we have established direct import relationships with suppliers across Europe and beyond. This allows us to maintain quality control and competitive pricing while ensuring reliable supply chains.",
    },
    {
      id: 3,
      question: "Can I request a specific product grade or spec?",
      answer:
        "Absolutely! We understand that different industries and applications require specific fuel grades and specifications. Our team works closely with clients to source and deliver products that meet your exact requirements.",
    },
    {
      id: 4,
      question: "Do you deliver to businesses outside Poland?",
      answer:
        "Yes, we supply clients across Central and Northern Europe via land and sea transport. Let us know your location, and we'll confirm availability.",
    },
    {
      id: 5,
      question: "What documentation do you provide with deliveries?",
      answer:
        "We provide comprehensive documentation including certificates of quality, safety data sheets (SDS), delivery receipts, and any required customs or regulatory documentation for international shipments.",
    },
    {
      id: 6,
      question: "Do you offer long-term supply contracts?",
      answer:
        "Yes, we offer flexible contract terms ranging from spot purchases to long-term supply agreements. Our contracts can include price protection, volume commitments, and dedicated logistics arrangements.",
    },
  ];

  const sectionTitleGradient = {
    background:
      "linear-gradient(266.49deg, #F99639 -15.12%, #D80A00 58.77%, #A01800 118.54%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const PlusIcon = () => (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 8.57812V10.5781H0V8.57812H18Z" fill="#252222" />
      <path
        d="M10 18.5781L8 18.5781L8 0.578125L10 0.578125L10 18.5781Z"
        fill="#252222"
      />
    </svg>
  );

  const MinusIcon = () => (
    <svg
      width="18"
      height="3"
      viewBox="0 0 18 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 0.578125V2.57812H0V0.578125H18Z" fill="#FDFCFC" />
    </svg>
  );

  return (
    <div className="lg:mt-[170px] md:mt-[100px] mt-[110px]">
      <div className="flex 2xl:flex-row flex-col gap-0 xs:gap-[46px] justify-between 3xl:ml-[-22px]">
        <div className="flex flex-col 3xl:max-w-full 2xl:max-w-[80%] xs:max-w-full" >
          <span
            className="lg:text-[16px] md:text-[16px] text-[12px] font-medium tracking-wide inline-block"
            style={{
              background:
                "linear-gradient(266.49deg, #F99639 -15.12%, #D80A00 58.77%, #A01800 118.54%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FAQ
          </span>
          <h2 className="text-[34px] lg:text-[48px] w-[90%] font-normal text-black leading-tight 2xl:mt-[6px] 2xl:max-w-[541px]">
            Don't stress, we've got The Answers
          </h2>
          <p className="2xl:text-[18px] font-normal xs:text-[16px] text-black lg:max-w-[503px] md:max-w-[496px] text-wrap max-w-[370px] 2xl:leading-[170%] xs:leading-[140%] 3xl:mt-[13px] 2xl:mt-[11px] md:mt-[9px] mt-[12px]" style={{letterSpacing: '-1%'}} >
            Danske Gas powers industries, engines, and champions — and we make
            sure working with us is just as smooth. Below are answers to common
            questions from new clients and partners.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:gap-6 2xl:w-[651px] 3xl:mr-[23px]">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              style={{letterSpacing: '-1%'}}
              className={`lg:rounded-2xl rounded-[8px] 2xl:px-8 xs:px-4 2xl:py-6 xs:py-4 cursor-pointer transition-all duration-700  ease-out 2xl:w-[651px] ${
                openFAQ === faq.id
                  ? "bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#F97316] text-white"
                  : "bg-[#F8F8F8] text-black hover:bg-gray-100"
              }`}
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex justify-between">
                <h3
                  className={`2xl:text-[20px] xs:text-[18px] lg:w-full md:w-[45%] 2xl:max-w-[100%] xs:max-w-[280px] xs:w-[280px] font-medium transition-all duration-700 ease-out leading-[150%]  
                    ${
                    openFAQ === faq.id ? "text-white" : "text-black"
                  }`}
                >
                  {faq.question}
                </h3>
                <div
                  className={`2xl:mr-0 md:ml-4 xs:mr-2 flex-shrink-0 transition-all duration-700 ease-out flex items-center justify-center
                  ${
                    openFAQ === faq.id ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {openFAQ === faq.id ? <MinusIcon /> : <PlusIcon />}
                </div>
              </div>

              <div
                className={`transition-all duration-700 ease-out ${
                  openFAQ === faq.id
                    ? "grid-rows-[1fr] opacity-100 pt-4"
                    : "grid-rows-[0fr] opacity-0 pt-0"
                }`}
                style={{
                  display: "grid",
                }}
              >
                <div className="overflow-hidden">
                  <p
                    className={`text-[16px] leading-[140%] font-normal transition-all duration-700 ease-out 3xl:mr-[80px] lg:mr-[80px] xs:mr-10 mr-10  ${
                      openFAQ === faq.id ? "text-white" : "text-gray-600"
                    }`}
                    // style={{maxWidth: 'calc(100% - 109px)'}}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQS;
