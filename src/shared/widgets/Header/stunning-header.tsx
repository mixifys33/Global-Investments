"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, TrendingUp, Zap, Sparkles, Star } from "lucide-react";
import ProfileIcon from "../../../assets/svgs/profile-icon";
import HeartIcon from "../../../assets/svgs/heart-icon";
import CartIcon from "../../../assets/svgs/cart-icon";
import HeaderBottom from "./header-bottom";
import useUser from "@/hooks/useUser";
import { useStore } from "@/store";
import axiosInstance from "@/utils/axiosInstance";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

const formatUserName = (fullName?: string, compact = false): string => {
  if (!fullName) return "User";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "User";
  if (compact) return parts.map(p => p[0]?.toUpperCase()).join("").slice(0, 2);
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} ${parts[1][0]?.toUpperCase()}.`;
  const mid = parts[Math.floor(parts.length / 2)];
  const last = parts[parts.length - 1];
  return `${mid} ${last[0]?.toUpperCase()}.`;
};

type ProductSuggestion = {
  id: string; title: string; slug: string;
  category?: string; sale_price?: number; regular_price?: number;
};

const StunningHeader = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const wishlist = useStore((state: any) => state.wishlist);
  const cart = useStore((state: any) => state.cart);
  const { formatPrice } = useCurrencyFormat();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchSuggestions = async (query: string) => {
    setLoadingSuggestions(true);
    try {
      const { data } = await axiosInstance.get("/api/products", { params: { q: query, limit: 7 } });
      setSuggestions(data?.products ?? []);
    } catch { setSuggestions([]); }
    finally { setLoadingSuggestions(false); }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 2) { setShowDropdown(true); void fetchSuggestions(val.trim()); }
    else { setSuggestions([]); setShowDropdown(false); }
  };

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSelect = (slug: string, title: string) => {
    setSearchQuery(title); setShowDropdown(false);
    router.push(`/product/${slug}`);
  };

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 shadow-2xl transition-all duration-500 ${
          isScrolled ? 'backdrop-blur-xl bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-green-900/90' : 'bg-gradient-to-r from-purple-900 via-blue-900 to-green-900'
        }`}
      >
        {/* Animated top accent bars */}
        <div className="relative h-1 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-gradient-x opacity-50" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Floating particles in header */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-2 left-20 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-4 right-32 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-70 delay-300"></div>
          <div className="absolute top-3 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-50 delay-500"></div>
          <div className="absolute top-5 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60 delay-700"></div>
        </div>

        {/* Main row */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center gap-4 lg:gap-6 py-4 md:py-5 relative">

        {/* Enhanced Logo with animations */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300 animate-glow"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-900 animate-pulse" />
            </div>
          </div>
          <div className="hidden md:flex flex-col leading-none">
            <span className="text-white font-black text-xl md:text-2xl tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-pulse" style={{ fontFamily: "var(--font-space)" }}>
              Global<span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">Investments</span>
            </span>
            <span className="text-blue-300/80 text-[10px] tracking-[0.2em] uppercase font-bold animate-pulse">💎 Investment Platform 💎</span>
          </div>
        </Link>

        {/* Enhanced Search with animations */}
        <div ref={searchRef} className="flex-1 relative max-w-2xl">
          <div className="flex items-center bg-gradient-to-r from-white/95 to-blue-50/95 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-transparent focus-within:ring-yellow-400/80 focus-within:shadow-yellow-400/20 transition-all duration-300 backdrop-blur-sm">
            <div className="ml-4 p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Search className="w-4 h-4 text-white" />
            </div>
            <input
              type="text"
              placeholder="🔍 Search investments, markets, analysis..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => searchQuery.trim().length >= 2 && setShowDropdown(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-3 md:py-4 text-sm md:text-base text-gray-800 placeholder-gray-500 outline-none bg-transparent font-medium"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setSuggestions([]); setShowDropdown(false); }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={handleSearch}
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 hover:from-yellow-300 hover:via-orange-300 hover:to-yellow-400 text-purple-900 font-black px-6 md:px-8 py-3 md:py-4 text-sm transition-all duration-300 flex-shrink-0 flex items-center gap-2 transform hover:scale-105 shadow-lg">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="hidden md:inline animate-pulse">Search</span>
            </button>
          </div>

          {/* Enhanced Dropdown */}
          {showDropdown && (
            <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl border-2 border-blue-200/50 overflow-hidden animate-slide-down backdrop-blur-xl">
              {loadingSuggestions ? (
                <div className="flex items-center gap-3 px-6 py-5 text-sm text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> 
                  <span className="animate-pulse">✨ Searching magical investments...</span>
                </div>
              ) : suggestions.length > 0 ? (
                <>
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-blue-200 flex items-center gap-3">
                    <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-black text-blue-700 uppercase tracking-wider animate-pulse">🚀 Hot Suggestions</span>
                  </div>
                  <ul className="max-h-80 overflow-y-auto">
                    {suggestions.map((item, index) => (
                      <li key={item.id}>
                        <button onClick={() => handleSelect(item.slug, item.title)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 text-left group transform hover:scale-[1.02]">
                          <div className="min-w-0 flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0 group-hover:animate-pulse"></div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">{item.title}</p>
                              {item.category && <p className="text-xs text-gray-500 mt-1 capitalize font-medium">💼 {item.category}</p>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-yellow-400 animate-pulse" />
                            <span className="text-sm font-black text-blue-700 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full border border-yellow-200">
                              {formatPrice(item.sale_price ?? item.regular_price)}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 py-4 border-t border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <button onClick={handleSearch} className="text-sm text-blue-600 font-black hover:text-blue-800 transition-colors animate-pulse">
                      ✨ See all magical results for &ldquo;{searchQuery}&rdquo; →
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-6 py-8 text-sm text-gray-600 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="font-medium">No magical results for &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Right actions */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-shrink-0">

          {/* Enhanced Profile */}
          <Link href={user ? "/profile" : "/login"} className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 lg:w-12 lg:h-12 rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-yellow-400 transition-all duration-300 flex-shrink-0 transform group-hover:scale-110">
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              {user?.avatar || user?.images?.[0]?.url ? (
                <Image src={user.avatar || user.images[0].url} alt={user.name || "User"} width={48} height={48} className="w-full h-full object-cover relative z-10" />
              ) : user ? (
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 flex items-center justify-center text-purple-900 text-sm font-black relative z-10">
                  {formatUserName(user.name, true)}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center relative z-10">
                  <ProfileIcon />
                </div>
              )}
            </div>
            <div className="hidden lg:block leading-tight">
              <p className="text-blue-200/80 text-[11px] font-bold animate-pulse">{user ? "👋 Hello," : "✨ Welcome,"}</p>
              <p className="text-white font-black text-sm bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{isLoading ? "..." : user ? formatUserName(user.name) : "Sign In"}</p>
            </div>
          </Link>

          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent" />

          {/* Enhanced Watchlist */}
          <Link href="/wishlist" className="relative flex flex-col items-center gap-1 group">
            <div className="relative p-2 rounded-xl group-hover:bg-white/10 transition-all duration-300 transform group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <HeartIcon size={24} isActive={wishlist?.length > 0} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-black text-white px-1 shadow-lg animate-pulse border-2 border-white">
                  {wishlist.length > 9 ? "9+" : wishlist.length}
                </span>
              )}
            </div>
            <span className="text-blue-200/70 text-[10px] font-bold group-hover:text-white transition-colors animate-pulse">💖 Wishlist</span>
          </Link>

          {/* Enhanced Portfolio */}
          <Link href="/cart" className="relative flex flex-col items-center gap-1 group">
            <div className="relative p-2 rounded-xl group-hover:bg-white/10 transition-all duration-300 transform group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <CartIcon size={24} isActive={cart?.length > 0} />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-[10px] font-black text-purple-900 px-1 shadow-lg animate-pulse border-2 border-white">
                  {cart.length > 9 ? "9+" : cart.length}
                </span>
              )}
            </div>
            <span className="text-blue-200/70 text-[10px] font-bold group-hover:text-white transition-colors animate-pulse">🛒 Cart</span>
          </Link>
        </div>
      </div>

      </header>
      <HeaderBottom />
    </>
  );
};

export default StunningHeader;