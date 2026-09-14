import React from "react";
import "./CuratedEdits.css";
import { Link } from "react-router-dom";
import edit1 from "../Assets/new_women_1.webp";
import edit2 from "../Assets/new_men_1.webp";
import edit3 from "../Assets/women2.webp";
import edit4 from "../Assets/new_men_4.webp";
import { FaArrowRight } from "react-icons/fa";

const EDITS = [
  {
    id: 1,
    tag: "SIGNATURE EDIT",
    title: "Quiet Luxury & Tailoring",
    desc: "Refined neutral tones, structured blazers, and premium silk knits.",
    link: "/womens/blazers",
    image: edit1,
  },
  {
    id: 2,
    tag: "STREETWEAR '26",
    title: "Urban Tech & Outerwear",
    desc: "Heavyweight hoodies, utility bombers, and relaxed streetwear fits.",
    link: "/mens/jackets",
    image: edit2,
  },
  {
    id: 3,
    tag: "EVENING EDIT",
    title: "After-Dark Elegance",
    desc: "Sleek slip dresses, satin silhouettes, and statement partywear.",
    link: "/womens/dresses",
    image: edit3,
  },
  {
    id: 4,
    tag: "DAILY ESSENTIALS",
    title: "Minimalist Capsule",
    desc: "Organic cotton oversized tees and everyday tailored trousers.",
    link: "/mens/tshirts",
    image: edit4,
  },
];

const CuratedEdits = () => {
  return (
    <section className="curated-edits-section">
      <div className="curated-edits-header">
        <span className="curated-badge">AESTHETIC MOODBOARD</span>
        <h2>CURATED STYLE EDITS</h2>
        <div className="curated-line" />
        <p>Explore thematic collections handpicked for modern aesthetics and effortless styling.</p>
      </div>

      <div className="curated-grid">
        {EDITS.map((edit) => (
          <Link to={edit.link} key={edit.id} className="curated-card">
            <div className="curated-img-wrapper">
              <img src={edit.image} alt={edit.title} loading="lazy" decoding="async" />
              <div className="curated-overlay" />
            </div>
            <div className="curated-content">
              <span className="curated-card-tag">{edit.tag}</span>
              <h3>{edit.title}</h3>
              <p>{edit.desc}</p>
              <div className="curated-cta">
                <span>Explore Edit</span>
                <FaArrowRight className="curated-arrow" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CuratedEdits;
