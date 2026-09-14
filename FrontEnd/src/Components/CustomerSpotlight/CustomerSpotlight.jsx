import React from "react";
import "./CustomerSpotlight.css";
import { Link } from "react-router-dom";
import img1 from "../Assets/new_women_2.webp";
import img2 from "../Assets/new_men_3.webp";
import img3 from "../Assets/new_women_5.webp";
import img4 from "../Assets/new_men_7.webp";
import { FaInstagram, FaStar, FaHeart } from "react-icons/fa";

const SPOTLIGHT_POSTS = [
  {
    id: 1,
    image: img1,
    handle: "@tanya.styles",
    location: "Mumbai, IN",
    productName: "Vintage Striped Peplum Blouse",
    productLink: "/womens/tops",
    review: "Obsessed with the cut and breathable cotton! Fits true to size.",
    likes: "2.4k",
  },
  {
    id: 2,
    image: img2,
    handle: "@rohit_wardrobe",
    location: "Delhi, IN",
    productName: "Urban Heavyweight Oversized Tee",
    productLink: "/mens/tshirts",
    review: "The drape on this heavyweight cotton tee is unreal. 10/10 streetwear staple.",
    likes: "1.8k",
  },
  {
    id: 3,
    image: img3,
    handle: "@ananya_vogue",
    location: "Bengaluru, IN",
    productName: "After-Dark Satin Slip Dress",
    productLink: "/womens/dresses",
    review: "Wore this to an evening gala and got endless compliments. Luxury feel!",
    likes: "3.1k",
  },
  {
    id: 4,
    image: img4,
    handle: "@kabir_fit",
    location: "Chandigarh, IN",
    productName: "Tailored Tech Bomber Jacket",
    productLink: "/mens/jackets",
    review: "Sleek, minimalist, and keeps you warm without the bulk. Top-tier stitching.",
    likes: "1.5k",
  },
];

const CustomerSpotlight = () => {
  return (
    <section className="spotlight-section">
      <div className="spotlight-header">
        <span className="spotlight-badge">
          <FaInstagram style={{ marginRight: "6px" }} /> #STYLEDINWINKWEAR
        </span>
        <h2>CUSTOMER SPOTLIGHT</h2>
        <div className="spotlight-line" />
        <p>
          Real outfits, real people. Tag <strong>@WinkAndWear</strong> to get featured in our weekly editorial lookbook.
        </p>
      </div>

      <div className="spotlight-grid">
        {SPOTLIGHT_POSTS.map((post) => (
          <div key={post.id} className="spotlight-card">
            <div className="spotlight-img-box">
              <img src={post.image} alt={`${post.handle} wearing Wink & Wear`} loading="lazy" decoding="async" />
              <div className="spotlight-likes-pill">
                <FaHeart color="#e63946" /> <span>{post.likes}</span>
              </div>
            </div>

            <div className="spotlight-info">
              <div className="spotlight-user-row">
                <span className="spotlight-handle">{post.handle}</span>
                <span className="spotlight-location">{post.location}</span>
              </div>

              <div className="spotlight-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color="#d4a045" size={13} />
                ))}
              </div>

              <p className="spotlight-quote">"{post.review}"</p>

              <Link to={post.productLink} className="spotlight-product-tag">
                <span>Wearing: {post.productName}</span>
                <span className="spotlight-shop-link">Shop →</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerSpotlight;
