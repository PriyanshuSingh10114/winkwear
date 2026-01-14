import React, { useState } from "react";
import "./DescriptionBox.css";

const DescriptionBox = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  // Split description into lines (since you used sentence-based text)
  const descriptionLines = product?.description
    ?.split(". ")
    .filter(line => line.trim() !== "");

  return (
    <div className="descriptionbox">
      {/* NAVIGATION */}
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </div>

        <div
          className={`descriptionbox-nav-box ${
            activeTab === "reviews" ? "active" : "fade"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </div>
      </div>

      {/* CONTENT */}
      <div className="descriptionbox-content">
        {activeTab === "description" ? (
          <div className="descriptionbox-description">
            <h3>{product.name}</h3>

            <ul>
              {descriptionLines?.map((line, index) => (
                <li key={index}>{line}.</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="descriptionbox-reviews">
            <h3>User Reviews</h3>
            <p>⭐️⭐️⭐️⭐️⭐️ — Amazing quality and fast delivery!</p>
            <p>⭐️⭐️⭐️⭐️ — Loved the fabric and fitting.</p>
            <p>⭐️⭐️⭐️ — Good product, packaging can improve.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
