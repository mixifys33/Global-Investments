"use client";
import React, { useState, useEffect } from "react";
import { Hero } from "../shared/modules/hero";
import SectionTitle from "../shared/components/section/section-title";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import ProductCard from "@/shared/components/cards/Product-card";
import useUser from "@/hooks/useUser";
import useExpiredEventCleanup from "@/hooks/useExpiredEventCleanup";
import EventsSection from "@/shared/components/sections/EventsSection";
import OffersSection from "@/shared/components/sections/OffersSection";
import Footer from "@/shared/components/Footer";
import Link from "next/link";
import {
  TrendingUp, ArrowRight, BarChart3, Sparkles, PieChart,
  Heart, X, Zap, Tag, Shield, Clock, RotateCcw, Star,
  Briefcase, Package, Flame, Smartphone, DollarSign, Home,
  Sparkle, Calculator, BookOpen, Puzzle, Building,
  type LucideIcon
} from "lucide-react";

const INVESTMENT_CATEGORIES: { label: string; icon: LucideIcon; href: string; color: string }[] = [
  { label: "Stocks",         icon: TrendingUp,     href: "/investments?category=stocks",        color: "from-blue-500 to-indigo-600" },
  { label: "Bonds",          icon: Shield,         href: "/investments?category=bonds",         color: "from-green-500 to-emerald-600" },
  { label: "Real Estate",    icon: Home,           href: "/investments?category=real-estate",   color: "from-orange-500 to-amber-600" },
  { label: "Mutual Funds",   icon: PieChart,       href: "/investments?category=mutual-funds",  color: "from-purple-500 to-violet-600" },
  { label: "ETFs",           icon: BarChart3,      href: "/investments?category=etfs",          color: "from-cyan-500 to-sky-600" },
  { label: "Commodities",    icon: DollarSign,     href: "/investments?category=commodities",   color: "from-yellow-500 to-amber-500" },
  { label: "Retirement",     icon: Clock,          href: "/investments?category=retirement",    color: "from-pink-500 to-rose-600" },
  { label: "Portfolio",      icon: Briefcase,      href: "/portfolio",                          color: "from-teal-500 to-emerald-600" },
];

const TRUST_FEATURES = [
  { icon: Shield, title: "Secure Investments", desc: "Bank-level security", color: "text-teal-600", bg: "bg-teal-50" },
  { icon: BarChart3, title: "Expert Analysis", desc: "Professional insights", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Clock, title: "24/7 Support", desc: "Always here to help", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Star, title: "Top Rated", desc: "4.9★ by investors", color: "text-amber-600", bg: "bg-amber-50" },
];

const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
    <div className="aspect-square skeleton" />
    <div className="p-3 space-y-2">
      <div className="h-2.5 skeleton w-1/3" />
      <div className="h-3.5 skeleton" />
      <div className="h-3.5 skeleton w-3/4" />
      <div className="h-3 skeleton w-1/4" />
      <div className="h-9 skeleton rounded-xl mt-2" />
    </div>
  </div>
);

