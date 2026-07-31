'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
        <div className="text-center py-12 text-muted-foreground">Loading collections...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-pink-200 rounded-lg">
                <div className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center relative overflow-hidden rounded-lg">
                  {category.image ? (
                    <Image 
                      src={category.image} 
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-6xl mb-4">
                      {categoryEmojis[category.slug] || '👗'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white uppercase tracking-wide text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/90 line-clamp-1">{category.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
