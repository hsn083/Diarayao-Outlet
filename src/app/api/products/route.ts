import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Review from '@/models/Review';

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Fetch all products with optional search and filter
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured') === 'true';
    const isNew = searchParams.get('new') === 'true';
    const bestSellers = searchParams.get('bestseller') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '1000');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build query
    const query: any = { status: 'active' };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    if (featured) {
      query.isFeatured = true;
    }

    if (isNew) {
      query.newArrival = true;
    }

    if (bestSellers) {
      query.isBestSeller = true;
    }

    // Build sort options
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    // Fetch live rating data for all products
    const productIds = products.map(p => p._id);
    const reviews = await Review.find({ product: { $in: productIds }, status: 'approved' });

    // Calculate rating per product
    const ratingMap = new Map();
    reviews.forEach(review => {
      const productId = review.product.toString();
      if (!ratingMap.has(productId)) {
        ratingMap.set(productId, { totalRating: 0, count: 0 });
      }
      const data = ratingMap.get(productId);
      data.totalRating += review.rating;
      data.count++;
    });

    // Transform products to match frontend type expectations
    const transformedProducts = products.map(product => {
      const productObj = product.toObject();
      const category = productObj.category as any;
      const productId = product._id.toString();
      const ratingData = ratingMap.get(productId) || { totalRating: 0, count: 0 };
      const averageRating = ratingData.count > 0 ? ratingData.totalRating / ratingData.count : 0;

      return {
        ...productObj,
        id: product._id.toString(),
        categoryId: category?._id?.toString() || category?.toString() || '',
        category: category?.name || '',
        rating: averageRating,
        reviews: ratingData.count,
        reviewCount: ratingData.count,
        stockQuantity: product.stock,
        stockStatus: product.stock > 10 ? 'in_stock' : product.stock > 0 ? 'low_stock' : 'out_of_stock',
        specifications: {},
        features: [],
        hoverImage: product.hoverImage,
      };
    });

    return NextResponse.json({
      success: true,
      products: transformedProducts,
      count: transformedProducts.length,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'category', 'price', 'stock', 'description'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await Category.findById(body.category);
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Generate slug
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }

    // Create new product
    
    const newProduct = await Product.create({
      name: body.name,
      slug,
      sku: body.sku,
      description: body.description,
      price: Number(body.price),
      discountPrice: body.discountPrice ? Number(body.discountPrice) : undefined,
      category: body.category,
      brand: body.brand,
      stock: Number(body.stock),
      lowStockThreshold: body.lowStockThreshold || 10,
      images: body.images || [],
      thumbnail: body.thumbnail,
      sizes: body.sizes || [],
      colors: body.colors || [],
      fabric: body.fabric,
      warranty: body.warranty,
      tags: body.tags || [],
      isFeatured: body.isFeatured || false,
      newArrival: body.isNew || false,
      isBestSeller: body.isBestSeller || false,
      status: body.status || 'active',
    });

    // Update category product count
    await Category.findByIdAndUpdate(body.category, {
      $inc: { productCount: 1 }
    });

    // Transform product to match frontend type expectations
    const transformedProduct = {
      ...newProduct.toObject(),
      id: newProduct._id.toString(),
      categoryId: newProduct.category?.toString() || '',
      category: category.name || '',
      reviews: newProduct.reviewCount || 0,
      reviewCount: newProduct.reviewCount || 0,
      stockQuantity: newProduct.stock,
      stockStatus: newProduct.stock > 10 ? 'in_stock' : newProduct.stock > 0 ? 'low_stock' : 'out_of_stock',
      specifications: {},
      features: [],
    };

    return NextResponse.json({
      success: true,
      data: transformedProduct,
      product: transformedProduct,
      message: 'Product created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
