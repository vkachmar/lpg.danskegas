"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/Icons";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  className?: string;
}

interface Language {
  code: string;
  name: string;
  href: string;
}

const NAV_ITEMS_EN: NavItem[] = [
  { label: "Our Story", href: "#our_story" },
  { label: "Values", href: "#our_value" },
  { label: "Our Products", href: "#our_product" },
  { label: "Contact Us", href: "#contact_us" },
];

const NAV_ITEMS_PL: NavItem[] = [
  { label: "Nasza Historia", href: "#our_story" },
  { label: "Wartości", href: "#our_value" },
  { label: "Nasze Produkty", href: "#our_product" },
  { label: "Kontakt", href: "#contact_us" },
];

const LANGUAGES: Language[] = [
  { code: "EN", name: "English", href: "/" },
  { code: "PL", name: "Polish", href: "/pl" },
];

const BREAKPOINTS = {
  MOBILE_LOGO: 786,
  MOBILE_MENU: 1025,
  DESKTOP_LARGE: 1275,
} as const;

const IMAGES = {
  DESKTOP_LOGO: "/assets/logos/light-logo.svg",
  MOBILE_LOGO: "/assets/logos/mobile-light-logo.svg",
} as const;

const Navbar: React.FC<HeaderProps> = ({ className = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [windowWidth, setWindowWidth] = useState(1200);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [showFixedNav, setShowFixedNav] = useState(false);
  const currentLanguage = pathname.startsWith("/pl") ? "PL" : "EN";


  // Special routes where navbar appears immediately
  const noTopNavRoutes = ["/news"];
  const isSpecialRoute = noTopNavRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Scroll threshold: 0px for special routes, 100px for others
  const SCROLL_THRESHOLD = isSpecialRoute ? 0 : 100;

  // Handle scroll to show/hide fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNav(window.scrollY >= SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, SCROLL_THRESHOLD]);

  // Responsive logic
  const isMobileMenu = windowWidth <= BREAKPOINTS.MOBILE_MENU;
  const isMobileMenu2 = windowWidth <= BREAKPOINTS.MOBILE_MENU;
  const isMobileLogo = windowWidth <= BREAKPOINTS.MOBILE_LOGO;

  const NAV_ITEMS = currentLanguage === "PL" ? NAV_ITEMS_PL : NAV_ITEMS_EN;

  const navItemsWithActive = NAV_ITEMS.map(item => ({
    ...item,
    isActive: item.href !== "#" && pathname.startsWith(item.href),
  }));

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);


  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle window resize
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

  // Close mobile menus if screen changes
  useEffect(() => {
    if (!isMobileMenu) setIsMenuOpen(false);
  }, [isMobileMenu]);

  useEffect(() => {
    if (!isMobileMenu2) setIsMenuOpen2(false);
  }, [isMobileMenu2]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  const selectLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsLanguageDropdownOpen(false);

  };

  return (
    <div className="w-full">
      {!showFixedNav &&
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`absolute top-0 left-0 right-0 w-full z-[999]`}
        >
          <div className="
            pl-4 pr-4 pt-6 pb-0
            md:pl-[40px] md:pr-[40px] md:pt-6 md:pb-0
            lg:pl-[80px] lg:pr-[80px] lg:pt-[45.48px] lg:pb-[16px] 
            3xl:pl-0 3xl:pr-0 3xl:pt-[36px] 3xl:pb-[16px]
            3xl:max-w-[1306px] w-full mx-auto"
          >
            <nav className="flex items-center justify-between">
              <div
                className="flex-shrink-0 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <Image
                  src={isMobileLogo ? IMAGES.MOBILE_LOGO : IMAGES.DESKTOP_LOGO}
                  alt="Danske Gas"
                  width={isMobileLogo ? 35 : 244}
                  height={isMobileLogo ? 30 : 40}
                  priority
                  className="transition-all duration-300 only-lg:w-[200px] md:w-[224px] md:h-[44px]"
                />
              </div>

              {/* Desktop Navigation */}
              {!isMobileMenu && (
                <div className="flex items-center gap-[80px]">
                  <div className="flex items-center gap-10">
                    {navItemsWithActive.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={`cursor-pointer inline-block text-[20px] leading-[150%] only-lg:text-[18px] 
                                hover:scale-110  ${item.isActive ? "font-semibold" : "font-normal"}
                                transition-all duration-300 whitespace-nowrap relative group text-white`
                        }
                      >

                        {item.label}

                        <span
                          className={`absolute left-0 -bottom-0 bg-white transition-all duration-300 ${item.isActive ? "w-full h-0.5" : "w-0 h-px group-hover:w-full"}`}
                        ></span>
                      </Link>
                    ))}
                  </div>

                  <div
                    className="flex-shrink-0 relative"
                    ref={languageDropdownRef}
                  >
                    <button
                      onClick={toggleLanguageDropdown}
                      className="flex items-center text-white font-normal text-[18px] transition-opacity duration-300 hover:opacity-80 only-lg:text-[16px]  cursor-pointer"
                    >
                      {selectedLanguage}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Language Dropdown */}
                    {isLanguageDropdownOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-[61.4%] mt-2 py-2 min-w-[80px] z-50">
                        {LANGUAGES.map((language) => (
                          // <button
                          //   key={language.code}
                          //   onClick={() => selectLanguage(language.code)}
                          //   className="block w-full text-center px-1 py-1 text-white font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                          //   style={{
                          //     fontWeight: 400,
                          //     fontSize: "18px",
                          //     lineHeight: "150%",
                          //     letterSpacing: "0%",
                          //     textTransform: "uppercase",
                          //   }}
                          // >
                          //   {language.code}
                          // </button>
                          <Link
                            href={language.href}
                            scroll={false}
                            onClick={() => selectLanguage(language.code)}
                            key={language.code}
                            className="block w-full text-center px-1 py-1 text-white font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                            style={{
                              fontWeight: 400,
                              fontSize: "18px",
                              lineHeight: "150%",
                              letterSpacing: "0%",
                              textTransform: "uppercase",
                            }}
                          >
                            {language.code}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Hamburger with Shadcn Dropdown */}
              {isMobileMenu && (
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label="Toggle menu"
                      className="cursor-pointer z-50"
                    >
                      <Icons.HamBurger />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="max-w-[calc(100vw-32px)] w-[calc(100vw-32px)] mx-4 
                        md:max-w-[calc(100vw-80px)] md:w-[calc(100vw-80px)] md:mx-[40px]
                        mt-4 rounded-b-2xl bg-off-white backdrop-blur-lg shadow-2xl border border-white/30 z-[60]"
                    align="end"
                    sideOffset={8}
                    style={{ borderRadius: "0 0 20px 20px" }}
                  >
                    <div className="mt-4 mb-2">
                      {navItemsWithActive.map((item, index) => (
                        <DropdownMenuItem key={index} asChild>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className={`block whitespace-nowrap px-6 py-2 text-[20px] transition-all duration-300 relative group cursor-pointer 
                              ${item.isActive ? "text-charcoal font-semibold" : "text-charcoal font-normal"}`}
                          >
                            <span className="relative inline-block">
                              <span
                                className={`transition-opacity duration-300 ${item.isActive ? "" : "group-hover:opacity-0"}`}
                              >
                                {item.label}
                              </span>

                              {!item.isActive && (
                                <span className="absolute inset-0 font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  {item.label}
                                </span>
                              )}

                              <span
                                className={`absolute left-0 -bottom-0 h-[1px] bg-charcoal transition-all duration-300 ${item.isActive
                                  ? "w-full"
                                  : "w-0 group-hover:w-full"
                                  }`}
                              ></span>
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      ))}

                      <div className="relative" ref={languageDropdownRef}>
                        <button
                          onClick={toggleLanguageDropdown}
                          className="flex items-center px-6 py-3 font-normal text-[18px] text-charcoal transition-opacity duration-300 hover:opacity-80 w-full text-left cursor-pointer"
                        >
                          {selectedLanguage}
                          <ChevronDown
                            className={`ml-2 w-4 h-4 transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {isLanguageDropdownOpen && (
                          <div className="px-6 pb-2">
                            {LANGUAGES.filter(
                              (lang) => lang.code !== selectedLanguage
                            ).map((language) => (
                              // <button
                              //   key={language.code}
                              //   onClick={() => selectLanguage(language.code)}
                              //   className="block w-full text-left py-1 text-charcoal font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                              //   style={{
                              //     fontWeight: 400,
                              //     fontSize: "18px",
                              //     lineHeight: "150%",
                              //     letterSpacing: "0%",
                              //     textTransform: "uppercase",
                              //   }}
                              // >
                              //   {language.code}
                              // </button>
                              <Link
                                href={language.href}
                                scroll={false}
                                onClick={() => selectLanguage(language.code)}
                                key={language.code}
                                className="block w-full pl-3 py-1 font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                                style={{
                                  fontWeight: 400,
                                  fontSize: "18px",
                                  lineHeight: "150%",
                                  letterSpacing: "0%",
                                  textTransform: "uppercase",
                                }}
                              >
                                {language.code}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>
          </div>
        </motion.div>
      }
      {/* after scroll this navbar will appear */}
      <AnimatePresence>
        {showFixedNav && (
          <motion.div
            key="fixed-nav"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 w-full z-[999] 
              bg-gradient-to-r from-[#A01800] via-[#D80A00] to-[#F99639]`}
          >
            <div className="
              pl-4 pr-4 py-[8px]
              md:pl-[40px] md:pr-[40px] md:py-[15px]
              lg:pl-[80px] lg:pr-[80px] lg:py-[18px] 
              3xl:pl-0 3xl:pr-0 3xl:py-[16px]
              3xl:max-w-[1281px] w-full mx-auto"
            >
              <nav className="flex items-center justify-between">
                <div
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  <Image
                    src={isMobileLogo ? IMAGES.MOBILE_LOGO : IMAGES.DESKTOP_LOGO}
                    alt="Danske Gas"
                    width={isMobileLogo ? 35 : 244}
                    height={isMobileLogo ? 30 : 40}
                    priority
                    className="transition-all duration-300 only-lg:w-[200px] md:w-[224px] md:h-[44px]"
                  />
                </div>

                {/* Desktop Navigation */}
                {!isMobileMenu2 && (
                  <div className="flex items-center gap-[80px]">
                    <div className="flex items-center gap-10">
                      {navItemsWithActive.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`cursor-pointer inline-block text-[20px] leading-[150%] only-lg:text-[18px] 
                              hover:scale-110 ${item.isActive ? "font-semibold" : "font-normal"}
                              transition-all duration-300 whitespace-nowrap relative group text-white`
                          }
                        >

                          {item.label}

                          <span
                            className={`absolute left-0 -bottom-0 h-[1px] bg-white transition-all duration-300 ${item.isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                          ></span>
                        </Link>
                      ))}
                    </div>

                    <div
                      className="flex-shrink-0 relative"
                      ref={languageDropdownRef}
                    >
                      <button
                        onClick={toggleLanguageDropdown}
                        className="flex items-center text-white font-normal text-[18px] transition-opacity duration-300 hover:opacity-80 only-lg:text-[16px]  cursor-pointer"
                      >
                        {selectedLanguage}
                        <ChevronDown
                          className={`ml-1 w-4 h-4 transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* Language Dropdown */}
                      {isLanguageDropdownOpen && (
                        <div className="absolute top-full left-1/2 transform -translate-x-[61.4%] mt-2 py-2 min-w-[80px] z-50 bg-[#F99639]">
                          {LANGUAGES.map((language) => (
                            // <button
                            //   key={language.code}
                            //   onClick={() => selectLanguage(language.code)}
                            //   className="block w-full text-center px-1 py-1 text-white font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                            //   style={{
                            //     fontWeight: 400,
                            //     fontSize: "18px",
                            //     lineHeight: "150%",
                            //     letterSpacing: "0%",
                            //     textTransform: "uppercase",
                            //   }}
                            // >
                            //   {language.code}
                            // </button>
                            <Link
                              href={language.href}
                              scroll={false}
                              onClick={() => selectLanguage(language.code)}
                              key={language.code}
                              className="block w-full text-center px-1 py-1 text-white font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                              style={{
                                fontWeight: 400,
                                fontSize: "18px",
                                lineHeight: "150%",
                                letterSpacing: "0%",
                                textTransform: "uppercase",
                              }}
                            >
                              {language.code}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile Hamburger with Shadcn Dropdown */}
                {isMobileMenu2 && (
                  <DropdownMenu open={isMenuOpen2} onOpenChange={setIsMenuOpen2}>
                    <DropdownMenuTrigger asChild>
                      <button
                        aria-label="Toggle menu"
                        className="cursor-pointer z-50"
                      >
                        <Icons.HamBurger />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="max-w-[calc(100vw-32px)] w-[calc(100vw-32px)] mx-4 
                      md:max-w-[calc(100vw-80px)] md:w-[calc(100vw-80px)] md:mx-[40px]
                      mt-4 rounded-b-2xl bg-off-white backdrop-blur-lg shadow-2xl border border-white/30 z-[60]"
                      align="end"
                      sideOffset={8}
                      style={{ borderRadius: "0 0 20px 20px" }}
                    >
                      <div className="mt-4 mb-2">
                        {navItemsWithActive.map((item, index) => (
                          <DropdownMenuItem key={index} asChild>
                            <Link
                              href={item.href}
                              onClick={closeMenu}
                              className={`block whitespace-nowrap px-6 py-2 text-[20px] transition-all duration-300 relative group cursor-pointer ${item.isActive
                                ? "text-charcoal font-semibold"
                                : "text-charcoal font-normal"
                                }`}
                            >
                              <span className="relative inline-block">
                                <span
                                  className={`transition-opacity duration-300 ${item.isActive ? "" : "group-hover:opacity-0"
                                    }`}
                                >
                                  {item.label}
                                </span>

                                {!item.isActive && (
                                  <span className="absolute inset-0 font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    {item.label}
                                  </span>
                                )}

                                <span
                                  className={`absolute left-0 -bottom-0 h-[1px] bg-charcoal transition-all duration-300 ${item.isActive
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                                    }`}
                                ></span>
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        ))}

                        <div className="relative" ref={languageDropdownRef}>
                          <button
                            onClick={toggleLanguageDropdown}
                            className="flex items-center px-6 py-3 font-normal text-[18px] text-charcoal transition-opacity duration-300 hover:opacity-80 w-full text-left cursor-pointer"
                          >
                            {selectedLanguage}
                            <ChevronDown
                              className={`ml-2 w-4 h-4 transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                          </button>

                          {isLanguageDropdownOpen && (
                            <div className="px-6 pb-2">
                              {LANGUAGES.filter(
                                (lang) => lang.code !== selectedLanguage
                              ).map((language) => (
                                // <button
                                //   key={language.code}
                                //   onClick={() => selectLanguage(language.code)}
                                //   className="block w-full text-left py-1 text-charcoal font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                                //   style={{
                                //     fontWeight: 400,
                                //     fontSize: "18px",
                                //     lineHeight: "150%",
                                //     letterSpacing: "0%",
                                //     textTransform: "uppercase",
                                //   }}
                                // >
                                //   {language.code}
                                // </button>
                                <Link
                                  href={language.href}
                                  scroll={false}
                                  onClick={() => selectLanguage(language.code)}
                                  key={language.code}
                                  className="block w-full pl-3 py-1 font-normal text-[18px] leading-[150%] uppercase transition-opacity duration-300 hover:opacity-80 cursor-pointer"
                                  style={{
                                    fontWeight: 400,
                                    fontSize: "18px",
                                    lineHeight: "150%",
                                    letterSpacing: "0%",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {language.code}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
