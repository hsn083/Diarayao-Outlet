import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/models/Review';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Fetch reviews for a product
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const reviews = await Review.find({ product: productId, status: 'approved' })
      .sort({ createdAt: -1 })
      .lean();

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((r) => r.rating === stars).length;
      return { stars, count, percentage: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0 };
    });

    return NextResponse.json({
      success: true,
      reviews,
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      ratingDistribution,
    });
  } catch (error: any) {
    console.error('[REVIEWS GET] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { productId, customerName, customerEmail, rating, title, comment } = body;

    if (!productId || !customerName || !customerEmail || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for duplicate review by email
    const existingReview = await Review.findOne({
      product: productId,
      customerEmail
    });
    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this product' },
        { status: 400 }
      );
    }

    const newReview = await Review.create({
      product: productId,
      customerName,
      customerEmail,
      rating,
      title,
      comment,
      status: 'approved',
    });

    // Update Product rating and review count
    const allReviews = await Review.find({ product: productId, status: 'approved' });
    const totalReviews = allReviews.length;
    const averageRating = totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    console.log('[REVIEWS POST] Updating product rating:', {
      productId,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        rating: Number(averageRating.toFixed(1)),
        reviewCount: totalReviews,
      },
      { new: true }
    );

    console.log('[REVIEWS POST] Updated product:', updatedProduct?.rating, updatedProduct?.reviewCount);

    return NextResponse.json({ success: true, review: newReview, product: updatedProduct });
  } catch (error: any) {
    console.error('[REVIEWS POST] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT - Update review (e.g., mark as verified purchase)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, isVerifiedPurchase } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (typeof isVerifiedPurchase === 'boolean') {
      updateData.verifiedPurchase = isVerifiedPurchase;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedReview) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, review: updatedReview });
  } catch (error: any) {
    console.error('[REVIEWS PUT] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
