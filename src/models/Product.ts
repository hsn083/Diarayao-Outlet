import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IColor {
  name: string;
  hexCode: string;
}

export interface ISize {
  size: string;
  stock: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand?: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  thumbnail?: string;
  hoverImage?: string;
  sizes?: ISize[];
  colors?: IColor[];
  fabric?: string;
  stock: number;
  lowStockThreshold?: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  newArrival: boolean;
  isBestSeller: boolean;
  status: 'active' | 'inactive' | 'draft';
  statusTags?: string[]; // New array field for multiple status tags: 'new', 'sale', 'featured', 'out-of-stock'
  warranty?: string;
  tags?: string[];
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
      default: function() {
        return `PRD-${Date.now().toString(36).toUpperCase()}`;
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
    },
    brand: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    images: [
      {
        type: String,
      },
    ],
    thumbnail: {
      type: String,
    },
    hoverImage: {
      type: String,
    },
    sizes: [
      {
        size: { type: String, required: true },
        stock: { type: Number, default: 0, min: 0 },
      },
    ],
    colors: [
      {
        name: { type: String, required: true },
        hexCode: { type: String, required: true },
      },
    ],
    fabric: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: [0, 'Low stock threshold cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, 'Review count cannot be negative'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active',
    },
    statusTags: [
      {
        type: String,
        enum: ['new', 'sale', 'featured', 'out-of-stock'],
      },
    ],
    warranty: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    features: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ isBestSeller: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
