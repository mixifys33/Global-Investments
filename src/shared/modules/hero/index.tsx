"use client";

import { Search, ShoppingBag, Shield, Truck, Star, Zap, ArrowRight, Sparkles, Tag, Percent, Gift, ChevronRight, TrendingUp, PieChart, Home, Sparkle, Building2, Banknote, DollarSign, Coins, Wallet, CreditCard, TrendingDown, Rocket, Crown, Gem, BadgeDollarSign, Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const ROTATING_WORDS = ["💰 Stocks", "💎 Bonds", "🏠 Real Estate", "📈 Mutual Funds", "🚀 ETFs", "💸 Portfolios", "⚡ Commodities"];

const PROMO_BADGES = [
  { icon: Zap, label: "⚡ INSTANT PROFITS", color: "from-yellow-400 via-amber-500 to-orange-600" },
  { icon: Percent, label: "🔥 ZERO FEES", color: "from-rose-500 via-pink-600 to-fuchsia-700" },
  { icon: Gift, label: "💎 FREE BONUS", color: "from-violet-500 via-purple-600 to-indigo-700" },
  { icon: Rocket, label: "🚀 FAST RETURNS", color: "from-teal-500 via-cyan-600 to-blue-700" },
  { icon: Crown, label: "👑 VIP ACCESS", color: "from-amber-400 via-yellow-500 to-orange-600" },
  { icon: Gem, label: "💰 CASH REWARDS", color: "from-green-500 via-emerald-600 to-teal-700" },
];

const CATEGORY_CARDS = [
  { label: "💰 Stocks", icon: TrendingUp, color: "from-blue-500 via-indigo-600 to-purple-700", deal: "🚀 MOON GAINS!" },
  { label: "💎 Bonds", icon: Banknote, color: "from-green-500 via-emerald-600 to-teal-700", deal: "💸 EASY MONEY" },
  { label: "🏠 Real Estate", icon: Home, color: "from-orange-500 via-amber-600 to-yellow-700", deal: "🔥 HOT DEALS" },
  { label: "📊 Mutual Funds", icon: PieChart, color: "from-purple-500 via-violet-600 to-fuchsia-700", deal: "⚡ QUICK CASH" },
];

export const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const gradientStyle = {
    background: "linear-gradient(135deg, #ff0080 0%, #ff8c00 15%, #ffd700 30%, #00ff00 45%, #00ffff 60%, #0080ff 75%, #8000ff 90%, #ff0080 100%)",
    backgroundSize: "400% 400%"
  };

  return (
    <section className="relative overflow-hidden animate-gradient" style={gradientStyle}>

      {/* CRAZY Animated money orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Giant floating dollar signs */}
        <div className="absolute top-10 left-10 text-9xl opacity-10 animate-float text-yellow-300">💰</div>
        <div className="absolute top-32 right-20 text-8xl opacity-15 animate-float animation-delay-2000 text-green-400">💵</div>
        <div className="absolute bottom-20 left-1/4 text-7xl opacity-10 animate-float animation-delay-4000 text-amber-400">💸</div>
        <div className="absolute top-1/2 right-1/3 text-6xl opacity-20 animate-float text-emerald-400">💎</div>
        <div className="absolute bottom-32 right-10 text-8xl opacity-10 animate-float animation-delay-2000 text-yellow-500">🪙</div>
        
        {/* Colorful spinning orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 animate-blob" style={{ background: "radial-gradient(circle, #ff00ff, #ff0080, transparent 70%)" }} />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-25 animate-blob animation-delay-2000" style={{ background: "radial-gradient(circle, #00ffff, #0080ff, transparent 70%)" }} />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full opacity-30 animate-blob animation-delay-4000" style={{ background: "radial-gradient(circle, #ffff00, #ff8c00, transparent 70%)" }} />
        <div className="absolute top-20 left-1/2 w-64 h-64 rounded-full opacity-20 animate-spin-slow" style={{ background: "radial-gradient(circle, #00ff00, #00ff80, transparent 70%)" }} />
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-cyan-400 rounded-full animate-ping animation-delay-4000" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.08] animate-pulse" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.8) 2px, transparent 2px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* Promo ticker - SUPER FLASHY */}
      <div className="relative z-10 border-b-4 border-yellow-400 shadow-2xl" style={{ background: "linear-gradient(90deg, #ff0080, #ff8c00, #ffd700, #00ff00, #00ffff, #0080ff, #8000ff, #ff0080)", backgroundSize: "200% 100%", animation: "gradient-shift 3s linear infinite" }}>
        <div className="overflow-hidden py-3">
          <div className="marquee-track animate-marquee">
            {[...PROMO_BADGES, ...PROMO_BADGES, ...PROMO_BADGES, ...PROMO_BADGES].map((b, i) => {
              const Icon = b.icon;
              return (
                <span key={i} className="inline-flex items-center gap-2 mx-6 text-white text-sm font-black whitespace-nowrap drop-shadow-lg animate-pulse">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r ${b.color} shadow-xl animate-bounce-in`}>
                    <Icon className="w-4 h-4 text-white" />
                  </span>
                  {b.label}
                  <span className="text-yellow-300 text-xl">★</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0 sm:pt-16 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">

            {/* Badge - FLASHY */}
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-black text-white border-4 border-yellow-400 shadow-2xl animate-wiggle" style={{ background: "linear-gradient(135deg, #ff0080, #ff00ff, #8000ff)" }}>
              <Sparkles className="w-5 h-5 animate-spin" />
              💰 GET RICH QUICK! 💰
              <span className="w-3 h-3 rounded-full bg-yellow-400 animate-ping" />
            </div>

            {/* Headline - WILD */}
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight animate-bounce-in" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="block animate-gradient" style={{ 
                  background: "linear-gradient(135deg, #ff0080 0%, #ff8c00 25%, #ffd700 50%, #00ff00 75%, #00ffff 100%)", 
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent", 
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(255,215,0,0.5)"
                }}>
                  💰 MAKE
                </span>
                <span className="block animate-gradient animation-delay-2000" style={{ 
                  background: "linear-gradient(135deg, #00ff00 0%, #00ffff 25%, #0080ff 50%, #8000ff 75%, #ff00ff 100%)", 
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent", 
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(0,255,255,0.5)"
                }}>
                  MONEY
                </span>
                <span className="block text-white drop-shadow-2xl animate-pulse" style={{ textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,0,128,0.6)" }}>
                  💸 FAST! 💸
                </span>
              </h1>
            </div>

            {/* Rotating category - COLORFUL */}
            <p className="text-xl sm:text-2xl font-black max-w-lg mx-auto lg:mx-0 drop-shadow-lg">
              <span className="text-white drop-shadow-xl">Invest in </span>
              <span
                className="inline-block transition-all duration-300 animate-bounce"
                style={{ 
                  background: "linear-gradient(135deg, #ffd700, #ff8c00, #ff0080)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: fade ? 1 : 0, 
                  transform: fade ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.8)",
                  textShadow: "0 0 20px rgba(255,215,0,0.8)"
                }}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
              <span className="text-white drop-shadow-xl"> NOW!</span>
            </p>

            {/* Search bar - COLORFUL */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto lg:mx-0">
              <div className="relative flex items-center rounded-3xl overflow-hidden shadow-2xl ring-4 ring-yellow-400 focus-within:ring-pink-500 transition-all duration-300 animate-pulse-ring" style={{ background: "linear-gradient(135deg, #ffffff, #fff5f5, #fffbeb)" }}>
                <Search className="absolute left-5 w-6 h-6 text-purple-600 pointer-events-none animate-bounce" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search for MONEY MAKERS..."
                  className="w-full pl-14 pr-4 py-5 text-gray-900 text-base sm:text-lg placeholder-purple-400 outline-none bg-transparent font-black"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 m-2 px-6 py-3 rounded-2xl font-black text-base text-white transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-xl animate-wiggle"
                  style={{ background: "linear-gradient(135deg, #ff0080, #ff00ff, #8000ff)" }}
                >
                  <Rocket className="w-5 h-5 animate-bounce" />
                  <span className="hidden sm:inline">GO!</span>
                  <Zap className="w-5 h-5 animate-pulse" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
                {["💰Stocks","💎Bonds","🚀ETFs","🏠Real Estate", "📈Funds","⚡Commodities","💸Portfolio"].map((t) => (
                  <button key={t} type="button"
                    onClick={() => router.push(`/search?q=${t}`)}
                    className="text-sm font-black text-white border-3 border-yellow-400 hover:border-pink-500 px-4 py-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg animate-bounce-in"
                    style={{ background: "linear-gradient(135deg, #ff0080, #ff8c00)" }}>
                    {t}
                  </button>
                ))}
              </div>
            </form>

            {/* CTA buttons - MEGA FLASHY */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => router.push("/investments")}
                className="group relative px-8 py-5 rounded-3xl font-black text-gray-900 text-lg overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center gap-3 animate-pulse-ring"
                style={{ background: "linear-gradient(135deg, #ffd700, #ff8c00, #ff0080)", border: "4px solid #ffff00" }}
              >
                <Rocket className="w-6 h-6 animate-bounce" />
                💰 START NOW! 💰
                <Zap className="w-6 h-6 animate-pulse" />
              </button>
              <button
                onClick={() => router.push("/become-advisor")}
                className="px-8 py-5 rounded-3xl font-black text-white text-lg border-4 border-cyan-400 hover:border-pink-500 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center gap-3 shadow-2xl animate-bounce-in"
                style={{ background: "linear-gradient(135deg, #8000ff, #0080ff, #00ffff)" }}
              >
                <Crown className="w-6 h-6 animate-wiggle" />
                👑 BE AN ADVISOR
              </button>
            </div>

            {/* Trust row - COLORFUL */}
            <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start pt-3">
              {[
                { icon: Shield, text: "🔒 100% SECURE", color: "text-green-400" },
                { icon: TrendingUp, text: "📈 GUARANTEED GAINS", color: "text-yellow-400" },
                { icon: Star, text: "⭐ 5.0★ RATED", color: "text-pink-400" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className={`flex items-center gap-2 ${color} text-sm font-black drop-shadow-lg animate-bounce-in`}>
                  <Icon className="w-5 h-5 animate-pulse" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — category cards - WILD COLORS (Desktop) */}
          <div className="hidden lg:block relative animate-fade-in-up delay-300">
            <div className="relative">
              {/* Floating ring - COLORFUL */}
              <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400 animate-spin-slow shadow-2xl" style={{ margin: "-20px" }} />
              <div className="absolute inset-0 rounded-3xl border-4 border-pink-500 animate-spin-slow animation-delay-2000 shadow-2xl" style={{ margin: "-30px" }} />

              <div className="grid grid-cols-2 gap-5">
                {CATEGORY_CARDS.map((cat, i) => (
                  <button
                    key={cat.label}
                    onClick={() => router.push(`/investments?category=${encodeURIComponent(cat.label)}`)}
                    className={`group relative rounded-3xl p-7 text-left overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50 animate-fade-in-up border-4 border-white`}
                    style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-95 animate-gradient`} style={{ backgroundSize: "200% 200%" }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 animate-pulse" style={{ background: "radial-gradient(circle at 50% 50%, white, transparent 60%)" }} />
                    
                    {/* Money rain effect */}
                    <div className="absolute top-0 left-1/4 text-2xl opacity-60 animate-float">💰</div>
                    <div className="absolute top-1/4 right-1/4 text-xl opacity-50 animate-float animation-delay-2000">💎</div>
                    <div className="absolute bottom-1/4 left-1/3 text-lg opacity-40 animate-float animation-delay-4000">💸</div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/30 flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-xl border-2 border-yellow-300">
                        <cat.icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                      <p className="text-white font-black text-xl drop-shadow-lg">{cat.label}</p>
                      <p className="text-yellow-300 text-sm mt-2 font-black drop-shadow-md animate-pulse">{cat.deal}</p>
                      <ChevronRight className="w-6 h-6 text-white mt-3 group-hover:translate-x-2 transition-transform animate-bounce" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Floating badge - FLASHY */}
              <div className="absolute -top-6 -right-6 rounded-3xl px-5 py-4 shadow-2xl animate-float border-4 border-yellow-400" style={{ background: "linear-gradient(135deg, #ff0080, #ff00ff)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-spin-slow shadow-xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-black drop-shadow-lg">🔥 HOT DEALS</p>
                    <p className="text-yellow-300 text-xs font-black drop-shadow-md">LIVE NOW!</p>
                  </div>
                </div>
              </div>

              {/* Floating rating - COLORFUL */}
              <div className="absolute -bottom-6 -left-6 rounded-3xl px-5 py-4 shadow-2xl animate-float animation-delay-2000 border-4 border-pink-400" style={{ background: "linear-gradient(135deg, #00ff00, #00ffff)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />)}
                  </div>
                  <p className="text-gray-900 text-sm font-black drop-shadow-lg">💰 10K+ RICH!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only MEGA category showcase - BETTER THAN DESKTOP! */}
        <div className="lg:hidden mt-10 animate-fade-in-up delay-300">
          <div className="relative">
            {/* Mobile floating rings */}
            <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400 animate-spin-slow shadow-2xl" style={{ margin: "-15px" }} />
            <div className="absolute inset-0 rounded-3xl border-4 border-pink-500 animate-spin-slow animation-delay-2000 shadow-2xl" style={{ margin: "-25px" }} />

            <div className="grid grid-cols-2 gap-4">
              {CATEGORY_CARDS.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => router.push(`/investments?category=${encodeURIComponent(cat.label)}`)}
                  className={`group relative rounded-3xl p-5 text-left overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50 animate-fade-in-up border-4 border-white`}
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-95 animate-gradient`} style={{ backgroundSize: "200% 200%" }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 animate-pulse" style={{ background: "radial-gradient(circle at 50% 50%, white, transparent 60%)" }} />
                  
                  {/* Mobile money rain effect - MORE INTENSE */}
                  <div className="absolute top-0 left-1/4 text-xl opacity-70 animate-float">💰</div>
                  <div className="absolute top-1/4 right-1/4 text-lg opacity-60 animate-float animation-delay-2000">💎</div>
                  <div className="absolute bottom-1/4 left-1/3 text-base opacity-50 animate-float animation-delay-4000">💸</div>
                  <div className="absolute top-1/2 right-1/2 text-sm opacity-40 animate-float">🪙</div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-xl border-2 border-yellow-300">
                      <cat.icon className="w-7 h-7 text-white drop-shadow-lg" />
                    </div>
                    <p className="text-white font-black text-lg drop-shadow-lg">{cat.label}</p>
                    <p className="text-yellow-300 text-xs mt-1 font-black drop-shadow-md animate-pulse">{cat.deal}</p>
                    <ChevronRight className="w-5 h-5 text-white mt-2 group-hover:translate-x-2 transition-transform animate-bounce" />
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile floating badges - BIGGER AND FLASHIER */}
            <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-2xl animate-float border-3 border-yellow-400" style={{ background: "linear-gradient(135deg, #ff0080, #ff00ff)" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-spin-slow shadow-xl">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-black drop-shadow-lg">🔥 MOBILE</p>
                  <p className="text-yellow-300 text-[10px] font-black drop-shadow-md">EXCLUSIVE!</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 shadow-2xl animate-float animation-delay-2000 border-3 border-pink-400" style={{ background: "linear-gradient(135deg, #00ff00, #00ffff)" }}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400 animate-pulse" />)}
                </div>
                <p className="text-gray-900 text-xs font-black drop-shadow-lg">📱 BEST APP!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Stats bar - SUPER COLORFUL */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-1 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400">
          {[
            { value: "💰 $2.5B+", label: "MONEY MADE", color: "from-green-500 to-emerald-600" },
            { value: "🚀 10K+", label: "RICH PEOPLE", color: "from-blue-500 to-cyan-600" },
            { value: "💎 500+", label: "HOT DEALS", color: "from-purple-500 to-pink-600" },
            { value: "⚡ 24/7", label: "FAST SUPPORT", color: "from-orange-500 to-red-600" },
          ].map((stat, i) => (
            <div key={stat.label} className={`flex flex-col items-center py-6 px-4 animate-count-up bg-gradient-to-br ${stat.color} relative overflow-hidden`} style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
              <div className="absolute inset-0 opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, white, transparent 70%)" }} />
              <span className="relative text-3xl sm:text-4xl font-black text-white drop-shadow-2xl animate-bounce" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</span>
              <span className="relative text-white text-xs font-black mt-2 drop-shadow-lg">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave - COLORFUL */}
      <div className="relative z-10 mt-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: "80px" }}>
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#ff0080", stopOpacity: 1 }} />
              <stop offset="25%" style={{ stopColor: "#ff8c00", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#ffd700", stopOpacity: 1 }} />
              <stop offset="75%" style={{ stopColor: "#00ff00", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#00ffff", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 30C840 36 960 40 1080 44C1200 48 1320 52 1380 54L1440 56V80H0Z" fill="url(#waveGradient)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
