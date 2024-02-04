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
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import ReviewForm from './components/ReviewForm';
import ParentComponent from './components/ParentComponent'

function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/driver">Driver</Link>
          </li>
        </ul>
      </nav>

      <Header />
      <Logout />
      <Booking />
      <ReviewForm customer_id={1} driver_id={1} />
      <ParentComponent />
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
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/driver" element={<Driver />} /> 
      </Routes>
    </Router>
  );
}

export default App;
