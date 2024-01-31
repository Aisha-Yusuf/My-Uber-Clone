import React, { useState } from 'react';
import Review from './Review';


function Booking() {
  const [rideId, setRideId] = useState('');

  const handleBooking = async () => {
    try {
      const response = await fetch('http://localhost:5555/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ /* Add necessary data for booking */ })
      });

      if (response.ok) {
        console.log('Ride booked successfully');
        // Set the rideId in state or handle it as needed
        // setRideId(/* extract rideId from the response if applicable */);
      } else {
        console.error('Failed to book ride');
      }
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await fetch(`http://localhost:5555/cancel/${rideId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        console.log('Ride cancelled successfully');
      } else {
        console.error('Failed to cancel ride');
      }
    } catch (error) {
      console.error('Error during cancellation:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(`http://localhost:5555/pay/${rideId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        console.log('Payment processed successfully');
      } else {
        console.error('Failed to process payment');
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
    }
  };

  const handleRating = async () => {
    try {
      const response = await fetch(`http://localhost:5555/rate/${rideId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ rating: 5 }) // Replace with actual rating data
      });

      if (response.ok) {
        console.log('Rating submitted successfully');
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error during rating submission:', error);
    }
  };

  return (
    <div>
      <button onClick={handleBooking}>Book a Ride</button>
      <button onClick={handleCancel}>Cancel Ride</button>
      <button onClick={handlePayment}>Pay for Ride</button>
      <button onClick={handleRating}>Rate Driver</button>
    </div>
  );
}

export default Booking;
