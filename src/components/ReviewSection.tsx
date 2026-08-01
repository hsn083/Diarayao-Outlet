"use client";
import { useState, useEffect } from 'react';
import { Star, ShieldCheck, ThumbsUp, ChevronDown, Pen, User, Check } from 'lucide-react';

export default function ReviewSection({ productId, currentUser, onReviewSubmit }: any) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());
  const [loadingHelpful, setLoadingHelpful] = useState<Set<string>>(new Set());

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
        setRatingDistribution(data.ratingDistribution);

        // Initialize helpful state based on currentUser
        if (currentUser) {
          const helpfulIds = data.reviews
            .filter((review: any) => 
              review.helpfulBy && 
              review.helpfulBy.some((id: any) => id.toString() === currentUser._id)
            )
            .map((review: any) => review._id);
          setHelpfulReviews(new Set(helpfulIds));
        } else {
          setHelpfulReviews(new Set());
        }
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId, currentUser]);

  const handleSubmit = async () => {
    setError('');
    if (!customerName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a review comment');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          customerName,
          customerEmail,
          rating,
          comment,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setCustomerName('');
        setCustomerEmail('');
        setRating(0);
        setComment('');
        setShowForm(false);
        await fetchReviews(); // Refresh immediately
        if (onReviewSubmit) onReviewSubmit(); // Notify parent to refresh product data
      } else {
        setError(data.error || 'Failed to submit review');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Submit review error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    // Check if user is logged in
    if (!currentUser) {
      setError('Please login to mark reviews as helpful');
      return;
    }

    // Set loading state
    setLoadingHelpful(prev => new Set([...prev, reviewId]));

    try {
      const res = await fetch('/api/reviews/helpful', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId,
        }),
      });
      const data = await res.json();

      if (data.success) {
        // Update local state based on toggle result
        if (data.isHelpful) {
          setHelpfulReviews(prev => new Set([...prev, reviewId]));
        } else {
          setHelpfulReviews(prev => {
            const newSet = new Set(prev);
            newSet.delete(reviewId);
            return newSet;
          });
        }

        setReviews(prev => 
          prev.map(review => 
            review._id === reviewId 
              ? { ...review, helpfulCount: data.helpfulCount, helpful: data.helpful, likes: data.likesCount }
              : review
          )
        );
      } else {
        setError(data.error || 'Failed to update helpful status');
      }
    } catch (err) {
      console.error('Mark helpful error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      // Remove loading state
      setLoadingHelpful(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  const getSortedReviews = () => {
    const sorted = [...reviews];
    switch (sortBy) {
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'recent':
      default:
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const sortedReviews = getSortedReviews();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            
            {/* Overall Rating */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">Based on {totalReviews} reviews</div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3 mb-6">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-8">{item.stars}★</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-20 text-right">{item.count} ({item.percentage}%)</span>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-250 hover:scale-105 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Pen className="w-5 h-5" />
              Write a Review
            </button>

            {/* Verified Purchase Note */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Verified Purchase Reviews</span>
            </div>
          </div>
        </div>

        {/* Right Column - Reviews List */}
        <div className="lg:col-span-2">
          {/* Sorting Dropdown */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Reviews ({totalReviews})</h3>
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-pink-300 transition-colors text-sm font-medium text-gray-700"
              >
                {sortBy === 'recent' ? 'Most Recent' : sortBy === 'highest' ? 'Highest Rating' : 'Lowest Rating'}
                <ChevronDown className={`w-4 h-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => { setSortBy('recent'); setSortDropdownOpen(false); }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-pink-50 transition-colors"
                  >
                    Most Recent
                  </button>
                  <button
                    onClick={() => { setSortBy('highest'); setSortDropdownOpen(false); }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-pink-50 transition-colors"
                  >
                    Highest Rating
                  </button>
                  <button
                    onClick={() => { setSortBy('lowest'); setSortDropdownOpen(false); }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-pink-50 transition-colors"
                  >
                    Lowest Rating
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Review Form */}
          {showForm && (
            <div className="mb-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h4>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your Name"
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
              />
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
              />
              <div className="flex gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    type="button" 
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full border border-gray-200 rounded-xl p-3 mb-3 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all resize-none"
                rows={4}
              />
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-250 disabled:opacity-50 hover:scale-105"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {sortedReviews.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <p className="text-gray-500">No Reviews Yet. Be the first to review!</p>
              </div>
            ) : (
              sortedReviews.map((review: any, index) => (
                <div 
                  key={review._id} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-pink-200 transition-all duration-250 hover:-translate-y-1"
                  style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* User Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                        {getInitials(review.customerName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{review.customerName}</span>
                          <span className="px-2 py-0.5 bg-pink-100 text-pink-600 text-xs font-medium rounded-full">Verified Buyer</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{formatDate(review.createdAt)}</span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                  
                  <button 
                    onClick={() => handleHelpful(review._id)}
                    disabled={loadingHelpful.has(review._id)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      helpfulReviews.has(review._id) 
                        ? 'text-pink-600 cursor-default' 
                        : 'text-gray-500 hover:text-pink-600 cursor-pointer'
                    } ${loadingHelpful.has(review._id) ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {loadingHelpful.has(review._id) ? (
                      <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                    ) : helpfulReviews.has(review._id) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ThumbsUp className="w-4 h-4" />
                    )}
                    <span>
                      {loadingHelpful.has(review._id) 
                        ? 'Loading...' 
                        : helpfulReviews.has(review._id) 
                          ? 'Marked as helpful' 
                          : 'Helpful'
                      }
                    </span>
                    {review.helpfulCount > 0 && (
                      <span className="text-gray-400">({review.helpfulCount})</span>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
