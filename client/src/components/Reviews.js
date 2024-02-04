 import React, { useState, useEffect } from 'react';


function Review() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/review');
        if (response.ok) {
          const result = await response.json();
          setReviews(result);
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-container">
      {reviews ? (
        <div>
          <h2>Customer Reviews:</h2>
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <label>Customer Name:</label>
              <span>{review.customer_name}</span>

              <label>Rating:</label>
              <span>{review.rating}</span>

              <label>Comment:</label>
              <span>{review.comment}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-message">Loading reviews...</p>
      )}

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default Review;
