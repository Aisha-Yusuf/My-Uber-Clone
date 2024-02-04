
import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

const ParentComponent = () => {
  const [customerID, setCustomerID] = useState(1);  
  const [driverID, setDriverID] = useState(1);     

  const handleReviewSubmit = (newReview) => {
    
    console.log('Review submitted:', newReview);
  };

  return (
    <div>
      <h2>Review Form</h2>
      <ReviewForm
        customer_id={customerID}
        driver_id={driverID}
        onReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default ParentComponent;
