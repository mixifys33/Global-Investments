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
import StunningLayout from "@/shared/components/layouts/StunningLayout";
import StunningCard from "@/shared/components/cards/StunningCard";
import {
  TrendingUp, ArrowRight, BarChart3, Sparkles, PieChart,
  Heart, X, Zap, Tag, Shield, Clock, RotateCcw, Star,
  Briefcase, Package, Flame, Smartphone, DollarSign, Home,
  Sparkle, Calculator, BookOpen, Puzzle, Building,
  type LucideIcon
} from "lucide-react";

const INVESTMENT_CATEGORIES: { label: string; icon: LucideIcon; href: string; color: string }[] = [
  { label: "💰 Stocks",         icon: TrendingUp,     href: "/investments?category=stocks",        color: "from-blue-500 via-indigo-600 to-purple-700" },
  { label: "💎 Bonds",          icon: Shield,         href: "/investments?category=bonds",         color: "from-green-500 via-emerald-600 to-teal-700" },
  { label: "🏠 Real Estate",    icon: Home,           href: "/investments?category=real-estate",   color: "from-orange-500 via-amber-600 to-yellow-700" },
  { label: "📈 Mutual Funds",   icon: PieChart,       href: "/investments?category=mutual-funds",  color: "from-purple-500 via-violet-600 to-fuchsia-700" },
  { label: "🚀 ETFs",           icon: BarChart3,      href: "/investments?category=etfs",          color: "from-cyan-500 via-sky-600 to-blue-700" },
  { label: "⚡ Commodities",    icon: DollarSign,     href: "/investments?category=commodities",   color: "from-yellow-500 via-amber-600 to-orange-700" },
  { label: "⏰ Retirement",     icon: Clock,          href: "/investments?category=retirement",    color: "from-pink-500 via-rose-600 to-red-700" },
  { label: "💼 Portfolio",      icon: Briefcase,      href: "/portfolio",                          color: "from-teal-500 via-emerald-600 to-green-700" },
];

