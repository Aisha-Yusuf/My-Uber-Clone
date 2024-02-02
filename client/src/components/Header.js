import React from 'react';
import logo from '../logo.png'; 

function Header({ username }) {
  return (
    <header className="App-header">
      <img src={logo} alt="Logo" className="App-logo"/>
      <h1>Welcome to Uber-taxified !!!</h1>
    </header>
  );
}

export default Header;
