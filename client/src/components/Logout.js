import React from 'react';

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    localStorage.getItem('access_token') ? (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    ) : null
  );
}

export default Logout;