const TRUST_FEATURES = [
  { icon: Shield, title: "🔒 SECURE", desc: "Bank-level security", color: "text-green-600", bg: "bg-gradient-to-br from-green-100 to-emerald-200" },
  { icon: BarChart3, title: "📊 EXPERT", desc: "Professional insights", color: "text-blue-600", bg: "bg-gradient-to-br from-blue-100 to-cyan-200" },
  { icon: Clock, title: "⚡ 24/7", desc: "Always here to help", color: "text-purple-600", bg: "bg-gradient-to-br from-purple-100 to-violet-200" },
  { icon: Star, title: "⭐ TOP RATED", desc: "5.0★ by investors", color: "text-amber-600", bg: "bg-gradient-to-br from-amber-100 to-yellow-200" },
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
      <StunningLayout variant="cosmic" showWaves={true} showOrbs={true} showParticles={true}>
        <div className="min-h-screen flex items-center justify-center">
          <StunningCard variant="cosmic" size="lg" animated={true} glowing={true} floating={true} className="text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center shadow-2xl animate-morph-blob">
                  <Briefcase className="w-12 h-12 text-white animate-sparkle-dance" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping"></div>
              </div>
              <div className="space-y-3">
                <div className="w-16 h-16 border-4 border-white/30 border-t-yellow-400 rounded-full animate-spin mx-auto" />
                <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow">
                  Loading Your Wealth...
                </h2>
                <p className="text-white/80 font-medium animate-pulse">Preparing magical investments ✨</p>
              </div>
            </div>
          </StunningCard>
        </div>
      </StunningLayout>
    );
  }

  return (
    <StunningLayout variant="gradient" showWaves={true} showOrbs={true} showParticles={true}>
      {/* Hero — only for guests */}
      {!user && <Hero />}

      {/* Welcome banner for logged-in users - STUNNING */}
      {user && showWelcome && (
        <StunningCard variant="neon" className="m-4 border-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-xl animate-floating-orb">
                  <Sparkles className="w-6 h-6 text-purple-900 animate-sparkle-dance" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div className="min-w-0">
                <span className="text-lg font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-text-glow block truncate">
                  {typedText}
                  {isTyping && <span className="animate-pulse text-cyan-400 ml-1">|</span>}
                </span>
                <p className="text-cyan-300/80 text-sm font-medium">Ready to make some money? 💰</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href="/portfolio" className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all transform hover:scale-110 animate-neon-glow">
                <PieChart className="w-5 h-5" />
              </Link>
              <Link href="/wishlist" className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all transform hover:scale-110 animate-neon-glow">
                <Heart className="w-5 h-5" />
              </Link>
              <button onClick={() => setShowWelcome(false)} className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-white transition-all transform hover:scale-110">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </StunningCard>
      )}

      {/* Events & Offers */}
      <EventsSection minEventsToShow={5} />
      <OffersSection minOffersToShow={5} />

      {/* Category pills - STUNNING */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <StunningCard variant="premium" size="sm" animated={true} glowing={true} className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center animate-sparkle-dance">
                <Tag className="w-5 h-5 text-purple-900" />
              </div>
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow">
                  Investment Categories
                </h2>
                <p className="text-sm font-bold text-orange-600">Pick your money maker! 🚀</p>
              </div>
            </StunningCard>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {INVESTMENT_CATEGORIES.map((cat, i) => (
              <Link key={cat.label} href={cat.href}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <StunningCard variant="glass" size="sm" animated={true} className="text-center transform group-hover:scale-110 transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-xl animate-floating-orb`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors">{cat.label}</span>
                </StunningCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider mx-4 sm:mx-8" />

      {/* Suggested Investments - COLORFUL */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fdf2f8, #fef3c7, #dbeafe, #f3e8ff)" }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-pink-500 animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-yellow-500 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full bg-blue-500 animate-blob animation-delay-4000" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4 shadow-xl animate-bounce" style={{ background: "linear-gradient(135deg, #ff0080, #ff00ff)" }}>
              <Sparkles className="w-6 h-6 text-white animate-spin" />
              <span className="text-white font-black text-lg">HOT DEALS! 🔥</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-3 animate-gradient" style={{ 
              background: "linear-gradient(135deg, #ff0080, #ff8c00, #ffd700, #00ff00)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              💰 Recommended Investments
            </h2>
            <p className="text-xl font-bold text-purple-700 drop-shadow-sm">Make money FAST! 🚀💸</p>
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          )}

          {!isLoading && !isError && products?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-4">
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

      {/* Trust features banner - FLASHY */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 border-y-4 border-yellow-400 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #ff0080, #ff8c00, #ffd700, #00ff00, #00ffff, #0080ff)", backgroundSize: "400% 400%", animation: "gradient-shift 5s ease infinite" }}>
        <div className="absolute inset-0 opacity-20 animate-pulse" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.5) 2px, transparent 2px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
          {TRUST_FEATURES.map(({ icon: Icon, title, desc, color, bg }, i) => (
            <div key={title} className={`flex flex-col items-center gap-3 p-6 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce-in border-4 border-white ${bg}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl animate-pulse`} style={{ background: "linear-gradient(135deg, #ffd700, #ff8c00)" }}>
                <Icon className={`w-8 h-8 text-white drop-shadow-lg`} />
              </div>
              <div className="text-center">
                <p className="text-base font-black text-gray-900 drop-shadow-sm">{title}</p>
                <p className="text-sm text-gray-700 font-bold mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Investments - WILD */}
      {trendingProducts?.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fef3c7, #fed7aa, #fecaca, #fbcfe8, #ddd6fe)" }}>
          {/* Fire emojis floating */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 left-10 text-7xl animate-float">🔥</div>
            <div className="absolute top-20 right-20 text-6xl animate-float animation-delay-2000">💰</div>
            <div className="absolute bottom-10 left-1/4 text-5xl animate-float animation-delay-4000">🚀</div>
            <div className="absolute top-1/2 right-1/3 text-6xl animate-float">💎</div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4 shadow-xl animate-wiggle border-4 border-yellow-400" style={{ background: "linear-gradient(135deg, #ff0080, #ff8c00)" }}>
                <Flame className="w-6 h-6 text-white animate-bounce" />
                <span className="text-white font-black text-lg">TRENDING NOW! 🔥</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-3 animate-gradient" style={{ 
                background: "linear-gradient(135deg, #ff8c00, #ff0080, #8000ff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                🔥 Trending Investments
              </h2>
              <p className="text-xl font-bold text-orange-700 drop-shadow-sm">Everyone's buying these! 💸</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-4">
              {trendingProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Investment Opportunities - COLORFUL */}
      {latestProducts?.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #e0f2fe, #dbeafe, #e0e7ff, #ede9fe, #fae8ff)" }}>
          {/* Sparkle effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute top-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-2000" />
            <div className="absolute bottom-10 left-1/4 w-5 h-5 bg-cyan-400 rounded-full animate-ping animation-delay-4000" />
            <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-400 rounded-full animate-ping" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4 shadow-xl animate-bounce border-4 border-cyan-400" style={{ background: "linear-gradient(135deg, #8000ff, #0080ff)" }}>
                <Zap className="w-6 h-6 text-white animate-pulse" />
                <span className="text-white font-black text-lg">JUST ADDED! ✨</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black mb-3 animate-gradient" style={{ 
                background: "linear-gradient(135deg, #0080ff, #00ffff, #00ff00)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                ✨ New Opportunities
              </h2>
              <p className="text-xl font-bold text-blue-700 drop-shadow-sm">Fresh deals just for you! 💎</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-4">
              {latestProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Become an Investment Advisor CTA - MEGA FLASHY */}
      {(!user || !user.role?.includes("advisor")) && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden animate-gradient" style={{ background: "linear-gradient(135deg, #ff0080 0%, #ff00ff 25%, #8000ff 50%, #0080ff 75%, #00ffff 100%)", backgroundSize: "400% 400%" }}>
          <div className="absolute inset-0 pointer-events-none">
            {/* Giant money emojis */}
            <div className="absolute top-10 left-10 text-9xl opacity-10 animate-float">💰</div>
            <div className="absolute top-20 right-20 text-8xl opacity-15 animate-float animation-delay-2000">💎</div>
            <div className="absolute bottom-10 left-1/4 text-7xl opacity-10 animate-float animation-delay-4000">👑</div>
            <div className="absolute top-1/2 right-1/3 text-6xl opacity-20 animate-float">💸</div>
            
            {/* Colorful orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 animate-blob" style={{ background: "radial-gradient(circle, #ffd700, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 animate-blob animation-delay-2000" style={{ background: "radial-gradient(circle, #ff0080, transparent 70%)" }} />
            
            {/* Sparkles */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-2000" />
            <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-cyan-400 rounded-full animate-ping animation-delay-4000" />
          </div>
          
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-base font-black text-white border-4 border-yellow-400 mb-8 shadow-2xl animate-wiggle" style={{ background: "linear-gradient(135deg, #ffd700, #ff8c00)" }}>
              <Building className="w-5 h-5 animate-bounce" />
              💰 MAKE BIG MONEY! 💰
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl animate-neon-pulse" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textShadow: "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,215,0,0.6)" }}>
              Share Your Expertise &
              <span className="block mt-2 animate-gradient" style={{ 
                background: "linear-gradient(135deg, #ffd700, #ff8c00, #ff0080)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent", 
                backgroundClip: "text"
              }}>
                💸 Earn BIG! 💸
              </span>
            </h2>
            <p className="text-white text-xl sm:text-2xl max-w-xl mx-auto mb-10 font-black drop-shadow-lg">
              Join our network! Help clients get RICH while YOU get RICHER! 🚀💰
            </p>
            <Link href="/become-advisor"
              className="inline-flex items-center gap-3 px-10 py-6 rounded-3xl font-black text-gray-900 text-xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white animate-glow-pulse"
              style={{ background: "linear-gradient(135deg, #ffd700, #ff8c00, #ff0080)" }}>
              <Building className="w-7 h-7 animate-bounce" />
              👑 BECOME AN ADVISOR NOW!
              <ArrowRight className="w-7 h-7 animate-pulse" />
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
