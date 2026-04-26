import './global.css';
import { Plus_Jakarta_Sans, Space_Grotesk, Inter } from "next/font/google";
import Providers from "./providers";
import ConditionalHeader from "../shared/widgets/Header/ConditionalHeader";
import ProductComparisonBar from "../shared/components/product-comparison/ProductComparisonBar";
import ServiceWorkerRegistrar from "../shared/components/ServiceWorkerRegistrar";
import type { Metadata } from "next";

const BASE_URL = "https://globalinvestments.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Global Investments — Your Trusted Investment Partner | Secure Financial Growth",
    template: "%s | Global Investments",
  },
  description:
    "Global Investments is your premier investment platform offering comprehensive financial solutions, portfolio management, market analysis, and expert investment guidance for secure financial growth.",
  keywords: [
    "investment platform",
    "financial planning",
    "portfolio management",
    "investment advisory",
    "wealth management",
    "financial growth",
    "investment opportunities",
    "market analysis",
    "financial security",
    "investment solutions",
    "asset management",
    "financial consulting",
    "investment strategies",
    "retirement planning",
    "financial advisor",
    "investment portfolio",
    "capital growth",
    "financial services",
    "investment guidance",
    "wealth building",
    "financial planning services",
    "investment management",
    "financial investment",
    "investment firm",
    "financial advisor services",
    "investment consulting",
    "portfolio optimization",
    "financial planning advisor",
    "investment planning",
    "wealth creation",
  ],
  authors: [{ name: "Global Investments", url: BASE_URL }],
  creator: "Global Investments",
  publisher: "Global Investments",
  category: "finance",
  classification: "Finance, Investment, Wealth Management",
  manifest: "/manifest.json",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Global Investments",
    title: "Global Investments — Your Trusted Investment Partner",
    description:
      "Secure your financial future with comprehensive investment solutions, expert portfolio management, and personalized financial guidance from Global Investments.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Global Investments — Your Trusted Investment Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@globalinvestments",
    creator: "@globalinvestments",
    title: "Global Investments — Your Trusted Investment Partner",
    description:
      "Secure financial growth with expert investment guidance, portfolio management, and comprehensive financial solutions.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Global Investments",
  },

};


export const viewport = {
  themeColor: "#0d3f4d",
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Global Investments",
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512.png`,
  description: "Premier investment platform offering comprehensive financial solutions, portfolio management, and expert investment guidance for secure financial growth.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Global Investments",
  url: BASE_URL,
  description: "Your trusted investment partner — comprehensive financial solutions, portfolio management, and expert investment guidance for secure financial growth.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, sans-serif" }}>
        <Providers>
          <ConditionalHeader />
          <ServiceWorkerRegistrar />
          {children}
          <ProductComparisonBar />
        </Providers>
      </body>
    </html>
  );
}
