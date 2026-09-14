import React from "react";
import "./CategoryHero.css";
import { Link } from "react-router-dom";
import womenImg from "../Assets/new_women_1.webp";
import menImg from "../Assets/new_men_1.webp";
import kidImg from "../Assets/kids_4.webp";
import allImg from "../Assets/new_women_6.webp";
import { FaCheckCircle, FaShippingFast, FaUndoAlt } from "react-icons/fa";

const SUBCATEGORIES_CONFIG = {
  women: [
    { label: "All Women", path: "/womens" },
    { label: "Dresses & Gowns", path: "/womens/dresses" },
    { label: "Tops & Blouses", path: "/womens/tops" },
    { label: "Jackets & Coats", path: "/womens/jackets" },
    { label: "Knitwear & Sweaters", path: "/womens/sweaters" },
    { label: "Blazers & Suits", path: "/womens/blazers" },
  ],
  men: [
    { label: "All Men", path: "/mens" },
    { label: "Oversized T-Shirts", path: "/mens/tshirts" },
    { label: "Shirts", path: "/mens/shirts" },
    { label: "Jackets & Bombers", path: "/mens/jackets" },
    { label: "Hoodies & Sweatshirts", path: "/mens/hoodies" },
    { label: "Tailored Blazers", path: "/mens/blazers" },
  ],
  kid: [
    { label: "All Kids", path: "/kids" },
    { label: "T-Shirts & Tops", path: "/kids/tshirts" },
    { label: "Dresses & Sets", path: "/kids/dresses" },
    { label: "Cozy Hoodies", path: "/kids/hoodies" },
  ],
  products: [
    { label: "All Collections", path: "/products" },
    { label: "Men's Apparel", path: "/mens" },
    { label: "Women's Fashion", path: "/womens" },
    { label: "Kids' Wear", path: "/kids" },
    { label: "Jackets & Outerwear", path: "/mens/jackets" },
    { label: "Dresses & Gowns", path: "/womens/dresses" },
  ],
};

const PREVIEW_IMAGES = {
  women: womenImg,
  men: menImg,
  kid: kidImg,
  products: allImg,
};

const CategoryHero = ({ category = "products", subcategory = "", title, intro, count }) => {
  const catKey = category === "all" ? "products" : category;
  const subcats = SUBCATEGORIES_CONFIG[catKey] || SUBCATEGORIES_CONFIG.products;
  const previewImg = PREVIEW_IMAGES[catKey] || allImg;

  const currentPath = subcategory
    ? `/${catKey === "men" ? "mens" : catKey === "women" ? "womens" : "kids"}/${subcategory}`
    : `/${catKey === "men" ? "mens" : catKey === "women" ? "womens" : catKey === "kid" ? "kids" : "products"}`;

  return (
    <div className="cat-hero-wrapper">
      <div className="cat-hero-card">
        {/* Ambient Glows */}
        <div className="cat-hero-glow glow-1" />
        <div className="cat-hero-glow glow-2" />

        <div className="cat-hero-grid">
          {/* Left Column: Details & Subcategories */}
          <div className="cat-hero-left">
            <span className="cat-hero-badge">
              {category.toUpperCase()} • 2026 COLLECTION
            </span>

            <h1 className="cat-hero-title">{title}</h1>
            <p className="cat-hero-intro">{intro}</p>

            {/* Subcategory Filter Pills */}
            <div className="cat-hero-pills-label">Explore Subcategories:</div>
            <div className="cat-hero-pills">
              {subcats.map((item, idx) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`cat-hero-pill ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Trust Perks */}
            <div className="cat-hero-perks">
              <div className="cat-perk">
                <FaCheckCircle className="perk-icon" />
                <span>100% Premium Fabrics</span>
              </div>
              <div className="cat-perk">
                <FaShippingFast className="perk-icon" />
                <span>Fast 48h Dispatch</span>
              </div>
              <div className="cat-perk">
                <FaUndoAlt className="perk-icon" />
                <span>Hassle-Free Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="cat-hero-right">
            <div className="cat-preview-frame">
              <img src={previewImg} alt={title} className="cat-preview-img" fetchPriority="high" />
              <div className="cat-preview-overlay">
                <span className="cpo-tag">WINK &amp; WEAR EDIT</span>
                <span className="cpo-sub">Trending Silhouettes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
