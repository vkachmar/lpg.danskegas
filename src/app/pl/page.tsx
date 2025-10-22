import React from "react";
import HeroSection from "./sections/HeroSection";
import OurStory from "./sections/OurStory";
import CTA from "./sections/CTA";
import BrandName from "./sections/BrandName";
import OurSupply from "./sections/OurSupply";
import ContactUs from "./sections/ContactUs";

const page = () => {
  return (
    <div>
      <HeroSection />
      <div id="our_story" className="w-full pt-[74px] md:pt-[100px] xl:pt-[170px]">
        <OurStory />
      </div>
      <div id="cta" className="">
        <CTA />
      </div>
      <div id="our_value" className="px-4 md:px-10 lg:px-0 lg:max-w-[1280px] mx-auto pt-[74px] md:pt-[100px] xl:pt-[170px]">
        <BrandName />
      </div>
      <div id="our_product">
        <OurSupply />
      </div>
      <div className="container-custom">
        <div id="contact_us" className="mt-[110px] md:mt-0 lg:pb-[170px] md:pb-[100px] pb-[112px] max-w-[1280px] mx-auto">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default page;
