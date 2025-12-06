import React from 'react';
import './Navbar.css';
import new_logo from '../../assets/new_logo.png';
import navProfile2 from '../../assets/profile_img_2.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={new_logo} alt="Wink&Wear Logo" className="nav-logo" />
        <p className="nav-title">Wιɳƙ&Wҽαɾ</p>
      </div>
      <img src={navProfile2} alt="Admin Profile" className="nav-profile" />
    </nav>
  );
};

export default Navbar;
