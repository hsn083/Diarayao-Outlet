'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function AbayaProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbayaProducts = async () => {
      try {
        const response = await fetch('/api/products?category=abaya&limit=6');
        const data = await response.json();
        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching abaya products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbayaProducts();
  }, []);

  // Hide section if no products and not loading
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#D4849C] mb-2">Abayas Collection</h2>
            <p className="text-gray-600">Discover our elegant abayas crafted with premium fabrics</p>
          </div>
          <Link 
            href="/category/abayas"
            className="flex items-center gap-2 text-[#D4849C] hover:text-[#C77B94] font-semibold transition-colors"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
