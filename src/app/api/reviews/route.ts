import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/models/Review';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Fetch reviews for a product or all reviews (admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const all = searchParams.get('all') === 'true';

    let reviews;
    if (all) {
      // Admin: fetch all reviews regardless of status
      reviews = await Review.find({})
        .sort({ createdAt: -1 })
        .populate('product', 'name slug images')
        .lean();
    } else {
      // Customer: fetch only approved reviews for a specific product
      if (!productId) {
        return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
      }
      reviews = await Review.find({ product: productId, status: 'approved' })
        .sort({ createdAt: -1 })
        .lean();
    }

    // Transform reviews to include id field and product info
    const transformedReviews = reviews.map((review: any) => ({
      id: review._id.toString(),
      productId: review.product?._id?.toString() || review.product?.toString(),
      customerName: review.customerName,
      customerEmail: review.customerEmail,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      status: review.status,
      verifiedPurchase: review.verifiedPurchase,
      isVerifiedPurchase: review.verifiedPurchase || review.verified,
      likes: review.likes || 0,
      helpful: review.helpful || review.helpfulCount || 0,
      helpfulCount: review.helpfulCount || review.helpful || 0,
      sellerReply: review.sellerReply,
      images: review.images,
      video: review.video,
      variant: review.variant,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      // Include populated product info
      product: review.product,
    }));

    const totalReviews = transformedReviews.length;
    const averageRating = totalReviews > 0
      ? transformedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
      const count = transformedReviews.filter((r) => r.rating === stars).length;
      return { stars, count, percentage: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0 };
    });

    return NextResponse.json({
      success: true,
      reviews: transformedReviews,
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

// PUT - Update review (status, verified purchase, etc.)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, status, isVerifiedPurchase } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      updateData.status = status;
    }
    if (typeof isVerifiedPurchase === 'boolean') {
      updateData.verifiedPurchase = isVerifiedPurchase;
      updateData.verified = isVerifiedPurchase;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('product', 'name slug images');

    if (!updatedReview) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // Update product rating if status changed to approved
    if (status === 'approved') {
      const allApprovedReviews = await Review.find({ 
        product: updatedReview.product._id, 
        status: 'approved' 
      });
      const totalReviews = allApprovedReviews.length;
      const averageRating = totalReviews > 0
        ? allApprovedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

      await Product.findByIdAndUpdate(
        updatedReview.product._id,
        {
          rating: Number(averageRating.toFixed(1)),
          reviewCount: totalReviews,
        },
        { new: true }
      );
    }

    // Transform response
    const transformedReview = {
      id: updatedReview._id.toString(),
      productId: updatedReview.product?._id?.toString() || updatedReview.product?.toString(),
      customerName: updatedReview.customerName,
      customerEmail: updatedReview.customerEmail,
      rating: updatedReview.rating,
      title: updatedReview.title,
      comment: updatedReview.comment,
      status: updatedReview.status,
      verifiedPurchase: updatedReview.verifiedPurchase,
      isVerifiedPurchase: updatedReview.verifiedPurchase || updatedReview.verified,
      likes: updatedReview.likes || 0,
      helpful: updatedReview.helpful || updatedReview.helpfulCount || 0,
      helpfulCount: updatedReview.helpfulCount || updatedReview.helpful || 0,
      sellerReply: updatedReview.sellerReply,
      images: updatedReview.images,
      video: updatedReview.video,
      variant: updatedReview.variant,
      createdAt: updatedReview.createdAt,
      updatedAt: updatedReview.updatedAt,
      product: updatedReview.product,
    };

    return NextResponse.json({ success: true, review: transformedReview });
  } catch (error: any) {
    console.error('[REVIEWS PUT] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE - Delete a review
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // Store product ID before deletion to update product rating
    const productId = review.product;

    await Review.findByIdAndDelete(id);

    // Update product rating after deletion
    const allApprovedReviews = await Review.find({ 
      product: productId, 
      status: 'approved' 
    });
    const totalReviews = allApprovedReviews.length;
    const averageRating = totalReviews > 0
      ? allApprovedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    await Product.findByIdAndUpdate(
      productId,
      {
        rating: Number(averageRating.toFixed(1)),
        reviewCount: totalReviews,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error: any) {
    console.error('[REVIEWS DELETE] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
