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
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ name, role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Admin user with this name already exists' 
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
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

    console.log('[ADMIN-SETUP] MongoDB admin account created:', {
      id: adminUser._id,
      email: adminUser.email,
      name: adminUser.name,
    });

    return NextResponse.json({
      success: true,
      message: 'MongoDB admin account created successfully',
      admin: {
        id: adminUser._id.toString(),
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('[ADMIN-SETUP] Error creating MongoDB admin:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create MongoDB admin account' },
      { status: 500 }
    );
  }
}

// GET - Check if admin exists
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const adminCount = await User.countDocuments({ role: 'admin' });
    const admins = await User.find({ role: 'admin' }).select('-password');

    return NextResponse.json({
      success: true,
      adminExists: adminCount > 0,
      adminCount,
      admins,
    });
  } catch (error: any) {
    console.error('[ADMIN-SETUP] Error checking admin status:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check admin status' },
      { status: 500 }
    );
  }
}
