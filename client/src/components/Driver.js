
import React, { useState, useEffect } from 'react';
import './Driver.css';

function Driver() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/driver');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="driver-container">
      {data ? (
        <div>
          <h2>Driver Data:</h2>
          {data.map((driver, index) => (
            <div key={index} className="driver-item">
              <label>First Name:</label>
              <span>{driver.first_name}</span>

              <label>Last Name:</label>
              <span>{driver.last_name}</span>

              <label>Location:</label>
              <span>{driver.location}</span>

              <label>Vehicle Type:</label>
              <span>{driver.vehicle_type}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-message">Loading data...</p>
      )}

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default Driver;
