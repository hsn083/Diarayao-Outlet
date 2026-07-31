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

export async function POST(request: NextRequest) {
  try {
    console.log('Multiple Upload API called');
    const formData = await request.formData();
    const uploadType = (formData.get('uploadType') as 'products' | 'categories') || 'products';

    console.log('Upload type:', uploadType);

    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary is not configured. Please set environment variables.' },
        { status: 500 }
      );
    }

    // Get all files from formData
    const files: File[] = [];
    formData.forEach((value, key) => {
      if (key === 'files' && value instanceof File) {
        files.push(value);
      }
    });

    if (files.length === 0) {
      console.error('No files provided');
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    console.log(`Received ${files.length} files`);

    // Validate file count (max 8 images)
    const maxImages = 8;
    if (files.length > maxImages) {
      return NextResponse.json(
        { success: false, error: `Maximum ${maxImages} images allowed` },
        { status: 400 }
      );
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: `Invalid file type: ${file.name}. Only images are allowed.` },
          { status: 400 }
        );
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} exceeds 10MB limit` },
          { status: 400 }
        );
      }
    }

    // Upload all files to Cloudinary
    const folder = uploadType === 'products' ? 'products' : 'categories';
    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
            max_file_size: maxSize,
            transformation: [
              { width: 800, height: 800, crop: 'limit', quality: 'auto:good' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Generate thumbnail URLs for products
    const results = uploadResults.map((result) => {
      let thumbnailUrl: string | undefined;
      if (uploadType === 'products') {
        thumbnailUrl = cloudinary.url(result.public_id, {
          transformation: [
            { width: 300, height: 300, crop: 'fill', quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        });
      }

      return {
        optimizedPath: result.secure_url,
        thumbnailPath: thumbnailUrl,
        publicId: result.public_id,
      };
    });

    console.log(`Successfully uploaded ${results.length} images`);

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to upload images' },
      { status: 500 }
    );
  }
}
