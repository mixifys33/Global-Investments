import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, ShieldCheck, TrendingUp, Users, Star, BarChart3,
  Phone, Mail, Globe, CheckCircle, Heart, Zap, Award,
  Briefcase, Building, Clock, ArrowRight, DollarSign,
} from "lucide-react";

const BASE_URL = "https://globalinvestments.vercel.app";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About Global Investments — Your Trusted Investment Partner Worldwide",
  description:
    "Global Investments is a premier investment platform serving clients worldwide. Expert portfolio management, market analysis, and personalized investment guidance for secure financial growth.",
  keywords: [
    "Global Investments about",
    "investment platform worldwide",
    "global investment services",
    "portfolio management",
    "investment advisory",
    "wealth management",
    "financial planning",
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
    "investment management",
    "financial investment",
    "investment firm",
    "global markets",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${BASE_URL}/about`,
    siteName: "Global Investments",
    title: "About Global Investments — Your Trusted Investment Partner Worldwide",
    description:
      "Premier investment platform serving clients worldwide. Global Investments provides expert portfolio management, market analysis, and personalized investment guidance.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Global Investments — About Us" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Global Investments — Your Trusted Investment Partner",
    description: "Premier investment platform serving clients worldwide with expert portfolio management and market analysis.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: `${BASE_URL}/about` },
};

// ─── Structured Data ──────────────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Global Investments",
  alternateName: "Global Investments Platform",
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512.png`,
  description:
    "Global Investments is a premier investment platform providing comprehensive financial solutions, portfolio management, and expert investment guidance for secure financial growth worldwide.",
  foundingDate: "2024",
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
  ],
  sameAs: [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Global Investments",
  description: "Premier investment platform providing comprehensive financial solutions worldwide",
  url: BASE_URL,
  telephone: "+1-555-123-4567",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  priceRange: "$$",
  currenciesAccepted: "USD, EUR, GBP",
  paymentAccepted: "Bank Transfer, Wire Transfer, Credit Card",
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "$2.5B+", label: "Assets Under Management", icon: DollarSign },
  { value: "10,000+", label: "Active Investors", icon: Users },
  { value: "500+", label: "Investment Options", icon: Briefcase },
  { value: "4.9★", label: "Client Satisfaction", icon: Star },
];

// ─── Values ───────────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Security & Trust",
    desc: "Bank-level security protocols protect your investments. Every transaction is secured with advanced encryption and regulatory compliance.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Expert Analysis",
    desc: "Our team of certified financial analysts provides comprehensive market research and personalized investment recommendations.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    desc: "Built for investors worldwide. We provide personalized service and support to help you achieve your financial goals.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Cutting-edge technology platform with AI-powered insights, real-time analytics, and automated portfolio management.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Award,
    title: "Proven Performance",
    desc: "Track record of consistent returns and risk management. Our strategies are tested and refined by market professionals.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Growth Focus",
    desc: "We help investors build wealth through diversified portfolios, strategic planning, and long-term growth strategies.",
    color: "from-teal-500 to-[#115061]",
  },
];

// ─── Team ─────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Global Investment Team",
    role: "Investment Professionals",
    location: "Worldwide",
    bio: "Our team of certified financial advisors, portfolio managers, and market analysts work together to provide exceptional investment services to clients globally.",
    initials: "GI",
    gradient: "from-[#115061] to-teal-600",
  },
];

