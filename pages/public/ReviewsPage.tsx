
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import type { Review } from '../../types';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex text-brand-gold">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ))}
  </div>
);


const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-violet text-white flex items-center justify-center font-bold text-xl mr-4">
                {review.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-brand-green-dark">{review.author}</h3>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="text-brand-green-dark italic">"{review.text}"</p>
            <p className="text-right text-sm text-gray-500 mt-4">{new Date(review.date).toLocaleDateString()}</p>
        </div>
    );
};

export const ReviewsPage: React.FC = () => {
    const { state } = useAppContext();

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-serif font-bold text-center text-brand-green-dark mb-12">Lo que Nuestra Comunidad Dice</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {state.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
            </div>
        </div>
    );
};