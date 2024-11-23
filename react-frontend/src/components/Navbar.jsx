import React from 'react';
import '../style/Navbar.css';
import { FaCoins } from 'react-icons/fa';

const Navbar = ({ points = 1000 }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        RoundUp
      </div>
      <div className="navbar-points">
        <FaCoins className="coins-icon" />
        <span>{points.toLocaleString()} pts</span>
      </div>
    </nav>
  );
};

export default Navbar; 