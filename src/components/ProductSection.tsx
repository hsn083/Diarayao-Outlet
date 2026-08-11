'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Hide section if no products and not loading
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="products-heading" className="py-16 bg-white" style={{ contain: 'layout' }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 id="products-heading" className="text-3xl font-bold text-[#D4849C] mb-2">Our Collection</h2>
            <p className="text-gray-600">Discover our complete collection of premium modest fashion</p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-[#D4849C] hover:text-[#C77B94] font-semibold transition-colors"
            aria-label="View all products"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-[4/5] bg-gray-200 rounded-lg animate-pulse p-3" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Link 
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 bg-[#D4849C] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-[#C77B94] hover:scale-105 transition-all duration-300 text-base sm:text-lg"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
