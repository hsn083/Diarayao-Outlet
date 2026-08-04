'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Zap, Loader2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [imageError, setImageError] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const { success: toastSuccess, error: toastError } = useToast();
  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  // Detect desktop device (non-touch)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Preload hover image on desktop
  useEffect(() => {
    if (isDesktop && product.hoverImage) {
      const img = document.createElement('img');
      img.src = product.hoverImage;
    }
  }, [isDesktop, product.hoverImage]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Validate stock
    if (product.stock === 0) {
      toastError('This product is out of stock');
      return;
    }

    setIsAddingToCart(true);

    try {
      // Add product to cart with default quantity of 1
      // Note: Size and color selection is not available on ProductCard,
      // users should go to product page for variant selection
      addItem(product, 1);
      
      toastSuccess('Product added to cart successfully');
    } catch (error) {
      console.error('Add to cart error:', error);
      toastError('Failed to add product to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Validate stock
    if (product.stock === 0) {
      toastError('This product is out of stock');
      return;
    }

    setIsBuyingNow(true);

    try {
      // Add product to cart with default quantity of 1
      addItem(product, 1);
      
      // Redirect to checkout page
      router.push('/checkout');
    } catch (error) {
      console.error('Buy now error:', error);
      toastError('Failed to proceed to checkout. Please try again.');
    } finally {
      setIsBuyingNow(false);
    }
  };

  const handleMouseEnter = () => {
    if (!isDesktop) return;
    
    // If hoverImage exists, use it. Otherwise, fall back to second image in array
    if (product.hoverImage) {
      setIsHovering(true);
    } else if (product.images && product.images.length > 1) {
      setHoveredImage(1);
    }
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    
    setIsHovering(false);
    setHoveredImage(0);
  };

  // Determine which image to show
  const currentImage = isHovering && product.hoverImage 
    ? product.hoverImage 
    : (product.images && product.images[hoveredImage]) || product.images?.[0];

  // Get available sizes from product.sizes array
  const availableSizes = product.sizes?.filter(s => s.stock > 0).map(s => s.size) || [];
  const displaySizes = availableSizes.slice(0, 4); // Show max 4 sizes

  return (
    <Card className="overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(212,132,156,0.2)] hover:-translate-y-2 transition-all duration-300 ease border border-[#F4E4E9] bg-white hover:border-pink-300 rounded-2xl">
      <Link href={`/product/${product.slug}`} aria-label={`View ${product.name} details`}>
        <div 
          className="relative aspect-[3/4] md:aspect-[4/5] bg-white flex items-center justify-center overflow-hidden rounded-t-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {currentImage && !imageError ? (
            <Image
              src={currentImage}
              alt={`${product.name} - ${product.category} abaya in ${product.colors?.map(c => c.name).join(', ') || 'various colors'} available at Diarayao Outlet Pakistan`}
              title={product.name}
              fill
              className="object-contain object-top group-hover:scale-105 transition-all duration-300 ease-in-out"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              quality={100}
              priority={false}
              loading="lazy"
              onError={() => {
                console.error('ProductCard image failed to load:', currentImage);
                setImageError(true);
              }}
            />
          ) : null}
          <div className="w-full h-full flex items-center justify-center text-7xl md:text-8xl group-hover:scale-110 transition-transform" style={{ display: (currentImage && !imageError) ? 'none' : 'flex' }} aria-hidden="true">
            👗
          </div>
          
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-rose-500 z-10 text-white" aria-label={`${discount}% discount`}>
              -{discount}%
            </Badge>
          )}
          
          {/* Status Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 z-10" role="status" aria-label="Product status">
            {product.statusTags?.includes('new') && (
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                New
              </Badge>
            )}
            {product.statusTags?.includes('sale') && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                Sale
              </Badge>
            )}
            {product.statusTags?.includes('featured') && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                Featured
              </Badge>
            )}
            {product.statusTags?.includes('out-of-stock') && (
              <Badge className="bg-gray-600 text-white">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-sm z-10"
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product.id);
            }}
            aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          </Button>
        </div>
      </Link>
      
      <CardContent className="p-2.5 md:p-3 lg:p-5">
        {product.brand && (
          <p className="text-[10px] sm:text-[11px] md:text-xs text-pink-600 font-medium mb-1 sm:mb-1.5 uppercase tracking-wide">{product.brand}</p>
        )}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold mb-2 sm:mb-2.5 line-clamp-2 group-hover:text-pink-700 transition-colors text-gray-800 text-xs sm:text-sm md:text-base leading-snug">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1 sm:space-x-1.5 mb-2 sm:mb-2.5">
          <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">{(product.rating || 0).toFixed(1)}</span>
          <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">({product.reviewCount || product.reviews || 0})</span>
        </div>
        
        <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2.5 sm:mb-3.5">
          <span className="text-base sm:text-lg md:text-xl font-bold text-pink-600">
            PKR {(product.discountPrice || product.price).toLocaleString()}
          </span>
          {product.discountPrice && (
            <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground line-through">
              PKR {product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Display available sizes */}
        {displaySizes.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
            {displaySizes.map((size, index) => (
              <span 
                key={index} 
                className="text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 md:py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                {size}
              </span>
            ))}
            {availableSizes.length > 4 && (
              <span className="text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 md:py-1 bg-gray-100 text-gray-600 rounded-full">
                +{availableSizes.length - 4}
              </span>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-2.5 pt-0 sm:p-3 md:p-5 md:pt-0 flex flex-row items-center w-full gap-2 sm:gap-2.5">
        <Button 
          className="flex-1 min-w-0 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold text-[11px] sm:text-xs md:text-sm px-2 sm:px-2.5 md:px-4 py-2 sm:py-2 md:py-2.5 h-9 sm:h-9 md:h-10" 
          size="sm"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
        >
          {isAddingToCart ? (
            <Loader2 className="mr-1 h-3.5 w-3.5 sm:mr-1 sm:h-3.5 sm:w-3.5 animate-spin" />
          ) : (
            <ShoppingCart className="mr-1 h-3.5 w-3.5 sm:mr-1 sm:h-3.5 sm:w-3.5" />
          )}
          <span className="truncate text-[11px] sm:text-xs md:text-sm">{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
        </Button>
        <Button 
          className="flex-1 min-w-0 border-pink-500 text-pink-700 hover:bg-pink-50 font-semibold text-[11px] sm:text-xs md:text-sm px-2 sm:px-2.5 md:px-4 py-2 sm:py-2 md:py-2.5 h-9 sm:h-9 md:h-10" 
          size="sm"
          variant="outline"
          onClick={handleBuyNow}
          disabled={product.stock === 0 || isBuyingNow}
        >
          {isBuyingNow ? (
            <Loader2 className="mr-1 h-3.5 w-3.5 sm:mr-1 sm:h-3.5 sm:w-3.5 animate-spin" />
          ) : (
            <Zap className="mr-1 h-3.5 w-3.5 sm:mr-1 sm:h-3.5 sm:w-3.5" />
          )}
          <span className="truncate text-[11px] sm:text-xs md:text-sm">{isBuyingNow ? 'Processing...' : 'Buy Now'}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