// ─── Global Reach ─────────────────────────────────────────────────────────────
const GLOBAL_POINTS = [
  "Serving investors across North America, Europe, Asia, and beyond",
  "Multi-currency support for international investments",
  "24/7 global market access and real-time trading",
  "Regulatory compliance across multiple jurisdictions",
  "Local expertise with global investment opportunities",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="min-h-screen bg-gray-50">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0d3f4d] via-[#115061] to-teal-700 text-white">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-5 py-2 text-amber-300 text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              Serving Investors Worldwide
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Your Trusted{" "}
              <span className="text-amber-400">Investment</span>{" "}
              Partner
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Global Investments provides <strong className="text-amber-300">comprehensive financial solutions</strong> with a simple mission —
              to make investing accessible, secure, and profitable for every investor worldwide.
              From portfolio management to market analysis, we guide your financial journey.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/investments"
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-teal-900 font-black px-8 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <Briefcase className="w-5 h-5" />
                Start Investing
              </Link>
              <Link
                href="/become-advisor"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
              >
                <Building className="w-5 h-5" />
                Become an Advisor
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
                <div className="w-12 h-12 bg-[#115061]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#115061]" />
                </div>
                <div className="text-2xl font-black text-gray-900">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-[#115061] uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-6 leading-tight">
                Built for Investors,<br />Trusted Worldwide
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Global Investments was founded with a vision to democratize access to professional investment services.
                  We recognized that quality financial guidance and portfolio management should be available to all investors,
                  not just the ultra-wealthy.
                </p>
                <p>
                  Starting with a commitment to transparency and client success, we've grown into a comprehensive
                  investment platform serving clients across multiple continents. Our technology-driven approach
                  combines human expertise with advanced analytics.
                </p>
                <p>
                  Today, Global Investments manages billions in assets, powered by cutting-edge technology,
                  regulatory compliance, and a team of certified investment professionals dedicated to your financial success.
                </p>
              </div>
            </div>

            {/* Global reach card */}
            <div className="bg-gradient-to-br from-[#0d3f4d] to-teal-700 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-teal-900" />
                </div>
                <div>
                  <h3 className="font-black text-lg">Global Reach</h3>
                  <p className="text-white/70 text-sm">Worldwide Investment Services</p>
                </div>
              </div>
              <ul className="space-y-3">
                {GLOBAL_POINTS.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                    <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-2 text-amber-300 text-sm font-semibold">
                <DollarSign className="w-4 h-4" />
                Multi-currency support for global markets
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-[#115061] uppercase tracking-widest">What Drives Us</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Mission &amp; Vision</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#115061]/5 to-teal-50 rounded-2xl p-8 border border-[#115061]/10">
                <div className="w-14 h-14 bg-[#115061] rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower every investor worldwide with professional-grade investment tools, expert guidance, and 
                  transparent financial services that help build long-term wealth and achieve financial independence.
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                  <TrendingUp className="w-7 h-7 text-teal-900" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted investment platform — where every individual has access to 
                  institutional-quality investment services, market insights, and financial growth opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-[#115061] uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-[#115061] uppercase tracking-widest">The People Behind Global Investments</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Our Leadership</h2>
            </div>
            <div className="flex justify-center">
              {TEAM.map(({ name, role, location, bio, initials, gradient }) => (
                <div key={name} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-sm w-full text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <span className="text-white font-black text-xl">{initials}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">{name}</h3>
                  <p className="text-[#115061] font-semibold text-sm mt-1">{role}</p>
                  <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mt-1 mb-4">
                    <Globe className="w-3 h-3" />
                    {location}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY TRUST US ── */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-[#115061] uppercase tracking-widest">Why Choose Global Investments</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Why Investors Trust Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: ShieldCheck, title: "Regulatory Compliance", desc: "Fully licensed and regulated by financial authorities. Your investments are protected by industry-leading security measures." },
              { icon: Clock, title: "24/7 Platform Access", desc: "Monitor your portfolio and execute trades anytime, anywhere. Our platform is always available for your investment needs." },
              { icon: BarChart3, title: "Professional Analysis", desc: "Access to institutional-grade research, market analysis, and investment recommendations from certified professionals." },
              { icon: Phone, title: "Dedicated Support", desc: "Personal investment advisors and customer support team available to help you make informed investment decisions." },
              { icon: Star, title: "Proven Track Record", desc: "Consistent performance and client satisfaction. Our investment strategies are backed by years of market experience." },
              { icon: Zap, title: "AI-Powered Insights", desc: "Advanced algorithms and machine learning provide personalized investment recommendations and portfolio optimization." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-[#115061]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#115061]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-[#115061] uppercase tracking-widest">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Contact Us</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Have a question, partnership inquiry, or want to become an investment advisor? We&apos;d love to hear from you.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <a
                href="tel:+15551234567"
                className="flex flex-col items-center gap-3 bg-[#115061]/5 hover:bg-[#115061]/10 border border-[#115061]/10 rounded-2xl p-6 text-center transition-colors group"
              >
                <div className="w-12 h-12 bg-[#115061] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Call Us</p>
                  <p className="text-[#115061] font-semibold text-sm mt-1">+1 (555) 123-4567</p>
                </div>
              </a>
              <a
                href="mailto:info@globalinvestments.com"
                className="flex flex-col items-center gap-3 bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-2xl p-6 text-center transition-colors group"
              >
                <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-teal-900" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Email Us</p>
                  <p className="text-amber-600 font-semibold text-sm mt-1">info@globalinvestments.com</p>
                </div>
              </a>
              <div className="flex flex-col items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Global Presence</p>
                  <p className="text-gray-500 font-medium text-sm mt-1">Serving Clients<br />Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0d3f4d] via-[#115061] to-teal-700 rounded-3xl p-10 text-white text-center shadow-2xl">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-400/10 rounded-full" />
            </div>
            <div className="relative z-10">
              <Briefcase className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-3xl font-black mb-3">Ready to Start Investing?</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Join thousands of investors already building wealth with Global Investments.
                Professional guidance, secure platform, proven results.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/investments"
                  className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-teal-900 font-black px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  <Briefcase className="w-5 h-5" />
                  Browse Investments
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/become-advisor"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-all"
                >
                  <Building className="w-5 h-5" />
                  Become an Advisor
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
