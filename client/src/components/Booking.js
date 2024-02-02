import React, { useState } from 'react';

function Booking() {
  const [ride, setRide] = useState(null);
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  const handleBooking = async () => {
    const location = prompt('Where are you?');
    const destination = prompt('Where do you want to go?');

    if (!location || !destination) {
      alert('Please provide both location and destination.');
      return;
    }

    const response = await new Promise(resolve => setTimeout(() => resolve({
      id: Date.now(),
      location,
      destination,
      price: Math.floor(Math.random() * 100) 
    }), 2000));

    setRide(response);
    setPrice(response.price);

    alert(`Ride booked! The price is ${response.price}`);
  };

  const handleCancel = async () => {
    if (!ride) {
      alert('No ride to cancel.');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    setRide(null);
    setPrice(null);

    alert('Ride cancelled successfully');
  };

  const handlePayment = async () => {
    if (!ride) {
      alert('No ride to pay for.');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Payment processed successfully');
  };

  const handleRating = async () => {
    const rating = prompt('Please enter a rating (1-5)');
    const comment = prompt('Please enter a comment');

    if (!rating || !comment) {
      alert('Please provide both rating and comment.');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    setRating(rating);
    setComment(comment);

    alert('Your rating and comment have been submitted successfully');
  };

  return (
    <div>
      {!ride ? (
        <button onClick={handleBooking}>Book a Ride</button>
      ) : (
        <>
          <button onClick={handleCancel}>Cancel Ride</button>
          <button onClick={handlePayment}>Pay for Ride</button>
          <button onClick={handleRating}>Rate Driver</button>
          <p>Price: {price}</p>
          {rating && <p>Rating: {rating}</p>}
          {comment && <p>Comment: {comment}</p>}
        </>
      )}
    </div>
  );
}

export default Booking;
