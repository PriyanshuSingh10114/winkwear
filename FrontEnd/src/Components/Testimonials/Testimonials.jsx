import React from "react";
import "./Testimonials.css";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";

const REVIEWS = [
  {
    id: 1,
    name: "Sofia M.",
    initial: "S",
    location: "Mumbai, Maharashtra",
    purchase: "Oversized Knit Sweater Set",
    rating: 5,
    date: "Verified Buyer • 2 days ago",
    text: "The quality is unreal. Every piece feels premium, and the fit made me feel confident instantly. The heavyweight cotton knit feels like luxury designer quality without the crazy markup. Wink & Wear is officially my go-to!",
  },
  {
    id: 2,
    name: "Aarav S.",
    initial: "A",
    location: "New Delhi, Delhi",
    purchase: "Urban Street Bomber Jacket",
    rating: 5,
    date: "Verified Buyer • 5 days ago",
    text: "Fast 48-hour delivery, immaculate luxury packaging, and the jacket silhouette is super modern. The AI stylist Winkie actually helped me pick the right size on the first try. Already recommended it to all my friends!",
  },
  {
    id: 3,
    name: "Neha K.",
    initial: "N",
    location: "Bengaluru, Karnataka",
    purchase: "Nightfall Luxe Satin Dress",
    rating: 5,
    date: "Verified Buyer • 1 week ago",
    text: "The matte dark aesthetics, rich textures, and drape match my style perfectly. High-quality stitching that holds up after washes. Absolutely stunning collection!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <span className="testimonials-badge">AUTHENTIC SOCIAL PROOF</span>
        <h2>WHAT OUR CUSTOMERS SAY</h2>
        <div className="testimonials-line" />
        <p>
          Real stories from over <strong>15,000+ happy fashion lovers</strong> across India.
        </p>
      </div>

      <div className="testimonials-grid">
        {REVIEWS.map((r) => (
          <div key={r.id} className="testimonials-card">
            {/* Ambient Background Quote */}
            <FaQuoteLeft className="card-bg-quote" />

            <div className="card-top-row">
              <div className="user-avatar-badge">{r.initial}</div>
              <div className="user-meta">
                <div className="user-name-row">
                  <h3>{r.name}</h3>
                  <span className="verified-pill">
                    <FaCheckCircle className="check-icon" /> Verified Buyer
                  </span>
                </div>
                <span className="user-loc">{r.location}</span>
              </div>
            </div>

            <div className="rating-row">
              <div className="stars-wrapper">
                {[...Array(r.rating)].map((_, idx) => (
                  <FaStar key={idx} className="star-icon" />
                ))}
              </div>
              <span className="rating-num">5.0 / 5.0</span>
            </div>

            <div className="purchase-tag">
              <span>Item: <strong>{r.purchase}</strong></span>
            </div>

            <p className="testimonial-text">"{r.text}"</p>

            <div className="card-footer-date">
              <span>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
