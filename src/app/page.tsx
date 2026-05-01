"use client";
import React, { useState, useEffect } from "react";
import { Hero } from "../shared/modules/hero";
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
  Heart, X, Zap, Tag, Shield, Clock, Star,
  Briefcase, Package, Building, DollarSign
} from "lucide-react";

const TRUST_FEATURES = [
  { icon: Shield, title: "🔒 SECURE", desc: "Bank-level security", color: "text-green-600" },
  { icon: BarChart3, title: "📊 EXPERT", desc: "Professional insights", color: "text-blue-600" },
  { icon: Clock, title: "⚡ 24/7", desc: "Always here to help", color: "text-purple-600" },
  { icon: Star, title: "⭐ TOP RATED", desc: "5.0★ by investors", color: "text-amber-600" },
];

const ProductSkeleton = () => (
  <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl">
    <div className="aspect-square bg-white/5 animate-pulse" />
    <div className="p-3 space-y-2">
      <div className="h-2.5 bg-white/10 animate-pulse rounded w-1/3" />
      <div className="h-3.5 bg-white/10 animate-pulse rounded" />
      <div className="h-3.5 bg-white/10 animate-pulse rounded w-3/4" />
      <div className="h-3 bg-white/10 animate-pulse rounded w-1/4" />
      <div className="h-9 bg-white/10 animate-pulse rounded-xl mt-2" />
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
      const res = await axiosInstance.get("/api/products?page=1&limit=12");
      return res.data.products;
    },
    staleTime: 1000 * 60 * 3,
  });

  const { data: latestProducts } = useQuery({
    queryKey: ["latest-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products?page=1&limit=8&sortBy=createdAt&sortOrder=desc");
      return res.data.products;
    },
    staleTime: 1000 * 60 * 2,
  });

  const { data: trendingProducts } = useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products?page=1&limit=8&sortBy=stock&sortOrder=desc");
      return res.data.products;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (userLoading) {
    return (
      <div className="w-full py-10 min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-green-900">
        {/* Moving Wave Background */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="loading-wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0.6)" />
              </linearGradient>
              <linearGradient id="loading-wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.4)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
              </linearGradient>
            </defs>
            
            <path 
              d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z" 
              fill="url(#loading-wave-gradient-1)"
              className="animate-wave-1"
            />
            
            <path 
              d="M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z" 
              fill="url(#loading-wave-gradient-2)"
              className="animate-wave-2"
            />
          </svg>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center">
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
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-green-900">
      {/* Moving Wave Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="home-wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.6)" />
            </linearGradient>
            <linearGradient id="home-wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.4)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.4)" />
            </linearGradient>
            <linearGradient id="home-wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="50%" stopColor="rgba(34, 197, 94, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
            <linearGradient id="home-wave-gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.2)" />
              <stop offset="50%" stopColor="rgba(255, 20, 147, 0.2)" />
              <stop offset="100%" stopColor="rgba(0, 255, 255, 0.2)" />
            </linearGradient>
          </defs>
          
          <path 
            d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z" 
            fill="url(#home-wave-gradient-1)"
            className="animate-wave-1"
          />
          
          <path 
            d="M0,500 C400,300 800,700 1200,500 L1200,800 L0,800 Z" 
            fill="url(#home-wave-gradient-2)"
            className="animate-wave-2"
          />
          
          <path 
            d="M0,600 C200,400 800,800 1200,600 L1200,800 L0,800 Z" 
            fill="url(#home-wave-gradient-3)"
            className="animate-wave-3"
          />
          
          <path 
            d="M0,350 C500,150 700,550 1200,350 L1200,800 L0,800 Z" 
            fill="url(#home-wave-gradient-4)"
            className="animate-wave-1"
            style={{ animationDelay: '1s' }}
          />
        </svg>
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-80 shadow-lg"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-purple-400 rounded-full animate-float-reverse opacity-60 shadow-lg"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-float opacity-70 delay-300 shadow-lg"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-90 shadow-lg"></div>
          <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-50 delay-500 shadow-lg"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-70 delay-700 shadow-lg"></div>
          <div className="absolute top-60 right-1/2 w-2 h-2 bg-orange-400 rounded-full animate-float opacity-60 delay-1000 shadow-lg"></div>
          <div className="absolute bottom-40 left-1/2 w-3 h-3 bg-indigo-400 rounded-full animate-float-reverse opacity-50 delay-1200 shadow-lg"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero — only for guests */}
        {!user && <Hero />}

        {/* Welcome banner for logged-in users */}
        {user && showWelcome && (
          <div className="m-4">
            <StunningCard variant="neon" className="border-0">
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
          </div>
        )}

        {/* Events & Offers */}
        <EventsSection minEventsToShow={5} />
        <OffersSection minOffersToShow={5} />

        {/* Featured Investments Section */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <StunningCard variant="premium" size="lg" animated={true} glowing={true} floating={true} className="inline-block">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center shadow-2xl animate-morph-blob">
                    <TrendingUp className="w-8 h-8 text-white animate-sparkle-dance" />
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow mb-3">
                  💰 Featured Investments
                </h2>
                <p className="text-white/80 text-lg font-medium">Discover the best opportunities to grow your wealth</p>
              </StunningCard>
            </div>

            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            )}

            {!isLoading && !isError && products?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!isLoading && !isError && products?.length === 0 && (
              <StunningCard variant="glass" size="lg" className="text-center py-16">
                <Package className="w-16 h-16 text-white/60 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Investments Available</h3>
                <p className="text-white/70">Check back soon for new opportunities!</p>
              </StunningCard>
            )}

            {isError && (
              <StunningCard variant="glass" size="lg" className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Failed to Load Investments</h3>
                <p className="text-white/70">Please check your connection and try again.</p>
              </StunningCard>
            )}
          </div>
        </section>

        {/* Trust Features */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TRUST_FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
                <StunningCard key={title} variant="glass" size="md" animated={true} className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl animate-floating-orb">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{title}</h3>
                  <p className="text-white/70 text-sm font-medium">{desc}</p>
                </StunningCard>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Investments */}
        {trendingProducts?.length > 0 && (
          <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <StunningCard variant="neon" size="lg" animated={true} glowing={true} className="inline-block">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 flex items-center justify-center shadow-2xl animate-morph-blob">
                      <Zap className="w-8 h-8 text-white animate-sparkle-dance" />
                    </div>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent animate-text-glow mb-3">
                    🔥 Trending Now
                  </h2>
                  <p className="text-white/80 text-lg font-medium">Hot investments everyone's talking about</p>
                </StunningCard>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest Opportunities */}
        {latestProducts?.length > 0 && (
          <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <StunningCard variant="cosmic" size="lg" animated={true} glowing={true} floating={true} className="inline-block">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 flex items-center justify-center shadow-2xl animate-morph-blob">
                      <Sparkles className="w-8 h-8 text-white animate-sparkle-dance" />
                    </div>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow mb-3">
                    ✨ New Opportunities
                  </h2>
                  <p className="text-white/80 text-lg font-medium">Fresh investment opportunities just added</p>
                </StunningCard>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {latestProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Become an Investment Advisor CTA */}
        {(!user || !user.role?.includes("advisor")) && (
          <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <StunningCard variant="premium" size="xl" animated={true} glowing={true} floating={true} className="text-center">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center shadow-2xl animate-morph-blob">
                    <Building className="w-12 h-12 text-white animate-sparkle-dance" />
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-text-glow mb-6">
                    Share Your Expertise & Earn Big! 💰
                  </h2>
                  <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8 font-medium">
                    Join our network of investment advisors and help clients build wealth while earning substantial commissions.
                  </p>
                  <Link href="/become-advisor"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20">
                    <Building className="w-6 h-6" />
                    👑 Become an Advisor
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </StunningCard>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
}