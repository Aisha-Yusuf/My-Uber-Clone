import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header'; 
import LoginLogout from './components/LoginLogout'; 
import Register from './components/Register'; 
import Booking from './components/Booking'; 

function Home() {
  return <h2>Home</h2>;
}

function App() {
  const [username, setUsername] = useState('Guest');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/booking">Booking</Link>
            </li>
          </ul>
        </nav>

        <Header username={username} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginLogout setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
