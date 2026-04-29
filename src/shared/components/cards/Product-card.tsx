"use client";

import { Eye, Heart, ShoppingBag, Star, Zap, GitCompare, Flame, Crown, Gem, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useStore } from "@/store";
import useUser from "@/hooks/useUser";
import ProductDetailsCard from "./product-details.card";
import useDeviceTracking from "@/hooks/useDeviceTracking";
import useLocationTracking from "@/hooks/useLocationTracking";
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";
import { useProductComparison } from "@/hooks/useProductComparison";
import { toast } from "sonner";

const ProductCard = ({ product, isEvent }: { product: any; isEvent?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const location = useLocationTracking();
  const deviceInfo = useDeviceTracking();
  const { formatPrice } = useCurrencyFormat();

  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const wishlistIds = useStore((s) => s.wishlistIds);
  const addToCart = useStore((s) => s.addToCart);
  const addToWishlist = useStore((s) => s.addToWishlist);
  const removeFromWishlist = useStore((s) => s.removeFromWishlist);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const syncWithServer = useStore((s) => s.syncWithServer);

  const isWishListed = wishlist.some((i: any) => i.id === product?.id) || wishlistIds.includes(product?.id);
  const isInCart = cart.some((i: any) => i.id === product?.id);

  // Compare
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useProductComparison();
  const isCompared = product ? isInCompare(product.id) : false;

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    if (isCompared) {
      removeFromCompare(product.id);
      toast.info("Removed from comparison");
    } else if (!canAddMore) {
      toast.warning("You can compare up to 4 products. Remove one first.");
    } else {
      addToCompare({
        id: product.id,
        slug: product.slug || product.id,
        title: product.title,
        image: product.images?.[0]?.url || "",
        price: product.regular_price || product.sale_price,
        salePrice: product.sale_price,
        category: product.category || "",
        brand: product.brand || "",
        ratings: product.ratings || 0,
        stock: product.stock || 0,
        shopName: product.Shop?.name || product.shops?.name || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        warranty: product.warranty || "",
      });
      toast.success("Added to comparison!");
    }
  };

  useEffect(() => {
    if (user?.id) syncWithServer(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (!isEvent || !product?.ending_date) return;
    const tick = () => {
      const diff = new Date(product.ending_date).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Expired"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [isEvent, product?.ending_date]);

  if (!product) return null;

  const discount = product?.regular_price > product?.sale_price
    ? Math.round(((product.regular_price - product.sale_price) / product.regular_price) * 100)
    : 0;

  const rating = product?.ratings ?? 0;
  const fullStars = Math.floor(rating);
  const imgSrc = !imgError && product?.images?.[0]?.url ? product.images[0].url : null;
  // Use unoptimized for non-ImageKit URLs to avoid Next.js proxy timeout errors
  const isImageKit = imgSrc?.includes('ik.imagekit.io');
  const isPlaceholder = imgSrc?.includes('example.com') || imgSrc?.includes('placeholder');
  const safeImgSrc = isPlaceholder ? null : imgSrc;

  return (
    <>
      <div className="group relative rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex flex-col animate-glow-pulse" style={{ background: "linear-gradient(135deg, #ffffff, #fff5f5, #fffbeb)" }}>

        {/* Image - COLORFUL FRAME */}
        <div className="relative overflow-hidden aspect-square" style={{ background: "linear-gradient(135deg, #ff0080, #ff8c00, #ffd700, #00ff00)" }}>
          <div className="absolute inset-1 rounded-2xl overflow-hidden bg-white">
            <Link href={`/product/${product?.slug || product?.id}`}>
              {safeImgSrc ? (
                <Image
                  src={safeImgSrc}
                  alt={product?.title || "Product"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  unoptimized={!isImageKit}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
              )}
            </Link>

            {/* Gradient overlay on hover - COLORFUL */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,0,128,0.3), rgba(255,140,0,0.3), rgba(255,215,0,0.3))" }} />
          </div>

          {/* Floating money emojis */}
          <div className="absolute top-2 left-2 text-lg opacity-60 animate-float pointer-events-none">💰</div>
          <div className="absolute top-3 right-3 text-base opacity-50 animate-float animation-delay-2000 pointer-events-none">💎</div>

          {/* FLASHY Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {discount >= 10 && (
              <span className="flex items-center gap-1 text-white text-xs font-black px-2 py-1 rounded-xl shadow-xl animate-bounce border-2 border-white" style={{ background: "linear-gradient(135deg, #ff0080, #ff00ff)" }}>
                <Flame className="w-3 h-3 animate-pulse" />💸 -{discount}%
              </span>
            )}
            {isEvent && (
              <span className="text-white text-xs font-black px-2 py-1 rounded-xl shadow-xl animate-wiggle border-2 border-white" style={{ background: "linear-gradient(135deg, #ffd700, #ff8c00)" }}>
                🔥 HOT DEAL
              </span>
            )}
            {product?.stock === 0 && (
              <span className="bg-gray-700 text-white text-xs font-black px-2 py-1 rounded-xl border-2 border-white">
                😭 SOLD OUT
              </span>
            )}
            {product?.stock > 0 && product?.stock <= 5 && (
              <span className="text-gray-900 text-xs font-black px-2 py-1 rounded-xl shadow-xl animate-pulse border-2 border-white" style={{ background: "linear-gradient(135deg, #ffd700, #ffff00)" }}>
                ⚡ ONLY {product.stock} LEFT!
              </span>
            )}
          </div>

          {/* Quick actions - COLORFUL */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={() => isWishListed
                ? removeFromWishlist(product.id, user, location, deviceInfo)
                : addToWishlist({ ...product, quantity: 1 }, user, location, deviceInfo)}
              className={`w-10 h-10 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-125 active:scale-95 border-2 border-white animate-bounce ${
                isWishListed
                  ? 'text-white'
                  : 'text-gray-600 hover:text-white'
              }`}
              style={{ background: isWishListed ? "linear-gradient(135deg, #ff0080, #ff00ff)" : "linear-gradient(135deg, #ffffff, #fff5f5)" }}
            >
              <Heart className={`w-4 h-4 ${isWishListed ? 'fill-current animate-pulse' : ''}`} />
            </button>
            <button
              onClick={handleCompare}
              title={isCompared ? "Remove from compare" : !canAddMore ? "Compare list full (max 4)" : "Add to compare"}
              className={`w-10 h-10 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-125 active:scale-95 border-2 border-white ${
                isCompared
                  ? 'text-white'
                  : !canAddMore
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-white'
              }`}
              style={{ background: isCompared ? "linear-gradient(135deg, #8000ff, #0080ff)" : !canAddMore ? "#f3f4f6" : "linear-gradient(135deg, #ffffff, #f0f9ff)" }}
            >
              <GitCompare className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="w-10 h-10 rounded-2xl shadow-2xl flex items-center justify-center text-gray-600 hover:text-white hover:scale-125 active:scale-95 transition-all duration-200 border-2 border-white"
              style={{ background: "linear-gradient(135deg, #ffffff, #f0fdf4)" }}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Event timer - FLASHY */}
          {isEvent && timeLeft && (
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-black text-center py-2 rounded-2xl shadow-xl border-2 border-white animate-pulse" style={{ background: "linear-gradient(135deg, #ff0080, #8000ff)" }}>
              ⏱ {timeLeft} left! 🔥
            </div>
          )}
        </div>

        {/* Info - COLORFUL */}
        <div className="flex flex-col flex-1 p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #ffffff, #fff5f5, #fffbeb)" }}>
          {/* Sparkle effects */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60" />
          <div className="absolute bottom-4 left-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping animation-delay-2000 opacity-50" />

          {/* Shop name - FLASHY */}
          {product?.Shop?.name && (
            <Link href={`/shop/${product?.Shop?.id}`}
              className="inline-flex items-center gap-1 text-xs font-black hover:scale-105 truncate mb-2 uppercase tracking-wide transition-all px-2 py-1 rounded-full shadow-md border-2 border-purple-200" style={{ background: "linear-gradient(135deg, #8000ff, #0080ff)", color: "white" }}>
              <Crown className="w-3 h-3 animate-bounce" />
              {product.Shop.name}
            </Link>
          )}

          {/* Title - COLORFUL */}
          <Link href={`/product/${product?.slug || product?.id}`}>
            <h3 className="text-sm font-black line-clamp-2 leading-snug hover:scale-105 transition-all mb-3 drop-shadow-sm animate-gradient" style={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: "linear-gradient(135deg, #ff0080, #ff8c00, #ffd700)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {product?.title}
            </h3>
          </Link>

          {/* Stars - GOLDEN */}
          {rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= fullStars ? 'fill-yellow-400 text-yellow-400 animate-pulse' : 'text-gray-200 fill-gray-200'}`} />
                ))}
              </div>
              <span className="text-xs text-gray-600 font-bold bg-yellow-100 px-2 py-0.5 rounded-full">⭐ {rating.toFixed(1)}</span>
            </div>
          )}

          {/* Price - MEGA FLASHY */}
          <div className="flex items-center justify-between mt-auto mb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black animate-gradient" style={{ 
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, #00ff00, #00ffff, #0080ff)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  💰 {formatPrice(product?.sale_price)}
                </span>
                {discount > 0 && (
                  <span className="text-xs text-gray-400 line-through font-medium bg-gray-100 px-1 py-0.5 rounded">
                    {formatPrice(product?.regular_price)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-xs font-black text-green-600 animate-pulse">💸 You save {formatPrice(product?.regular_price - product?.sale_price)}!</span>
              )}
            </div>
            {product?.totalSales > 0 && (
              <span className="text-xs text-white font-black px-2 py-1 rounded-full shadow-md animate-bounce" style={{ background: "linear-gradient(135deg, #00ff00, #00ffff)" }}>
                🔥 {product.totalSales} sold
              </span>
            )}
          </div>

          {/* Add to cart - MEGA BUTTON */}
          <button
            onClick={() => isInCart
              ? removeFromCart(product.id, user, location, deviceInfo)
              : addToCart({ ...product, quantity: 1 }, user, location, deviceInfo)}
            disabled={product?.stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-black transition-all duration-200 active:scale-95 shadow-xl border-3 ${
              product?.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                : isInCart
                ? 'text-white border-white animate-pulse'
                : 'text-white border-white hover:scale-105 animate-glow-pulse'
            }`}
            style={product?.stock !== 0 ? { 
              background: isInCart 
                ? "linear-gradient(135deg, #ff0080, #ff00ff)" 
                : "linear-gradient(135deg, #00ff00, #00ffff, #0080ff)" 
            } : {}}
          >
            {product?.stock === 0 ? (
              <>😭 Out of Stock</>
            ) : isInCart ? (
              <>
                <Zap className="w-4 h-4 animate-bounce" />
                💸 Remove from Cart
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 animate-bounce" />
                💰 Add to Cart NOW!
              </>
            )}
          </button>

          {/* Compare button - COLORFUL */}
          <button
            onClick={handleCompare}
            disabled={!isCompared && !canAddMore}
            title={!isCompared && !canAddMore ? "Compare list full — remove a product first" : ""}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black transition-all duration-200 active:scale-95 mt-2 shadow-lg border-2 ${
              isCompared
                ? 'text-white border-white animate-pulse'
                : !canAddMore
                ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                : 'text-white border-white hover:scale-105'
            }`}
            style={isCompared 
              ? { background: "linear-gradient(135deg, #8000ff, #0080ff)" }
              : !canAddMore 
              ? {} 
              : { background: "linear-gradient(135deg, #ff8c00, #ffd700)" }
            }
          >
            <GitCompare className="w-4 h-4" />
            {isCompared ? '✅ Comparing!' : !canAddMore ? 'Compare Full (4/4)' : '⚡ Compare Now'}
          </button>
        </div>
      </div>

      {open && <ProductDetailsCard data={product} setOpen={setOpen} />}
    </>
  );
};

export default ProductCard;
