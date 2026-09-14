import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/new_logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <Link to="/" className="footer-logo" aria-label="Wink & Wear Homepage">
        <img src={logo} alt="Wink & Wear Footer Logo" width="48" height="48" loading="lazy" />
        <p>Wιɳƙ&Wҽαɾ</p>
      </Link>

      <ul className="footer-links" aria-label="Footer Navigation">
        <li>
          <Link className="nav-link" to="/mens">Men</Link>
        </li>
        <li>
          <Link className="nav-link" to="/womens">Women</Link>
        </li>
        <li>
          <Link className="nav-link" to="/kids">Kids</Link>
        </li>
        <li>
          <Link className="nav-link" to="/products">All Products</Link>
        </li>
        <li>
          <Link className="nav-link" to="/about">About Us</Link>
        </li>
        <li>
          <Link className="nav-link" to="/contact">Contact Support</Link>
        </li>
        <li>
          <Link className="nav-link" to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link className="nav-link" to="/return-exchange">Return &amp; Exchange</Link>
        </li>
      </ul>

      <div className="footer-social-icon" aria-label="Social Media Links">
        <div className="footer-icon-container" title="Instagram">
          <img src={instagram_icon} alt="Wink & Wear Instagram" width="20" height="20" loading="lazy" />
        </div>
        <div className="footer-icon-container" title="Pinterest">
          <img src={pintester_icon} alt="Wink & Wear Pinterest" width="20" height="20" loading="lazy" />
        </div>
        <div className="footer-icon-container" title="WhatsApp Support">
          <img src={whatsapp_icon} alt="Wink & Wear WhatsApp Support" width="20" height="20" loading="lazy" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>© 2026 Wink &amp; Wear. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;