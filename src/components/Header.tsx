'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, Menu, Heart, X, Truck, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Notifications from './Notifications';
import BrandLogo from './BrandLogo';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const router = useRouter();
  const cartItems = useCartStore(state => state.items);
  const wishlistItems = useWishlistStore(state => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const general = useSettingsStore(state => state.settings.general);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    
    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions(null);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        setSuggestions(data);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(true);

    // Debounce API calls
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      saveRecentSearch(query);
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleDesktopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(mobileSearchQuery);
  };

  const handleSuggestionClick = (type: string, value: string) => {
    if (type === 'product') {
      router.push(`/product/${value}`);
    } else if (type === 'category') {
      router.push(`/category/${value}`);
    } else if (type === 'brand') {
      handleSearch(value);
    } else if (type === 'recent') {
      handleSearch(value);
    }
    setShowSuggestions(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm'
      }`}
    >
       <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between w-full h-14 sm:h-16 md:h-20">
          {/* Logo */}
           <div className="flex items-center justify-start pl-0 sm:pl-2 md:pl-6 pr-2 sm:pr-4 md:pr-8 shrink-0">
            <BrandLogo 
              variant="light"
            />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8 lg:mx-12" ref={searchRef} role="search">
            <form onSubmit={handleDesktopSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search abayas, hijabs, modest wear..."
                className="pl-10 w-full border-pink-200 focus:border-pink-400 focus:ring-pink-500/20 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                aria-label="Search products"
                aria-autocomplete="list"
                aria-controls="search-suggestions"
                aria-expanded={showSuggestions}
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && (searchQuery || recentSearches.length > 0) && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
                  id="search-suggestions"
                  role="listbox"
                  aria-label="Search suggestions"
                >
                  {isLoadingSuggestions ? (
                    <div className="p-4 text-center text-gray-500" role="status" aria-live="polite">
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-pink-500 border-t-transparent"></div>
                    </div>
                  ) : (
                    <>
                      {/* Recent Searches */}
                      {!searchQuery && recentSearches.length > 0 && (
                        <div className="p-3 border-b border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Recent Searches</span>
                            <button
                              onClick={clearRecentSearches}
                              className="text-xs text-pink-600 hover:text-pink-700 flex items-center gap-1"
                              aria-label="Clear recent searches"
                            >
                              <XCircle className="h-3 w-3" aria-hidden="true" />
                              Clear
                            </button>
                          </div>
                          {recentSearches.map((search, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick('recent', search)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded-md flex items-center gap-2"
                            >
                              <Clock className="h-4 w-4 text-gray-400" />
                              {search}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Products */}
                      {suggestions?.products && suggestions.products.length > 0 && (
                        <div className="p-3 border-b border-gray-100">
                          <span className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Products</span>
                          {suggestions.products.map((product: any) => (
                            <button
                              key={product.id}
                              onClick={() => handleSuggestionClick('product', product.slug)}
                              className="w-full text-left px-3 py-2 hover:bg-pink-50 rounded-md flex items-center gap-3"
                            >
                              {product.images?.[0] && (
                                <div className="relative w-10 h-10">
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                <p className="text-xs text-gray-500">PKR {(product.discountPrice || product.price).toLocaleString()}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Categories */}
                      {suggestions?.categories && suggestions.categories.length > 0 && (
                        <div className="p-3 border-b border-gray-100">
                          <span className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Categories</span>
                          {suggestions.categories.map((category: any, idx: number) => (
                            <button
                              key={category._id || idx}
                              onClick={() => handleSuggestionClick('category', category.slug)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded-md"
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Brands */}
                      {suggestions?.brands && suggestions.brands.length > 0 && (
                        <div className="p-3">
                          <span className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Brands</span>
                          {suggestions.brands.map((brand: any, idx: number) => (
                            <button
                              key={brand._id || idx}
                              onClick={() => handleSuggestionClick('brand', brand.name)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 rounded-md"
                            >
                              {brand.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* View All Results */}
                      {searchQuery && (
                        <div className="p-3 border-t border-gray-100">
                          <button
                            onClick={() => handleSearch(searchQuery)}
                            className="w-full text-center py-2 text-sm font-medium text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-md"
                          >
                            View all results for "{searchQuery}"
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center leading-none text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/category/abayas" className="flex items-center leading-none text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200 relative group">
              Abayas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/shop?sort=price-asc" className="flex items-center leading-none text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200 relative group">
              Sale
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/shop" className="flex items-center leading-none text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200 relative group">
              New Arrivals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/track-order" className="flex items-center gap-1 leading-none text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200 relative group">
              <Truck className="w-4 h-4 flex-shrink-0" />
              <span>Track Order</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="flex items-center leading-none text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors duration-200 relative group">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Notifications />
            <Link href="/wishlist" aria-label="Wishlist">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative flex items-center justify-center hover:text-pink-600 hover:bg-pink-50 transition-all duration-200"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-500 text-white hover:bg-pink-600 transition-colors">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/cart" aria-label="Shopping Cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative flex items-center justify-center hover:text-pink-600 hover:bg-pink-50 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-500 text-white hover:bg-pink-600 transition-colors">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/account" aria-label="Account">
              <Button 
                variant="ghost" 
                size="icon" 
                className="flex items-center justify-center hover:text-pink-600 hover:bg-pink-50 transition-all duration-200"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden flex items-center justify-center hover:text-pink-600 hover:bg-pink-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleMobileSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder="Search modest wear..."
              className="pl-10 w-full border-pink-200 focus:border-pink-400 focus:ring-pink-500/20 transition-all duration-200"
            />
          </form>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[9999] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Slide-in Sidebar */}
            <div
              className="fixed left-0 top-0 h-[100vh] w-[min(90vw,380px)] bg-white shadow-2xl overflow-y-auto z-[10000] transform transition-transform duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sidebar Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 z-20">
                <div className="flex items-center justify-between p-5">
                  <BrandLogo variant="dark" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="hover:bg-gray-100"
                  >
                    <X className="h-6 w-6 text-gray-700" />
                  </Button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-gray-100">
                <form onSubmit={handleMobileSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="search"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="pl-10 w-full border-gray-300 focus:border-pink-400 focus:ring-pink-500/20 text-gray-900"
                  />
                </form>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href="/category/abayas"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Abayas
                </Link>

                <Link
                  href="/shop?sort=price-asc"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sale
                </Link>

                <Link
                  href="/shop"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>

                <Link
                  href="/track-order"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Truck className="h-5 w-5 text-gray-600" />
                  Track Order
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>

              {/* Account Links */}
              <div className="border-t border-gray-200 p-4 space-y-1">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-gray-600" />
                  My Account
                </Link>

                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="h-5 w-5 text-gray-600" />
                  Wishlist
                  {wishlistItems.length > 0 && (
                    <Badge className="ml-auto bg-pink-500 text-white">{wishlistItems.length}</Badge>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge className="ml-auto bg-pink-500 text-white">{cartItems.length}</Badge>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
