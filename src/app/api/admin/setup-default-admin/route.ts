import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, name } = body;

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'An admin account already exists. Cannot create another default admin.' 
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'A user with this email already exists' },
        { status: 400 }
      );
    }

    // Create admin user
    const adminUser = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin',
      isEmailVerified: true,
      isActive: true,
      isBlocked: false,
    });

    console.log('[ADMIN-SETUP] Default admin account created:', {
      id: adminUser._id,
      email: adminUser.email,
      name: adminUser.name,
    });

    return NextResponse.json({
      success: true,
      message: 'Default admin account created successfully',
      admin: {
        id: adminUser._id.toString(),
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('[ADMIN-SETUP] Error creating default admin:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create default admin account' },
      { status: 500 }
    );
  }
}

// GET - Check if admin exists
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const adminCount = await User.countDocuments({ role: 'admin' });

    return NextResponse.json({
      success: true,
      adminExists: adminCount > 0,
      adminCount,
    });
  } catch (error: any) {
    console.error('[ADMIN-SETUP] Error checking admin status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check admin status' },
      { status: 500 }
    );
  }
}
