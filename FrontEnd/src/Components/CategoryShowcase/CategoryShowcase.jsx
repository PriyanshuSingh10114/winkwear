import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryShowcase.css';
import menBanner from '../Assets/banner_1.webp';
import womenBanner from '../Assets/banner_4.webp';
import kidsBanner from '../Assets/banner_6.webp';

const CategoryShowcase = () => {
  return (
    <section className="category-showcase" aria-label="Fashion Categories">
      <h2 className="category-showcase-title">Explore Fashion Collections</h2>
      <p className="category-showcase-subtitle">
        Discover trending clothing and everyday fashion apparel for Men, Women & Kids
      </p>

      <div className="category-grid">
        {/* MEN */}
        <Link to="/mens" className="category-card" aria-label="Shop Men's Fashion & Apparel">
          <img src={menBanner} alt="Men's Fashion Collection" className="category-card-img" loading="lazy" />
          <div className="category-card-overlay"></div>
          <div className="category-card-content">
            <h3 className="category-card-heading">Men's Fashion</h3>
            <p className="category-card-desc">T-Shirts, Casual Shirts, Jackets & Streetwear</p>
            <span className="category-card-btn">Shop Men's Fashion →</span>
          </div>
        </Link>

        {/* WOMEN */}
        <Link to="/womens" className="category-card" aria-label="Shop Women's Fashion & Apparel">
          <img src={womenBanner} alt="Women's Fashion Collection" className="category-card-img" loading="lazy" />
          <div className="category-card-overlay"></div>
          <div className="category-card-content">
            <h3 className="category-card-heading">Women's Fashion</h3>
            <p className="category-card-desc">Dresses, Tops, Sweaters & Activewear</p>
            <span className="category-card-btn">Shop Women's Fashion →</span>
          </div>
        </Link>

        {/* KIDS */}
        <Link to="/kids" className="category-card" aria-label="Shop Kids' Fashion & Apparel">
          <img src={kidsBanner} alt="Kids' Fashion Collection" className="category-card-img" loading="lazy" />
          <div className="category-card-overlay"></div>
          <div className="category-card-content">
            <h3 className="category-card-heading">Kids' Fashion</h3>
            <p className="category-card-desc">Soft T-Shirts, Adorable Dresses & Play Outfits</p>
            <span className="category-card-btn">Shop Kids' Fashion →</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CategoryShowcase;
