import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Booking from './components/Booking';
import Driver from './components/Driver';
import About from './components/About';

function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/driver">View All Drivers</Link>
          </li>
        </ul>
      </nav>

      <Header />
      <Logout />
      <Booking />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
    </Router>
  );
}

export default App;
