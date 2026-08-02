import { Metadata } from 'next';
import { Product } from '@/types';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/product/${params.slug}`,
    },
  };
}

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SEOContentSection from '@/components/SEOContentSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/toast';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw,
  Check,
  Minus,
  Plus,
  Loader2,
  X,
  MessageCircle,
  Copy,
  Facebook,
  Twitter,
  Mail as MailIcon
} from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import ReviewSection from '@/components/ReviewSection';
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hexCode: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [sessionId, setSessionId] = useState<string>('');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isBuyingNow, setIsBuyingNow] = useState<boolean>(false);
  const [liveRating, setLiveRating] = useState({ averageRating: 0, totalReviews: 0 });
  const { success: toastSuccess, error: toastError } = useToast();
  
  const { products, refetchProducts } = useProductStore();
  const { addItem } = useCartStore();

  const product = products.find(p => p.slug === slug);

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
    setLightboxIndex(index);
    setImageLoaded(false);
    // Preload adjacent images
    if (product?.images && index > 0 && !loadedImages.has(index - 1)) {
      const img = document.createElement('img');
      img.src = product.images[index - 1];
      setLoadedImages(prev => new Set(prev).add(index - 1));
    }
    if (product?.images && index < product.images.length - 1 && !loadedImages.has(index + 1)) {
      const img = document.createElement('img');
      img.src = product.images[index + 1];
      setLoadedImages(prev => new Set(prev).add(index + 1));
    }
  };

  const handleImageClick = () => {
    setLightboxOpen(true);
    setLightboxIndex(selectedImage);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!product?.images) return;
    if (e.key === 'ArrowLeft' && selectedImage > 0) {
      handleThumbnailClick(selectedImage - 1);
    } else if (e.key === 'ArrowRight' && selectedImage < product.images.length - 1) {
      handleThumbnailClick(selectedImage + 1);
    }
  }, [selectedImage, product?.images, handleThumbnailClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Fetch live rating data from reviews API
  const fetchLiveRating = useCallback(async () => {
    if (!product?.id) return;
    try {
      const res = await fetch(`/api/reviews?productId=${product.id}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setLiveRating({
          averageRating: data.averageRating || 0,
          totalReviews: data.totalReviews || 0,
        });
      }
    } catch (err) {
      console.error('Failed to fetch live rating:', err);
    }
  }, [product?.id]);

  // Function declarations - must be before useEffect hooks that use them

  const checkWishlistStatus = useCallback(async () => {
    if (!product || !sessionId) return;
    try {
      const response = await fetch(`/api/wishlist?sessionId=${sessionId}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.success) {
        const isInWishlist = data.wishlist.some((item: any) => item.productId === product.id);
        setIsWishlisted(isInWishlist);
        setWishlistCount(data.wishlist.length);
      }
    } catch (err) {
      console.error('Error checking wishlist:', err);
    }
  }, [product, sessionId]);

  useEffect(() => {
    // Generate or retrieve session ID
    let storedSessionId = localStorage.getItem('guest_session_id');
    if (!storedSessionId) {
      storedSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('guest_session_id', storedSessionId);
    }
    setSessionId(storedSessionId);

    const fetchData = async () => {
      try {
        await refetchProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refetchProducts]);

  // Clear stale data when product changes
  useEffect(() => {
    if (product?.id) {
      // Reset image states
      setSelectedImage(0);
      setLoadedImages(new Set());
      setImageLoaded(false);
      setLightboxIndex(0);
    }
  }, [product?.id]);

  // Preload initial images
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      // Preload first image
      const img = document.createElement('img');
      img.src = product.images[0];
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(0));
        setImageLoaded(true);
      };
      // Preload second image if exists
      if (product.images.length > 1) {
        const img2 = document.createElement('img');
        img2.src = product.images[1];
        img2.onload = () => {
          setLoadedImages(prev => new Set(prev).add(1));
        };
      }
    }
  }, [product?.images]);

  // User-specific actions that require sessionId
  useEffect(() => {
    if (product && sessionId) {
      // Check if product is in wishlist
      checkWishlistStatus();
    }
  }, [product, sessionId, checkWishlistStatus]);

  // Fetch live rating when product loads
  useEffect(() => {
    if (product?.id) {
      fetchLiveRating();
    }
  }, [product?.id, fetchLiveRating]);

  // Update SEO metadata when product loads
  useEffect(() => {
    if (product) {
      // Update document title
      const title = product.metaTitle || `${product.name} | Diarayao Outlet`;
      document.title = title;

      // Update meta description
      const description = product.metaDescription || product.description;
      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta') as HTMLMetaElement;
        metaDescription.name = 'description';
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }

      // Update meta keywords
      const keywords = product.metaKeywords || `${product.name}, Abaya, ${product.category}, Diarayao Outlet, Modest Fashion, Islamic Clothing`;
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta') as HTMLMetaElement;
        metaKeywords.name = 'keywords';
        metaKeywords.content = keywords;
        document.head.appendChild(metaKeywords);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }

      const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
      if (ogImage && product.images && product.images.length > 0) {
        ogImage.setAttribute('content', product.images[0]);
      }

      // Update Twitter card
      const twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
      if (twitterTitle) {
        twitterTitle.setAttribute('content', title);
      }

      const twitterDescription = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }

      const twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
      if (twitterImage && product.images && product.images.length > 0) {
        twitterImage.setAttribute('content', product.images[0]);
      }
    }
  }, [product]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400" />
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => window.location.href = '/shop'}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    { name: product.category, item: `/category/${product.category}` },
    { name: product.name, item: `/product/${product.slug}` },
  ];

  const handleReviewSubmit = async () => {
    // Refresh live rating data
    await fetchLiveRating();
    // Refresh product store to update ProductCard data across the app
    await refetchProducts();
  };

  const handleWishlistToggle = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          productId: product.id,
          sessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsWishlisted(data.action === 'added');
        setWishlistCount(data.action === 'added' ? wishlistCount + 1 : wishlistCount - 1);
        toastSuccess(data.action === 'added' ? 'Added to wishlist' : 'Removed from wishlist');
      } else {
        toastError(data.error || 'Failed to update wishlist');
      }
    } catch (error) {
      toastError('Failed to update wishlist');
    }
  };

  const handleShare = async () => {
    const productUrl = window.location.href;

    // Check if native share API is available (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on AlhamdCollection Store!`,
          url: productUrl,
        });
        toastSuccess('Shared successfully');
        return;
      } catch (error) {
        console.log('Native share failed, falling back to clipboard');
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(productUrl);
      toastSuccess('Link copied to clipboard');
    } catch (error) {
      toastError('Failed to copy link');
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    // Validate stock
    if (product.stock === 0) {
      toastError('This product is out of stock');
      return;
    }

    // Validate quantity
    if (quantity < 1) {
      toastError('Please select a valid quantity');
      return;
    }

    if (quantity > product.stock) {
      toastError(`Only ${product.stock} items available in stock`);
      return;
    }

    // Validate size selection if sizes are available
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toastError('Please select a size');
      return;
    }

    // Validate color selection if colors are available
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toastError('Please select a color');
      return;
    }

    setIsAddingToCart(true);

    try {
      // Add product to cart using Zustand store with selected size and color
      console.log('[DEBUG ADD TO CART] Adding to cart with:', { selectedSize, selectedColor });
      addItem(product, quantity, selectedSize || undefined, selectedColor?.name);
      
      toastSuccess('Product added to cart successfully');
    } catch (error) {
      console.error('Add to cart error:', error);
      toastError('Failed to add product to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

    // Validate stock
    if (product.stock === 0) {
      toastError('This product is out of stock');
      return;
    }

    // Validate quantity
    if (quantity < 1) {
      toastError('Please select a valid quantity');
      return;
    }

    if (quantity > product.stock) {
      toastError(`Only ${product.stock} items available in stock`);
      return;
    }

    // Validate size selection if sizes are available
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toastError('Please select a size');
      return;
    }

    // Validate color selection if colors are available
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toastError('Please select a color');
      return;
    }

    setIsBuyingNow(true);

    try {
      // Add product to cart using Zustand store with selected size and color
      console.log('[DEBUG BUY NOW] Adding to cart with:', { selectedSize, selectedColor });
      addItem(product, quantity, selectedSize || undefined, selectedColor?.name);
      
      // Redirect to checkout page
      router.push('/checkout');
    } catch (error) {
      console.error('Buy now error:', error);
      toastError('Failed to proceed to checkout. Please try again.');
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      {product && (
        <ProductSchema
          name={product.name}
          description={product.description}
          image={product.images?.[0] || 'https://www.diarayao.com/favicon.png'}
          price={product.discountPrice || product.price}
          currency="PKR"
          availability={product.stock > 0 ? 'InStock' : 'OutOfStock'}
          brand="Diarayao Outlet"
          averageRating={liveRating.averageRating}
          reviewCount={liveRating.totalReviews}
        />
      )}
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="w-full flex items-center h-12 md:h-14 overflow-x-auto bg-muted/30">
          <div className="container mx-auto px-4">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 h-full flex-nowrap overflow-x-auto whitespace-nowrap text-xs md:text-sm leading-none"
            >
              <a href="/" className="flex items-center text-gray-500 hover:text-pink-600 leading-none">
                Home
              </a>

              <span className="flex items-center mx-2 text-gray-400 leading-none">/</span>

              <a href="/shop" className="flex items-center text-gray-500 hover:text-pink-600 leading-none">
                Shop
              </a>

              <span className="flex items-center mx-2 text-gray-400 leading-none">/</span>

              <a href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center text-gray-500 hover:text-pink-600 leading-none">
                {product.category}
              </a>

              <span className="flex items-center mx-2 text-gray-400 leading-none">/</span>

              <span className="flex items-center font-semibold text-gray-900 leading-none">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
            {/* Product Images */}
            <div className="space-y-3 md:space-y-4">
              {/* Main Image with Premium Zoom */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                {product.images && product.images.length > 0 ? (
                  <>
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center z-10">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-pink-500 rounded-full animate-spin" />
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() => selectedImage > 0 && handleThumbnailClick(selectedImage - 1)}
                          disabled={selectedImage === 0}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                          aria-label="Previous image"
                        >
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-pink-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => selectedImage < product.images.length - 1 && handleThumbnailClick(selectedImage + 1)}
                          disabled={selectedImage === product.images.length - 1}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                          aria-label="Next image"
                        >
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-pink-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Image Counter Badge */}
                    {product.images.length > 1 && (
                      <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-medium">
                        {selectedImage + 1} / {product.images.length}
                      </div>
                    )}

                    {/* Click to view indicator */}
                    <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm hidden md:flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Click to zoom
                    </div>

                    {/* Main Image Container with Subtle Hover Scale */}
                    <div 
                      className="aspect-square relative overflow-hidden cursor-zoom-in group"
                      onClick={handleImageClick}
                      onWheel={(e) => {
                        if (e.deltaY !== 0) {
                          e.preventDefault();
                          const newIndex = e.deltaY > 0 
                            ? Math.min(selectedImage + 1, product.images.length - 1)
                            : Math.max(selectedImage - 1, 0);
                          if (newIndex !== selectedImage) {
                            handleThumbnailClick(newIndex);
                          }
                        }
                      }}
                    >
                      <img
                        src={product.images[selectedImage]}
                        alt={`${product.name} - ${product.category} abaya in ${selectedColor?.name || product.colors?.[0]?.name || 'various colors'} available at Diarayao Outlet Pakistan. Image ${selectedImage + 1} of ${product.images.length}`}
                        className="w-full h-full object-contain object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="aspect-square flex items-center justify-center text-8xl bg-gradient-to-br from-gray-100 to-gray-200">
                    👗
                  </div>
                )}
              </div>
              {/* Premium Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`aspect-square bg-white rounded-xl overflow-hidden border-2 relative flex items-center justify-center transition-all duration-300 group ${
                        selectedImage === index 
                          ? 'border-pink-500 ring-2 ring-pink-200 shadow-md scale-105' 
                          : 'border-gray-200 hover:border-pink-400 hover:shadow-md'
                      }`}
                    >
                      {!loadedImages.has(index) && (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                      )}
                      <Image
                        src={image}
                        alt={`${product.name} - Thumbnail ${index + 1} - ${product.category} abaya in ${product.colors?.map(c => c.name).join(', ') || 'various colors'} available at Diarayao Outlet Pakistan`}
                        title={`${product.name} - View ${index + 1}`}
                        fill
                        className={`object-contain object-top transition-opacity duration-300 ${
                          loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                        }`}
                        sizes="(max-width: 640px) 25vw, (max-width: 768px) 25vw, (max-width: 1024px) 25vw, 25vw"
                        quality={100}
                        onLoad={() => setLoadedImages(prev => new Set(prev).add(index))}
                      />
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-pink-500/10 pointer-events-none" />
                      )}
                    </button>
                  ))
                ) : (
                  Array.from({ length: 4 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`aspect-square bg-white rounded-xl overflow-hidden border-2 ${
                        selectedImage === index ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200'
                      }`}
                    >
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                        👗
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div>
                  {product.newArrival && (
                    <Badge className="mb-2 bg-green-500">New</Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge className="mb-2 ml-2 bg-orange-500">Best Seller</Badge>
                  )}
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleWishlistToggle}
                    className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
             
              {/* Price */}           
              <div className="mb-4 md:mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-pink-600">
                    PKR {(product.discountPrice || product.price).toLocaleString()}
                  </span>
                  {product.discountPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        PKR {product.price.toLocaleString()}
                      </span>
                      <Badge className="bg-pink-500">-{discount}%</Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium mb-2 md:mb-3">Color: {selectedColor?.name || 'Select a color'}</label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor?.name === color.name 
                            ? 'border-pink-500 ring-2 ring-pink-200' 
                            : 'border-gray-300 hover:border-pink-300'
                        }`}
                        style={{ backgroundColor: color.hexCode }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium mb-2 md:mb-3">Size: {selectedSize || 'Select a size'}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => size.stock > 0 && setSelectedSize(size.size)}
                        disabled={size.stock === 0}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedSize === size.size
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : size.stock === 0
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 hover:border-pink-300'
                        }`}
                      >
                        {size.size}
                        {size.stock === 0 && <span className="ml-1 text-xs">(Out of Stock)</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-4 md:mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-600">
                    <X className="h-5 w-5" />
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium mb-2 md:mb-3">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 text-center font-medium">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(liveRating.averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{liveRating.averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({liveRating.totalReviews} reviews)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 w-full">
                <Button 
                  className="flex-1 min-w-0 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4" 
                  disabled={product.stock === 0 || isAddingToCart}
                  onClick={handleAddToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span className="hidden sm:inline">Adding...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 min-w-0 border-pink-500 text-pink-700 hover:bg-pink-50 font-semibold h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4"
                  disabled={product.stock === 0 || isBuyingNow}
                  onClick={handleBuyNow}
                >
                  {isBuyingNow ? (
                    <>
                      <Loader2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span className="hidden sm:inline">Processing...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Buy Now</span>
                      <span className="sm:hidden">Buy</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-4">
                <Card className="border-pink-100">
                  <CardContent className="h-16 md:h-28 flex flex-col items-center justify-center rounded-xl border bg-white p-2 md:p-6 text-center">
                    <Truck className="w-5 h-5 md:w-7 md:h-7 text-pink-600" />
                    <p className="mt-2 text-[11px] md:text-sm font-medium text-center leading-tight">Fast Delivery</p>
                  </CardContent>
                </Card>
                <Card className="border-pink-100">
                  <CardContent className="h-16 md:h-28 flex flex-col items-center justify-center rounded-xl border bg-white p-2 md:p-6 text-center">
                    <Shield className="w-5 h-5 md:w-7 md:h-7 text-pink-600" />
                    <p className="mt-2 text-[11px] md:text-sm font-medium text-center leading-tight">{product.warranty} Warranty</p>
                  </CardContent>
                </Card>
                <Card className="border-pink-100">
                  <CardContent className="h-16 md:h-28 flex flex-col items-center justify-center rounded-xl border bg-white p-2 md:p-6 text-center">
                    <RotateCcw className="w-5 h-5 md:w-7 md:h-7 text-pink-600" />
                    <p className="mt-2 text-[11px] md:text-sm font-medium text-center leading-tight">7 Days Return</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-8 md:mb-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 md:mt-6">
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4 md:mt-6">
                <ReviewSection productId={product.id} onReviewSubmit={handleReviewSubmit} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <SEOContentSection />
        </div>
      </main>
      <Footer />

      {/* Premium Lightbox with Zoom, Thumbnails, and Fullscreen */}
      {product?.images && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={product.images.map((img) => ({
            src: img,
            alt: product.name,
            width: 1920,
            height: 1920,
          }))}
          plugins={[Zoom, Fullscreen, Thumbnails, Captions]}
          zoom={{
            maxZoomPixelRatio: 4,
            zoomInMultiplier: 2,
            scrollToZoom: true,
          }}
          thumbnails={{
            position: 'bottom',
            width: 120,
            height: 120,
            border: 0,
            borderRadius: 12,
            padding: 12,
            gap: 12,
            showToggle: true,
          }}
          carousel={{
            finite: product.images.length <= 1,
            preload: 3,
          }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      )}


    </>
  );
}
