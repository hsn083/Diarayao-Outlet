import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  customer?: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  rating: number;
  title?: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  verified: boolean;
  verifiedPurchase?: boolean;
  helpfulCount: number;
  helpful: number;
  helpfulBy: mongoose.Types.ObjectId[];
  helpfulUsers: string[];
  likes: number;
  unhelpfulCount?: number;
  unhelpfulUsers?: string[];
  images?: string[];
  video?: string;
  variant?: {
    color?: string;
    size?: string;
    material?: string;
  };
  sellerReply?: {
    reply: string;
    date: string;
    sellerName: string;
  };
  reported?: boolean;
  reportReason?: string;
  reports?: Array<{
    userId: string;
    reason: string;
    date: string;
  }>;
  sessionId?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: String,
    comment: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
    verified: { type: Boolean, default: false },
    verifiedPurchase: { type: Boolean, default: false },
    helpfulCount: { type: Number, default: 0 },
    helpful: { type: Number, default: 0 },
    helpfulBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    helpfulUsers: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    unhelpfulCount: { type: Number, default: 0 },
    unhelpfulUsers: { type: [String], default: [] },
    images: [String],
    video: String,
    variant: {
      color: String,
      size: String,
      material: String,
    },
    sellerReply: {
      reply: String,
      date: String,
      sellerName: String,
    },
    reported: { type: Boolean, default: false },
    reportReason: String,
    reports: [{
      userId: String,
      reason: String,
      date: String,
    }],
    sessionId: String,
    avatar: String,
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, status: 1 });
ReviewSchema.index({ product: 1, customerEmail: 1 });

// Development mein hot-reload cache clear karo
if (process.env.NODE_ENV === 'development' && mongoose.models.Review) {
  delete mongoose.models.Review;
}

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
export default Review;
