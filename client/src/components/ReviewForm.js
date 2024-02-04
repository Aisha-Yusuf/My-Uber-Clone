
import React, { useState } from 'react';

const ReviewForm = ({ customer_id, driver_id, onReviewSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5555/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          customer_id,
          driver_id,
          rating: parseInt(rating),
        }),
      });

      if (response.ok) {
        const newReview = await response.json();
        onReviewSubmit(newReview); 
        setComment('');
        setRating('');
      } else {
    
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('An error occurred during review submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <label>
        Rating:
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
