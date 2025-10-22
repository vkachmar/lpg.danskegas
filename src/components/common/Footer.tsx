"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ---------- Interfaces ----------
interface LinkItem {
  name: string;
  href: string;
}

// ---------- Constants ----------
const LOGO_DIMENSIONS = {
  width: 224,
  height: 44,
  className: "w-[224px] h-[44px]",
} as const;

// ---------- LinkedIn Icon ----------
const LinkedInIcon: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_144_1137)">
      <path
        d="M16 0.578125C7.16344 0.578125 0 7.74156 0 16.5781C0 25.4147 7.16344 32.5781 16 32.5781C24.8366 32.5781 32 25.4147 32 16.5781C32 7.74156 24.8366 0.578125 16 0.578125ZM11.4647 24.4948H7.89881V13.3064H11.4647V24.4948ZM9.68175 11.8411C9.28495 11.8411 8.89706 11.7235 8.56714 11.503C8.23721 11.2826 7.98006 10.9692 7.82822 10.6026C7.67637 10.236 7.63664 9.83265 7.71405 9.44347C7.79146 9.0543 7.98254 8.69682 8.26312 8.41624C8.5437 8.13566 8.90118 7.94459 9.29035 7.86717C9.67952 7.78976 10.0829 7.82949 10.4495 7.98134C10.8161 8.13319 11.1294 8.39034 11.3499 8.72026C11.5703 9.05019 11.688 9.43808 11.688 9.83488C11.688 10.367 11.4766 10.8773 11.1004 11.2535C10.7241 11.6298 10.2138 11.8411 9.68175 11.8411ZM24.325 24.4948H20.825V18.3772C20.825 18.0664 20.8741 16.0054 19.1238 16.0054C18.8128 15.9976 18.5045 16.0651 18.2251 16.2019C17.9456 16.3387 17.7034 16.5409 17.5187 16.7914C17.1973 17.2203 17.0256 17.7429 17.0301 18.2789V24.4946H13.5344V13.3064H16.8604V14.8767C17.6564 13.6554 18.6597 13.2083 19.6465 13.0284C21.3982 12.709 24.3247 13.7754 24.3247 16.9596L24.325 24.4948Z"
        fill="#FDFCFC"
      />
    </g>
    <defs>
      <clipPath id="clip0_144_1137">
        <rect
          width="32"
          height="32"
          fill="white"
          transform="translate(0 0.578125)"
        />
      </clipPath>
    </defs>
  </svg>
);

// ---------- Footer Components ----------
const FooterLogo: React.FC = () => (
  <div>
    <Link href="/">
      <Image
        src="/assets/logos/light-logo.svg"
        alt="Danske Gas Logo"
        {...LOGO_DIMENSIONS}
      />
    </Link>
  </div>
);

const FooterDescription: React.FC<{ text: string }> = ({ text }) => (
  <div className="max-w-[405px] text-sm lg:text-base">{text}</div>
);

// ---------- Main Footer ----------
const Footer: React.FC = () => {
  const pathname = usePathname();
  const currentLanguage = pathname.startsWith("/pl") ? "PL" : "EN";

  // Language-based text
  const FOOTER_TEXTS = {
    EN: {
      description:
        "Danske Gas powers industries, engines, and champions. From high-performance racing fuels to technical gases.",
      copyright: "© 2025. All rights reserved.",
    },
    PL: {
      description:
        "Danske Gas napędza przemysł, silniki i mistrzów. Od wysokowydajnych paliw wyścigowych po gazy techniczne.",
      copyright: "© 2025. Wszelkie prawa zastrzeżone.",
    },
  };

  const { description, copyright } = FOOTER_TEXTS[currentLanguage];

  return (
    <footer className="bg-brown text-white">
      <div className="container-custom">
        {/* Top section */}
        <div className="pt-[56px] pb-[42px] w-full">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <FooterLogo />
            <FooterDescription text={description} />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full border-t border-dark-gray">
        <div className="container-custom">
          <div className="flex flex-row justify-between items-center gap-4 pt-[14px] lg:pb-[56px] pb-[40px]">
            <p className="text-[16px]">{copyright}</p>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
