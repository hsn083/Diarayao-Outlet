'use client';

import { Check } from 'lucide-react';
import { Product } from '@/types';

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  // Parse description to extract structured information
  const parseDescription = (description: string) => {
    const specs: { [key: string]: string } = {};
    const cleanDescription = description
      .replace(/🛍️\s*Shop Now:\s*Diarayao\s*Outlet/gi, '')
      .replace(/Shop Now:\s*Diarayao\s*Outlet/gi, '')
      .trim();
    
    // Try to parse "Key: Value" pattern
    const lines = cleanDescription.split('\n');
    let descriptionStart = 0;
    
    lines.forEach((line, index) => {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        specs[key] = value;
      } else if (line.trim()) {
        descriptionStart = index;
        return false; // Stop parsing after finding first non-spec line
      }
    });
    
    // Extract the actual description text
    const descriptionText = lines.slice(descriptionStart).join('\n').trim();
    
    return { specs, descriptionText };
  };

  const { specs, descriptionText } = parseDescription(product.description);

  // Check if we have any specifications to display
  const hasSpecs = Object.keys(specs).length > 0;
  
  // Check if description contains HTML or is plain text
  const isHTML = /<[a-z][\s\S]*>/i.test(descriptionText);

  // Handle features from API response
  const features = product.features || [];

  return (
    <div className="space-y-8">
      {/* Product Specifications */}
      {hasSpecs && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="border-b border-gray-100 pb-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{key}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Description */}
      {descriptionText && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Product</h3>
          {isHTML ? (
            <div 
              className="prose prose-sm prose-pink max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descriptionText }}
            />
          ) : (
            <div className="prose prose-sm prose-pink max-w-none text-gray-700 leading-relaxed">
              {descriptionText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Features */}
      {features && features.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-[#D4849C] mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Information */}
      {(product.fabric || product.warranty) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          <div className="space-y-2">
            {product.fabric && (
              <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Fabric</span>
                <span className="text-sm font-semibold text-gray-900">{product.fabric}</span>
              </div>
            )}
            {product.warranty && (
              <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Warranty</span>
                <span className="text-sm font-semibold text-gray-900">{product.warranty}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