export default function Page() {
  const { user, isLoading: userLoading } = useUser();
  const [showWelcome, setShowWelcome] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  useExpiredEventCleanup();

  const welcomeMessages = [
    `Welcome back, ${user?.name?.split(" ")[0] || "Investor"}!`,
    `Great to see you, ${user?.name?.split(" ")[0] || "Friend"}!`,
    `Hey ${user?.name?.split(" ")[0] || "there"}! Ready to invest?`,
  ];
  const [currentMessage] = useState(() => welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);

  useEffect(() => {
    if (!user || !showWelcome) return;
    let index = 0;
    setTypedText(""); setIsTyping(true);
    const iv = setInterval(() => {
      if (index < currentMessage.length) { setTypedText(currentMessage.slice(0, index + 1)); index++; }
      else { setIsTyping(false); clearInterval(iv); }
    }, 45);
    return () => clearInterval(iv);
  }, [user, showWelcome, currentMessage]);

  useEffect(() => {
    if (!user || !showWelcome) return;
    const t = setTimeout(() => setShowWelcome(false), 3 * 60 * 1000);
    return () => clearTimeout(t);
  }, [user, showWelcome]);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products?page=1&limit=10");
      return res.data.products;
    },
    staleTime: 1000 * 60 * 3,
  });

  const { data: latestProducts } = useQuery({
    queryKey: ["latest-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products?page=1&limit=10&sortBy=createdAt&sortOrder=desc");
      return res.data.products;
    },
    staleTime: 1000 * 60 * 2,
  });

  const { data: trendingProducts } = useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products?page=1&limit=10&sortBy=stock&sortOrder=desc");
      return res.data.products;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl animate-pulse" style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}>
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">

      {/* Hero — only for guests */}
      {!user && <Hero />}

      {/* Welcome banner for logged-in users */}
      {user && showWelcome && (
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628, #0f2744, #0d3f4d)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b)" }}>
                <Sparkles className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-sm font-semibold text-white truncate">
                {typedText}
                {isTyping && <span className="animate-pulse text-amber-300 ml-0.5">|</span>}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href="/portfolio" className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all">
                <PieChart className="w-4 h-4" />
              </Link>
              <Link href="/watchlist" className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all">
                <Heart className="w-4 h-4" />
              </Link>
              <button onClick={() => setShowWelcome(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events & Offers */}
      <EventsSection minEventsToShow={5} />
      <OffersSection minOffersToShow={5} />

      {/* Category pills */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <SectionTitle title="Investment Categories" icon={<Tag className="w-4 h-4" />} />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {INVESTMENT_CATEGORIES.map((cat, i) => (
              <Link key={cat.label} href={cat.href}
                className="group flex flex-col items-center gap-2 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <cat.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-600 group-hover:text-teal-700 text-center transition-colors leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider mx-4 sm:mx-8" />

      {/* Suggested Investments */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <SectionTitle
              title="Recommended Investments"
              subtitle="Curated opportunities for your portfolio"
              actionLabel="View All"
              actionHref="/investments"
              icon={<Sparkles className="w-4 h-4" />}
            />
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          )}

          {!isLoading && !isError && products?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && !isError && products?.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No investment opportunities available yet.</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
                <X className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-gray-500 font-medium">Failed to load investment opportunities.</p>
              <p className="text-gray-400 text-sm mt-1">Make sure the backend is running.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust features banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="flex items-center gap-3 p-4 rounded-2xl hover:shadow-md transition-shadow duration-200" style={{ background: "#fafafa" }}>
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500 font-medium">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Investments */}
      {trendingProducts?.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10" style={{ background: "linear-gradient(135deg, #fdf4ff, #fce7f3, #fff7ed)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <SectionTitle
                title="Trending Investments 🔥"
                subtitle="Most popular opportunities this week"
                actionLabel="View All"
                actionHref="/investments?sort=trending"
                icon={<Flame className="w-4 h-4" />}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {trendingProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Investment Opportunities */}
      {latestProducts?.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <SectionTitle
                title="New Opportunities ✨"
                subtitle="Fresh investment options just added"
                actionLabel="View All"
                actionHref="/investments?sort=latest"
                icon={<Zap className="w-4 h-4" />}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {latestProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Become an Investment Advisor CTA */}
      {(!user || !user.role?.includes("advisor")) && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2744 40%, #0d3f4d 100%)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 animate-hero-glow" style={{ background: "radial-gradient(circle, #14b8a6, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 animate-hero-glow animation-delay-2000" style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }} />
          </div>
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-amber-300 border border-amber-400/30 glass mb-6">
              <Building className="w-3.5 h-3.5" />
              Join Our Advisory Network
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Share Your Expertise &
              <span className="block" style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Earn More
              </span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8 font-medium">
              Join our network of certified investment advisors. Help clients achieve their financial goals while building your practice.
            </p>
            <Link href="/become-advisor"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-gray-900 text-base shadow-2xl hover:shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b)" }}>
              <Building className="w-5 h-5" />
              Become an Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
