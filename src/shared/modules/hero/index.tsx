"use client";

import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Shield, Truck, Star, Zap, ArrowRight, Sparkles, Tag, Percent, Gift, ChevronRight, TrendingUp, PieChart, Home, Sparkle, Building2, Banknote, DollarSign, Coins, Wallet, CreditCard, TrendingDown, Rocket, Crown, Gem, BadgeDollarSign, Flame } from "lucide-react";
import { useRouter } from "next/navigation";

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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl opacity-10 animate-float text-yellow-300">💰</div>
      </div>
    </section>
  );
};

export default Hero;