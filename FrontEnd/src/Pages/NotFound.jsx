import React from "react";
import { Link } from "react-router-dom";
import SEO from "../Components/SEO/SEO";
import "./CSS/NotFound.css";
import { FaHome, FaShoppingBag, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <SEO
        title="404 - Page Not Found | Wink & Wear"
        description="The fashion page or product you requested could not be found. Explore our latest Men, Women, and Kids collections."
        robots="noindex, nofollow"
      />
      <div className="notfound-card">
        <span className="notfound-badge">404 ERROR</span>
        <h1 className="notfound-title">Looks Like You've Wandered Off The Runway</h1>
        <p className="notfound-text">
          The page or fashion item you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="notfound-links-grid">
          <Link to="/" className="notfound-nav-link">
            <FaHome /> Home
          </Link>
          <Link to="/mens" className="notfound-nav-link">
            Men's Collection
          </Link>
          <Link to="/womens" className="notfound-nav-link">
            Women's Collection
          </Link>
          <Link to="/kids" className="notfound-nav-link">
            Kids' Collection
          </Link>
          <Link to="/products" className="notfound-nav-link highlight">
            <FaShoppingBag /> All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
