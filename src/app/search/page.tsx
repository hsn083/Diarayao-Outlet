'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Loader2, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
    sortBy: searchParams.get('sort') || 'relevance',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  });

  // Update SEO metadata
  useEffect(() => {
    const title = query ? `Search Results for "${query}" | Diarayao Outlet` : 'Search Products | Diarayao Outlet';
    document.title = title;
    
    const description = query 
      ? `Search results for "${query}" at Diarayao Outlet. Find premium abayas, hijabs, and modest fashion across Pakistan.`
      : 'Search for premium abayas, hijabs, and modest fashion at Diarayao Outlet. Browse our extensive collection across Pakistan.';
    
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta') as HTMLMetaElement;
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
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

    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://www.diarayao.com/search?q=${encodeURIComponent(query)}`);
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

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://www.diarayao.com/search?q=${encodeURIComponent(query)}`);
    } else {
      canonicalLink = document.createElement('link') as HTMLLinkElement;
      canonicalLink.rel = 'canonical';
      canonicalLink.href = `https://www.diarayao.com/search?q=${encodeURIComponent(query)}`;
      document.head.appendChild(canonicalLink);
    }
  }, [query]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query.trim()) {
        setError('Please enter a search keyword');
        setProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');

      const params = new URLSearchParams({
        q: query,
        page: pagination.page.toString(),
        limit: '20',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      });

      try {
        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products || []);
          setPagination(data.pagination || pagination);
          if (data.products.length === 0) {
            setError('No products found');
          }
        } else {
          setError(data.error || 'Failed to search products');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters, pagination.page]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      sortBy: 'relevance',
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Search Results</h1>
            <p className="text-gray-600">
              {query ? `Showing results for "${query}"` : 'Enter a search term to find products'}
            </p>
          </div>

          {/* Filters Toggle */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            {Object.values(filters).some(v => v !== '') && (
              <Button variant="ghost" onClick={clearFilters} className="text-sm">
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">All Categories</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range (PKR)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Minimum Rating</label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="1">1+ Stars</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">{error}</p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && products.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.hasPrev}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
