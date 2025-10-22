import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/Header";
import FooterWrapper from "@/components/common/FooterWrapper";
import Script from "next/script";
import CookiebotScript from "@/components/common/CookiebotScript";
import CookiebotReact from "@/components/common/CookiebotReact";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Danske Gas - Industrial Gas Supply & Reliable Delivery Solutions",
    template: "%s | Danske Gas",
  },
  description:
    "Leading industrial gas supplier providing certified imports, reliable delivery, and comprehensive gas solutions. Powering industries, engines, and champions with premium gas products and services.",
  keywords: [
    "industrial gas supply",
    "gas delivery",
    "certified gas imports",
    "reliable gas delivery",
    "industrial focus",
    "gas solutions",
    "energy supply",
    "gas distribution",
    "commercial gas",
    "industrial energy",
    "gas services",
    "fuel supply",
    "energy solutions",
  ],
  authors: [{ name: "Danske Gas" }],
  creator: "Danske Gas",
  publisher: "Danske Gas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://danske-gas.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Danske Gas - Industrial Gas Supply & Reliable Delivery Solutions",
    description:
      "Leading industrial gas supplier providing certified imports, reliable delivery, and comprehensive gas solutions. Powering industries, engines, and champions.",
    url: "https://danske-gas.vercel.app",
    siteName: "Danske Gas",
    images: [
      {
        url: "/assets/heroSectionImg.webp",
        width: 1200,
        height: 630,
        alt: "Danske Gas - Industrial Gas Supply Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danske Gas - Industrial Gas Supply & Reliable Delivery Solutions",
    description:
      "Leading industrial gas supplier providing certified imports, reliable delivery, and comprehensive gas solutions.",
    images: ["/assets/heroSectionImg.webp"],
    creator: "@danskegas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {/* <CookiebotReact/> */}
        <CookiebotScript />
        <Navbar />
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <FooterWrapper />
        <GoogleAnalytics/>
        <Script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LeJ0fIrAAAAAAzv0TGeCLDsUBsdXahf5QgaHNTS"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
