import React, { useState, useContext, useEffect } from "react";
import "./QuickViewModal.css";
import { ShopContext } from "../../Context/ShopContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { createProductSlug } from "../../utils/slugify";
import { FaHeart, FaRegHeart, FaTimes, FaStar } from "react-icons/fa";

const sizes = ["S", "M", "L", "XL", "XXL"];

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useContext(ShopContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!product) return null;

  const productUrl = createProductSlug(product.name, product.id);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="quickview-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quickview-close" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        <div className="quickview-grid">
          {/* Image */}
          <div className="quickview-img-box">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Details */}
          <div className="quickview-details">
            <span className="quickview-badge">
              {product.category ? product.category.toUpperCase() : "COLLECTION"}
            </span>

            <h2>{product.name}</h2>

            <div className="quickview-prices">
              <span className="quickview-new">{formatPrice(product.new_price)}</span>
              {product.old_price && (
                <span className="quickview-old">{formatPrice(product.old_price)}</span>
              )}
            </div>

            <p className="quickview-desc">{product.description}</p>

            {/* Size Selector */}
            <div className="quickview-size-section">
              <label>Select Size:</label>
              <div className="quickview-sizes">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    className={`size-btn ${selectedSize === sz ? "active" : ""}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="quickview-actions">
              <button className="qv-cart-btn" onClick={handleAddToCart}>
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              <button
                className={`qv-wishlist-btn ${isWishlisted ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle Wishlist"
              >
                {isWishlisted ? <FaHeart color="#e63946" /> : <FaRegHeart />}
              </button>
            </div>

            <div className="quickview-footer">
              <Link to={productUrl} onClick={onClose} className="qv-full-details">
                View Full Product Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
