import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/models/Review';
import { cookies } from 'next/headers';
import User from '@/models/User';
import mongoose from 'mongoose';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// POST - Toggle review as helpful (add/remove)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { reviewId } = body;

    if (!reviewId) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      );
    }

    // Check if user is logged in
    const sessionToken = cookies().get('customer_session')?.value;
    let userId = null;

    if (sessionToken) {
      try {
        await connectDB();
        const user = await User.findById(sessionToken);
        if (user && user.isActive && !user.isBlocked && !user.isDeleted) {
          userId = user._id;
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Please login to mark reviews as helpful' },
        { status: 401 }
      );
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    // Initialize helpfulBy array if it doesn't exist
    if (!review.helpfulBy) {
      review.helpfulBy = [];
    }

    // Check if user already marked this review as helpful
    const alreadyHelpful = review.helpfulBy.some((id: any) => id.toString() === userId.toString());

    if (alreadyHelpful) {
      // Remove user from helpfulBy (toggle off)
      review.helpfulBy = review.helpfulBy.filter((id: any) => id.toString() !== userId.toString());
      review.helpful = Math.max(0, (review.helpful || 0) - 1);
      review.helpfulCount = Math.max(0, (review.helpfulCount || 0) - 1);
      review.likes = Math.max(0, (review.likes || 0) - 1);
    } else {
      // Add user to helpfulBy (toggle on)
      review.helpfulBy.push(userId);
      review.helpful = (review.helpful || 0) + 1;
      review.helpfulCount = (review.helpfulCount || 0) + 1;
      review.likes = (review.likes || 0) + 1;
    }

    review.updatedAt = new Date();
    await review.save();

    return NextResponse.json({
      success: true,
      message: alreadyHelpful ? 'Removed from helpful' : 'Marked as helpful',
      helpfulCount: review.helpfulCount,
      helpful: review.helpful,
      likesCount: review.likes,
      isHelpful: !alreadyHelpful,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error: any) {
    console.error('Error toggling review helpful:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to toggle review helpful' },
      { status: 500 }
    );
  }
}
