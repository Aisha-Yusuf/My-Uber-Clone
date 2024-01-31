import React from 'react';
//import logo from './src/logo.png'; // replace with your logo path

function Header({ username }) {
  return (
    <header>
      {/* <img src={logo} alt="Logo" /> */}
      <h1>Welcome, {username}</h1>
    </header>
  );
}

export default Header;