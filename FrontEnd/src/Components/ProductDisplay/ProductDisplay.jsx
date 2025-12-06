import React, { useContext, useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const sizes = ["S", "M", "L", "XL", "XXL"];

// Smart product type -> description
const descriptions = {
  Shirt:
    "Crafted from premium breathable fabric, this shirt blends comfort with timeless elegance—perfect for office or casual outings.",
  Casual:
    "Designed for everyday comfort with a modern relaxed fit and soft fabric that moves with you.",
  Winter:
    "Warm yet refined—layer-friendly pieces with cosy insulation and a tailored silhouette.",
  Summer:
    "Lightweight, breathable and easy-going — perfect for hot days and relaxed looks.",
  Formal:
    "Structured tailoring and clean lines for a polished, professional appearance.",
  Athletic:
    "Performance fabrics and ergonomic cuts for full-range movement and comfort.",
  Party:
    "Stand-out designs with premium finishes — made to get noticed at events and nights out.",
};

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    // If product changes (navigation), reset states
    setMainImage(product?.image || "");
    setSelectedSize("");
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="productdisplay-loading">
        <h2>Loading product...</h2>
      </div>
    );
  }

  const dynamicDescription =
    descriptions[product.type] ||
    "A premium piece designed with superior comfort and modern aesthetics.";

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const inc = () => setQuantity((q) => Math.min(q + 1, 99));
  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <>
      {added && (
        <div className="pd-toast" role="status" aria-live="polite">
          Added to cart — {product.name} · Size: {selectedSize} · Qty: {quantity}
        </div>
      )}

      <div className="productdisplay" role="main">
        {/* LEFT: images */}
        <div className="productdisplay-left" aria-hidden={false}>
          <div className="productdisplay-img-list" role="list">
            {/* If product has gallery array (optional) try to use it; fallback to product.image */}
            {(
              product.gallery && product.gallery.length
                ? product.gallery
                : [product.image, product.image, product.image, product.image]
            ).map((src, idx) => (
              <button
                key={idx}
                className={`thumb-btn ${mainImage === src ? "active" : ""}`}
                onClick={() => setMainImage(src)}
                aria-label={`Show image ${idx + 1}`}
              >
                <img src={src} alt={`${product.name} thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>

          <div className="productdisplay-img">
            <button
              className="main-img-btn"
              onClick={() => setZoomOpen(true)}
              aria-label="Open image zoom"
            >
              <img
                className="productdisplay-main-img"
                src={mainImage}
                alt={product.name}
                draggable="false"
              />
            </button>
          </div>
        </div>

        {/* RIGHT: details */}
        <div className="productdisplay-right">
          <h1 className="pd-title">{product.name}</h1>

          <div className="productdisplay-right-stars" aria-hidden>
            {[1, 2, 3, 4].map((i) => (
              <img key={i} src={star_icon} alt="" />
            ))}
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>

          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product.new_price}
            </div>
          </div>

          <div className="productdisplay-right-description">
            {dynamicDescription}
          </div>

          {/* SIZE SELECTOR */}
          <div className="size-block">
            <div className="size-heading">Select Size</div>
            <div className="size-options" role="radiogroup" aria-label="Sizes">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                  aria-checked={selectedSize === size}
                  role="radio"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY + ADD */}
          <div className="cart-controls">
            <div className="quantity-controls" aria-label="Quantity">
              <button className="qty-btn" onClick={dec} aria-label="Decrease quantity">−</button>
              <div className="qty-display" aria-live="polite">{quantity}</div>
              <button className="qty-btn" onClick={inc} aria-label="Increase quantity">+</button>
            </div>

            <button className="add-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>

          {/* META */}
          <p className="productdisplay-right-category">
            <span>Category:</span> {product.category || "Uncategorized"}
          </p>

          <p className="productdisplay-right-category">
            <span>Tags:</span> {product.tags ? product.tags.join(", ") : "Modern, Latest"}
          </p>
        </div>
      </div>

      {/* IMAGE ZOOM MODAL */}
      {zoomOpen && (
        <div className="pd-zoom-backdrop" onClick={() => setZoomOpen(false)}>
          <div className="pd-zoom" role="dialog" aria-modal="true" onClick={(e)=>e.stopPropagation()}>
            <button className="pd-zoom-close" onClick={() => setZoomOpen(false)} aria-label="Close zoom">✕</button>
            <img src={mainImage} alt={`${product.name} large`} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
