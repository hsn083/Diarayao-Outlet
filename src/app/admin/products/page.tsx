'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast, ToastContainer } from '@/components/ui/toast';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package,
  ArrowLeft,
  Upload,
  X,
  Loader2
} from 'lucide-react';
import { Category } from '@/types';
import { useProductStore } from '@/store/productStore';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  categoryId?: string;
  brand: string;
  stock: number;
  images: string[];
  fabric?: string;
  colors?: { name: string; hexCode: string }[];
  sizes?: { size: string; stock: number }[];
  warranty: string;
  rating: number;
  reviews: number;
  newArrival?: boolean;
  statusTags?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [statusTags, setStatusTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { success, error } = useToast();
  
  const { products, setProducts, refetchProducts } = useProductStore();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    discountPrice: '',
    stock: '',
    fabric: '',
    description: ''
  });

  const [productColors, setProductColors] = useState<{ name: string; hexCode: string }[]>([]);
  const [productSizes, setProductSizes] = useState<{ size: string; stock: number }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?updateCounts=true');
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      await refetchProducts();
    } catch (err) {
      console.error('Error fetching products:', err);
      error('Failed to fetch products');
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleEditProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        const product = data.product || data.data;
        setEditingProduct(product);
        setProductImages(product.images || []);
        setSelectedCategory(product.categoryId || product.category || '');
        setStatusTags(product.statusTags || []);
        setProductColors(product.colors || []);
        setProductSizes(product.sizes || []);
        setFormData({
          name: product.name || '',
          brand: product.brand || '',
          price: product.price?.toString() || '',
          discountPrice: product.discountPrice?.toString() || '',
          stock: product.stock?.toString() || '',
          fabric: product.fabric || '',
          description: product.description || ''
        });
        setShowAddForm(true);
      } else {
        error('Failed to load product');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      error('Failed to load product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/admin/products?id=${productId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const text = await response.text();
          console.error('API Error Response:', text);
          throw new Error(text || 'API request failed');
        }
        
        const data = await response.json();
        if (data.success) {
          success('Product deleted successfully');
          // Update store directly for real-time updates
          const { deleteProduct } = useProductStore.getState();
          deleteProduct(productId);
          fetchProducts();
        } else {
          error(data.error || 'Failed to delete product');
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        error('Failed to delete product');
      }
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setProductImages([]);
    setSelectedCategory('');
    setStatusTags([]);
    setProductColors([]);
    setProductSizes([]);
    setFormData({
      name: '',
      brand: '',
      price: '',
      discountPrice: '',
      stock: '',
      fabric: '',
      description: ''
    });
  };

  const handleAddProduct = () => {
    resetForm();
    setShowAddForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setIsUploading(true);
      for (const file of Array.from(files)) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('uploadType', 'products');

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadData,
          });

          const result = await response.json();

          if (result.success) {
            setProductImages(prev => [...prev, result.data.optimizedPath]);
          } else {
            error(`Failed to upload ${file.name}: ${result.error}`);
          }
        } catch (err) {
          console.error('Upload error:', err);
          error(`Failed to upload ${file.name}`);
        }
      }
      setIsUploading(false);
    }
  };

  const addColor = () => {
    setProductColors([...productColors, { name: '', hexCode: '#000000' }]);
  };

  const removeColor = (index: number) => {
    setProductColors(productColors.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, field: 'name' | 'hexCode', value: string) => {
    const updated = [...productColors];
    updated[index][field] = value;
    setProductColors(updated);
  };

  const addSize = () => {
    setProductSizes([...productSizes, { size: '', stock: 0 }]);
  };

  const removeSize = (index: number) => {
    setProductSizes(productSizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: 'size' | 'stock', value: string | number) => {
    const updated: { size: string; stock: number }[] = [...productSizes];
    if (field === 'stock') {
      updated[index] = { ...updated[index], stock: Number(value) };
    } else {
      updated[index] = { ...updated[index], size: value as string };
    }
    setProductSizes(updated);
  };

  const triggerFileInput = () => {
    document.getElementById('image-upload')?.click();
  };

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('=== SUBMIT CLICKED ===');
    setIsSubmitting(true);

    // Validate required fields
    console.log('=== FORM VALIDATION START ===');
    console.log('formData:', formData);
    console.log('selectedCategory:', selectedCategory);
    console.log('productImages:', productImages);
    
    if (!formData.name.trim()) {
      console.error('VALIDATION FAILED: Product name is required');
      error('Product name is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.brand.trim()) {
      console.error('VALIDATION FAILED: Brand is required');
      error('Brand is required');
      setIsSubmitting(false);
      return;
    }
    if (!selectedCategory) {
      console.error('VALIDATION FAILED: Please select a category');
      error('Please select a category');
      setIsSubmitting(false);
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      console.error('VALIDATION FAILED: Price must be greater than 0');
      error('Price must be greater than 0');
      setIsSubmitting(false);
      return;
    }
    if (!formData.stock || Number(formData.stock) < 0) {
      console.error('VALIDATION FAILED: Stock cannot be negative');
      error('Stock cannot be negative');
      setIsSubmitting(false);
      return;
    }
    if (!formData.description.trim()) {
      console.error('VALIDATION FAILED: Description is required');
      error('Description is required');
      setIsSubmitting(false);
      return;
    }
    console.log('=== FORM VALIDATION PASSED ===');

    const productData = {
      name: formData.name,
      brand: formData.brand,
      category: selectedCategory,
      categoryId: selectedCategory,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      stock: Number(formData.stock),
      fabric: formData.fabric,
      description: formData.description,
      images: productImages,
      colors: productColors,
      sizes: productSizes,
      statusTags,
      warranty: '1 Year',
      tags: [],
      status: 'active'
    };
    console.log('=== PRODUCT DATA PREPARED ===');
    console.log('productData:', JSON.stringify(productData, null, 2));

    try {
      console.log('=== API CALL START ===');
      console.log('Method:', editingProduct ? 'PUT' : 'POST');
      console.log('URL:', '/api/admin/products');
      
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      let response;
      if (editingProduct) {
        console.log('Editing product ID:', editingProduct.id);
        response = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...productData, id: editingProduct.id }),
          signal: controller.signal,
        });
      } else {
        console.log('Creating new product');
        response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
          signal: controller.signal,
        });
      }
      
      clearTimeout(timeoutId);

      console.log('=== API RESPONSE RECEIVED ===');
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));

      if (!response.ok || !data.success) {
        console.error('=== API FAILED ===');
        console.error('Error:', data.error);
        const errorMessage = data.error || 'Failed to save product';
        error(errorMessage);
        return; // Don't reset form on error, allow retry
      }

      console.log('=== API SUCCESS ===');
      console.log('Success message:', editingProduct ? 'Product updated successfully' : 'Product added successfully');
      success(editingProduct ? 'Product updated successfully' : 'Product added successfully');
      
      // Update store directly for real-time updates
      const { addProduct, updateProduct } = useProductStore.getState();
      if (editingProduct) {
        updateProduct(editingProduct.id, data.data);
      } else {
        addProduct(data.data);
      }
      
      resetForm();
      fetchProducts();
    } catch (err: any) {
      console.error('=== API CALL ERROR ===');
      console.error('Error:', err);
      
      if (err.name === 'AbortError') {
        error('Request timeout. Please try again.');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Failed to save product';
        error(errorMessage);
      }
    } finally {
      console.log('=== SUBMIT END ===');
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="p-8">
        <div className="mb-8 pb-6 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:bg-gray-50 mb-4"
                  onClick={() => window.location.href = '/admin'}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
                <h1 className="text-xl font-bold text-gray-900">Product Management</h1>
                <p className="text-sm text-gray-500">Manage your product inventory</p>
              </div>
              <Button
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400 font-semibold"
                onClick={handleAddProduct}
              >
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                Add Product
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Add/Edit Product Form */}
          {showAddForm && (
            <Card className="mb-6 border border-pink-100 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-pink-700">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Image Upload */}
                  <div>
                    <Label>Product Images (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed border-pink-100 rounded-lg p-6 bg-white">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="h-12 w-12 text-pink-700 mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop images here, or click to select
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          className="bg-pink-500 text-white hover:bg-pink-400 font-semibold"
                          onClick={triggerFileInput}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Choose Files
                            </>
                          )}
                        </Button>
                      </div>
                      {productImages.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          {productImages.map((image, index) => (
                            <div
                              key={index}
                              className="relative h-24 w-full bg-gray-100 rounded overflow-hidden flex items-center justify-center"
                            >
                              <Image
                                src={image}
                                alt={`Product ${index + 1}`}
                                fill
                                className="object-contain p-2"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder.png';
                                }}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 z-10"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand *</Label>
                      <Input
                        id="brand"
                        placeholder="e.g., Diarayao Outlet"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fabric">Fabric</Label>
                      <Input
                        id="fabric"
                        placeholder="e.g., Nida, Cotton, Chiffon"
                        value={formData.fabric}
                        onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-white border-pink-100">
                          <SelectValue
                            placeholder={isLoadingCategories ? 'Loading categories...' : 'Select a category'}
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-pink-100">
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (PKR) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="e.g., 8999"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="discountPrice">Discount Price (PKR)</Label>
                      <Input
                        id="discountPrice"
                        type="number"
                        placeholder="e.g., 7999"
                        value={formData.discountPrice}
                        onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="e.g., 25"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description">Description *</Label>
                      <textarea
                        id="description"
                        placeholder="Enter detailed product description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-pink-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  {/* Colors Section */}
                  <div>
                    <Label>Colors</Label>
                    <div className="mt-2 space-y-2">
                      {productColors.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder="Color name"
                            value={color.name}
                            onChange={(e) => updateColor(index, 'name', e.target.value)}
                            className="flex-1"
                          />
                          <input
                            type="color"
                            value={color.hexCode}
                            onChange={(e) => updateColor(index, 'hexCode', e.target.value)}
                            className="w-12 h-10 rounded cursor-pointer border border-gray-200"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeColor(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addColor}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                        Add Color
                      </Button>
                    </div>
                  </div>

                  {/* Sizes Section */}
                  <div>
                    <Label>Sizes</Label>
                    <div className="mt-2 space-y-2">
                      {productSizes.map((size, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder="Size (e.g., 52, 54, S, M)"
                            value={size.size}
                            onChange={(e) => updateSize(index, 'size', e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Stock"
                            value={size.stock}
                            onChange={(e) => updateSize(index, 'stock', e.target.value)}
                            className="w-24"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeSize(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addSize}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                        Add Size
                      </Button>
                    </div>
                  </div>

                  {/* Product Status */}
                  <div className="space-y-3">
                    <Label>Product Status</Label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-2 border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer accent-[#D4849C]" 
                          checked={statusTags.includes('new')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setStatusTags([...statusTags, 'new']);
                            } else {
                              setStatusTags(statusTags.filter(tag => tag !== 'new'));
                            }
                          }}
                        />
                        <span className="text-sm">New</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-2 border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer accent-[#D4849C]" 
                          checked={statusTags.includes('sale')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setStatusTags([...statusTags, 'sale']);
                            } else {
                              setStatusTags(statusTags.filter(tag => tag !== 'sale'));
                            }
                          }}
                        />
                        <span className="text-sm">Sale</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-2 border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer accent-[#D4849C]" 
                          checked={statusTags.includes('featured')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setStatusTags([...statusTags, 'featured']);
                            } else {
                              setStatusTags(statusTags.filter(tag => tag !== 'featured'));
                            }
                          }}
                        />
                        <span className="text-sm">Featured</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-2 border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer accent-[#D4849C]" 
                          checked={statusTags.includes('out-of-stock')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setStatusTags([...statusTags, 'out-of-stock']);
                            } else {
                              setStatusTags(statusTags.filter(tag => tag !== 'out-of-stock'));
                            }
                          }}
                        />
                        <span className="text-sm">Out of Stock</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="bg-pink-500 text-white hover:bg-pink-400 font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Search Bar */}
          <Card className="mb-6 border border-pink-100 bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products by name, brand, category, or description..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border border-emerald-100 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-emerald-700">
                All Products ({filteredProducts.length})
                {isLoadingProducts && <Loader2 className="inline ml-2 h-4 w-4 animate-spin" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingProducts ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No products found</p>
                  {searchQuery && <p className="text-sm mt-2">Try adjusting your search query</p>}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-medium">Product</th>
                          <th className="text-left p-4 font-medium">Category</th>
                          <th className="text-left p-4 font-medium">Price</th>
                          <th className="text-left p-4 font-medium">Stock</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedProducts.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="relative w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0 flex items-center justify-center bg-gray-100">
                                  {product.images && product.images.length > 0 ? (
                                    <Image
                                      src={product.images[0]}
                                      alt={product.name}
                                      fill
                                      className="object-contain p-1"
                                      sizes="48px"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">
                                      
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium truncate">{product.name}</p>
                                  <p className="text-sm text-muted-foreground truncate">{product.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm">{product.category}</td>
                            <td className="p-4">
                              <div>
                                <p className="font-medium">
                                  PKR {(product.discountPrice || product.price).toLocaleString()}
                                </p>
                                {product.discountPrice && (
                                  <p className="text-sm text-muted-foreground line-through">
                                    PKR {product.price.toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={
                                product.stock > 10
                                  ? 'text-emerald-700'
                                  : product.stock > 0
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }>
                                {product.stock}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1">
                                {product.statusTags?.includes('new') && <Badge className="bg-emerald-600">New</Badge>}
                                {product.statusTags?.includes('sale') && <Badge className="bg-red-600">Sale</Badge>}
                                {product.statusTags?.includes('featured') && <Badge className="bg-purple-600">Featured</Badge>}
                                {product.statusTags?.includes('out-of-stock') && <Badge className="bg-gray-600">Out of Stock</Badge>}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-emerald-100 hover:text-emerald-700"
                                  onClick={() => handleEditProduct(product.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:bg-red-500/20"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
                        {filteredProducts.length} products
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
