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
      <div className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col bg-white">

        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-slate-50">
          <Link href={`/product/${product?.slug || product?.id}`}>
            {safeImgSrc ? (
              <Image
                src={safeImgSrc}
                alt={product?.title || "Product"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                unoptimized={!isImageKit}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <ShoppingBag className="w-12 h-12 text-slate-300" />
              </div>
            )}
          </Link>

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {discount >= 10 && (
              <span className="flex items-center gap-1 text-white text-xs font-semibold px-2 py-1 rounded-md bg-red-500 shadow-sm">
                -{discount}%
              </span>
            )}
            {isEvent && (
              <span className="text-white text-xs font-semibold px-2 py-1 rounded-md bg-orange-500 shadow-sm">
                Flash Sale
              </span>
            )}
            {product?.stock === 0 && (
              <span className="bg-slate-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                Out of Stock
              </span>
            )}
            {product?.stock > 0 && product?.stock <= 5 && (
              <span className="text-slate-800 text-xs font-semibold px-2 py-1 rounded-md bg-yellow-400 shadow-sm">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={() => isWishListed
                ? removeFromWishlist(product.id, user, location, deviceInfo)
                : addToWishlist({ ...product, quantity: 1 }, user, location, deviceInfo)}
              className={`w-9 h-9 rounded-lg shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                isWishListed
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-slate-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishListed ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleCompare}
              title={isCompared ? "Remove from compare" : !canAddMore ? "Compare list full (max 4)" : "Add to compare"}
              className={`w-9 h-9 rounded-lg shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                isCompared
                  ? 'bg-blue-500 text-white'
                  : !canAddMore
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-white text-slate-600 hover:text-blue-500'
              }`}
            >
              <GitCompare className="w-4 h-4" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="w-9 h-9 rounded-lg shadow-md flex items-center justify-center bg-white text-slate-600 hover:text-blue-500 hover:scale-110 transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Event timer */}
          {isEvent && timeLeft && (
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold text-center py-2 rounded-lg bg-red-500/90 backdrop-blur-sm">
              {timeLeft} left
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-4">
          {/* Shop name */}
          {product?.Shop?.name && (
            <Link href={`/shop/${product?.Shop?.id}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-600 truncate mb-2 transition-colors">
              {product.Shop.name}
            </Link>
          )}

          {/* Title */}
          <Link href={`/product/${product?.slug || product?.id}`}>
            <h3 className="text-sm font-semibold line-clamp-2 leading-snug text-slate-800 hover:text-blue-600 transition-colors mb-3">
              {product?.title}
            </h3>
          </Link>

          {/* Stars */}
          {rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-3 h-3 ${s <= fullStars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200 fill-slate-200'}`} />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">{rating.toFixed(1)}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mt-auto mb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900">
                  {formatPrice(product?.sale_price)}
                </span>
                {discount > 0 && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product?.regular_price)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-xs font-medium text-green-600">Save {formatPrice(product?.regular_price - product?.sale_price)}</span>
              )}
            </div>
            {product?.totalSales > 0 && (
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                {product.totalSales} sold
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={() => isInCart
              ? removeFromCart(product.id, user, location, deviceInfo)
              : addToCart({ ...product, quantity: 1 }, user, location, deviceInfo)}
            disabled={product?.stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
              product?.stock === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isInCart
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {product?.stock === 0 ? (
              <>Out of Stock</>
            ) : isInCart ? (
              <>
                <Zap className="w-4 h-4" />
                Remove from Cart
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>

          {/* Compare button */}
          <button
            onClick={handleCompare}
            disabled={!isCompared && !canAddMore}
            title={!isCompared && !canAddMore ? "Compare list full — remove a product first" : ""}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 mt-2 ${
              isCompared
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : !canAddMore
                ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            {isCompared ? 'Comparing' : !canAddMore ? 'Compare Full (4/4)' : 'Compare'}
          </button>
        </div>
      </div>

      {open && <ProductDetailsCard data={product} setOpen={setOpen} />}
    </>
  );
};

export default ProductCard;
