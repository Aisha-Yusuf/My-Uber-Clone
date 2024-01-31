import React, { useState } from 'react';

function Review() {
  const [comment, setComment] = useState('');
  const [customerId, setCustomerId] = useState(1);  // Assuming a default customer ID
  const [driverId, setDriverId] = useState(1);    // Assuming a default driver ID
  const [rating, setRating] = useState(5);       // Assuming a default rating

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          customer_id: customerId,
          driver_id: driverId,
          rating,
        }),
      });

      if (response.ok) {
        console.log('Review submitted successfully');
        // You may want to reset the form or take other actions upon successful submission
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error during review submission:', error);
    }
  };

  return (
    <div>
      <h2>Review</h2>
      <label>Comment:</label>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      <br />
      <label>Customer ID:</label>
      <input type="number" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
      <br />
      <label>Driver ID:</label>
      <input type="number" value={driverId} onChange={(e) => setDriverId(e.target.value)} />
      <br />
      <label>Rating:</label>
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      <br />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
}

export default Review;
