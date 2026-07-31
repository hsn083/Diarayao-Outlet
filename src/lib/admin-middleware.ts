import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

/**
 * Verify admin authentication and authorization
 * Checks if user is authenticated and has admin role
 */
export async function verifyAdminAuth(request: NextRequest): Promise<{
  success: boolean;
  user?: any;
  error?: string;
}> {
  try {
    const sessionToken = request.cookies.get('customer_session')?.value;

    if (!sessionToken) {
      return { success: false, error: 'Not authenticated' };
    }

    await connectDB();

    const user = await User.findById(sessionToken);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Check if user is active
    if (!user.isActive) {
      return { success: false, error: 'Account is inactive' };
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return { success: false, error: 'Account is blocked' };
    }

    // Check if user is deleted
    if (user.isDeleted) {
      return { success: false, error: 'Account not found' };
    }

    // Check if user has admin role
    if (user.role !== 'admin') {
      return { success: false, error: 'Unauthorized - Admin access required' };
    }

    return { success: true, user };
  } catch (error: any) {
    console.error('[ADMIN-MIDDLEWARE] Auth verification error:', error);
    return { success: false, error: 'Authentication verification failed' };
  }
}

/**
 * Middleware for API routes - returns 403 if not admin
 */
export async function adminApiMiddleware(request: NextRequest) {
  const authResult = await verifyAdminAuth(request);

  if (!authResult.success) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: 403 }
    );
  }

  return null; // Allow request to proceed
}

/**
 * Get current admin user from request
 */
export async function getCurrentAdmin(request: NextRequest) {
  const authResult = await verifyAdminAuth(request);
  return authResult.success ? authResult.user : null;
}
