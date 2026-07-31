import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Security configurations
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Rate limiting (simple in-memory)
const uploadAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_UPLOADS_PER_MINUTE = 10;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = uploadAttempts.get(ip);

  if (!attempts || now > attempts.resetTime) {
    uploadAttempts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (attempts.count >= MAX_UPLOADS_PER_MINUTE) {
    return false;
  }

  attempts.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // DEBUG: Log configuration status (without exposing secrets)
    console.log('[DEBUG] Cloudinary Config Check:');
    console.log('[DEBUG] Cloud Name exists:', !!process.env.CLOUDINARY_CLOUD_NAME);
    console.log('[DEBUG] Cloud Name length:', process.env.CLOUDINARY_CLOUD_NAME?.length || 0);
    console.log('[DEBUG] API Key exists:', !!process.env.CLOUDINARY_API_KEY);
    console.log('[DEBUG] API Key length:', process.env.CLOUDINARY_API_KEY?.length || 0);
    console.log('[DEBUG] API Secret exists:', !!process.env.CLOUDINARY_API_SECRET);
    console.log('[DEBUG] API Secret length:', process.env.CLOUDINARY_API_SECRET?.length || 0);

    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary is not configured. Please set environment variables.' },
        { status: 500 }
      );
    }

    // DEBUG: Log Cloudinary config after initialization
    console.log('[DEBUG] Cloudinary config initialized');
    console.log('[DEBUG] Cloud name in config:', cloudinary.config().cloud_name);

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many upload attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const orderId = formData.get('orderId') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed types: JPG, JPEG, PNG, WEBP' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` },
        { status: 400 }
      );
    }

    // Validate file content (basic check for empty files)
    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'File is empty' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // DEBUG: Log before upload
    console.log('[DEBUG] Starting Cloudinary upload...');
    console.log('[DEBUG] Folder: payment-screenshots');
    console.log('[DEBUG] Order ID:', orderId);
    console.log('[DEBUG] Buffer size:', buffer.length);

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'payment-screenshots',
          public_id: orderId ? `payment-${orderId}-${Date.now()}` : `payment-${Date.now()}`,
          resource_type: 'image',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
          max_file_size: MAX_FILE_SIZE,
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('[DEBUG] Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('[DEBUG] Cloudinary upload success:', result?.public_id);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log(`Payment screenshot uploaded to Cloudinary: ${uploadResult.public_id} for order: ${orderId}`);

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    });
  } catch (error: any) {
    console.error('[DEBUG] Error uploading payment screenshot to Cloudinary:');
    console.error('[DEBUG] Error message:', error?.message);
    console.error('[DEBUG] Error code:', error?.http_code || error?.code);
    console.error('[DEBUG] Full error object:', JSON.stringify(error, null, 2));
    console.error('[DEBUG] Stack trace:', error?.stack);

    // Extract more detailed error information
    const errorMessage = error?.message || 'Failed to upload file to Cloudinary';
    const errorCode = error?.http_code || error?.code || 500;
    const cloudinaryError = error?.error?.message || error?.error?.description || null;

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        code: errorCode,
        cloudinaryError: cloudinaryError,
        details: {
          httpCode: error?.http_code,
          cloudinaryCode: error?.code,
          message: error?.message
        }
      },
      { status: 500 }
    );
  }
}
