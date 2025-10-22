"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const BrandName: React.FC = () => {
    return (
        <div className="w-full">
            <div className="w-full flex gap-8 md:gap-10 lg:gap-5 flex-col lg:flex-row justify-between">
                <div className="w-full">
                    <h2 className="gradientText font-medium text-[12px] md:text-[16px] leading-[140%] uppercase">
                        Nasze wartości
                    </h2>
                    <div className="text-[34px] lg:text-[48px] leading-[133%]">
                        Co dla nas najważniejsze
                    </div>
                    <div className="text-[16px] leading-[140%] lg:text-[20px] lg:leading-[150%] -tracking-[0.2px] space-y-3 lg:space-y-4 pt-[15px] lg:max-w-[500px]">
                        <p>
                            Dzielimy się wiedzą i doświadczeniem z polskimi klientami, którzy nie posiadają koncesji OPZ, a chcą realizować import na własne potrzeby, korzystając z naszej usługi polegającej na realizacji procedur importowych w ramach naszego OPZ na rzecz klienta.
                        </p>
                        <p>
                            Dzięki dogłębnemu zrozumieniu rynku energii oraz zaangażowaniu w zrównoważony rozwój, niezmiennie spełniamy najwyższe standardy branżowe, odpowiadając na zmieniające się potrzeby sektora energetycznego.
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
                        Strategiczny dostęp do rynku
                    </h3>
                    <p className="text-[16px] leading-[140%] tracking-[-0.1]">
                        Jako niezależny importer zapewniamy klientom prosty i szybki dostęp do globalnych dostaw paliw. Niezależnie od tego, czy posiadają własną koncesję OPZ, czy korzystają z naszej obsługi OPZ, wspieramy ich w bezproblemowym i zgodnym z aktualnymi przepisami pozyskiwaniu paliw.
                    </p>
                </div>
                <div className="w-full space-y-2">
                    <h3 className="text-[18px] lg:text-[22px] font-bold leading-[110%]">
                        Profesjonalizm w praktyce
                    </h3>
                    <p className="text-[16px] leading-[140%] tracking-[-0.1]">
                        Dysponując ponad 15-letnim doświadczeniem, nasz zespół przekształca wiedzę o branży w dopasowane strategie. Od spraw koncesyjnych po logistykę i odprawy celne – tworzymy kompleksowe rozwiązania importowe, które minimalizują ryzyko i zwiększają efektywność operacyjną każdego klienta.
                    </p>
                </div>
                <div className="w-full space-y-2">
                    <h3 className="text-[18px] lg:text-[22px] font-bold leading-[110%]">
                        Stabilność oparta na kapitale
                    </h3>
                    <p className="text-[16px] leading-[140%] tracking-[-0.1]">
                        Jako część solidnej grupy kapitałowej zapewniamy finansową pewność w każdej transakcji. Dzięki temu możemy bezpiecznie zabezpieczać kanały zaopatrzenia, wspierać długoterminowe kontrakty i skutecznie zwiększać skalę dostaw w Polsce oraz w Europie Środkowej.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BrandName;
