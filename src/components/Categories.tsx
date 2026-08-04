'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Category } from '@/types';

// Fashion category emojis as fallback
const categoryEmojis: Record<string, string> = {
 
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?status=active&updateCounts=true');
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="text-center mb-12 mt-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Shop by Category</h2>
        <p className="text-muted-foreground">Browse our elegant Islamic modest wear collections</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground" role="status" aria-live="polite">Loading collections...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center" role="list" aria-label="Product categories">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="flex flex-col items-center group" aria-label={`Browse ${category.name} collection`}>
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 aspect-square rounded-full bg-white border border-gray-200 shadow-md overflow-hidden group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                {category.image ? (
                  <Image 
                    src={category.image} 
                    alt={`${category.name} category - Browse our ${category.name} collection at Diarayao Outlet Pakistan`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 150px, (max-width: 1024px) 160px, 176px"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl" aria-hidden="true">
                    {categoryEmojis[category.slug] || '👗'}
                  </div>
                )}
              </div>
              <h3 className="mt-3 sm:mt-4 font-semibold text-gray-900 text-center text-sm sm:text-base md:text-lg group-hover:text-pink-600 transition-colors duration-300">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-xs sm:text-sm text-gray-600 text-center line-clamp-1 mt-1">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
