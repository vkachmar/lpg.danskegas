"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const BrandName: React.FC = () => {
    return (
        <div className="w-full">
            <div className="w-full flex gap-8 md:gap-10 lg:gap-5 flex-col lg:flex-row justify-between">
                <div className="w-full">
                    <h2 className="gradientText font-medium text-[12px] md:text-[16px] leading-[140%] uppercase">
                        Our Values
                    </h2>
                    <div className="text-[34px] lg:text-[48px] leading-[133%]">
                        What We Stand For
                    </div>
                    <div className="text-[16px] leading-[140%] lg:text-[20px] lg:leading-[150%] -tracking-[0.2px] space-y-3 lg:space-y-4 pt-[15px] lg:max-w-[500px]">
                        <p>
                            We share our knowledge and expertise with Polish clients who do not hold an OPZ license but wish to import fuels for their own use through our OPZ service.
                        </p>
                        <p>
                            Our deep understanding of the energy market, combined with our commitment to sustainable development, ensures that we consistently meet the highest industry standards while addressing the evolving needs of the energy sector.
                        </p>
                    </div>
                </div>
                <div className="lg:max-w-[640px] w-full relative h-[204px] md:h-[300px] lg:h-[330px] rounded-[12px] overflow-hidden">
                    <Image
                        src={"/assets/AboutUs-page/BrandName-img.png"}
                        alt="Danske Gas Team"
                        fill
                        placeholder="blur"
                        blurDataURL={"/assets/AboutUs-page/BrandName-img.png"}
                        className="w-full h-full object-cover object-right"
                    />
                </div>
            </div>
            <div className="pt-[40px] md:pt-[43px] lg:pt-[100px] grid grid-cols-1 md:grid-cols-3 gap-[32px] lg:gap-[84px]">
                <div className="w-full space-y-2">
                    <h3 className="text-[18px] lg:text-[22px] font-bold leading-[110%]">
                        Strategic Market Access
                    </h3>
                    <p className="text-[16px] leading-[140%] tracking-[-0.1]">
                        As an independent importer, we offer clients streamlined access to global fuel supplies. Whether they hold an OPZ license or rely on our OPZ support service, we help them navigate sourcing with ease, and full regulatory compliance.
                    </p>
                </div>
                <div className="w-full space-y-2">
                    <h3 className="text-[18px] lg:text-[22px] font-bold leading-[110%]">
                        Expertise in Action
                    </h3>
                    <p className="text-[16px] leading-[140%] tracking-[-0.1]">
                        With over 15 years of hands-on experience, our team transforms industry insights into tailored strategies. From licensing to logistics and customs, we build end-to-end import solutions that reduce risk and drive operational results for every client.
                    </p>
                </div>
                <div className="w-full space-y-2">
                    <h3 className="text-[18px] lg:text-[22px] font-bold leading-[110%]">
                        Capital-Backed Stability
                    </h3>
                    <p className="text-[16px] leading-[140%] tracking-[-0.1]">
                        As part of a robust capital group, we bring financial strength to every deal. This foundation allows us to secure procurement channels, support long-term contracts, and confidently scale deliveries across Poland and Central Europe.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrandName;
