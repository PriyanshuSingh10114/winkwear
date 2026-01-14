import React, { useContext, useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedSize("");
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="productdisplay-loading">
        <h2>Loading product...</h2>
      </div>
    );
  }

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

  const descriptionLines = product.description
    ? product.description.split(". ").filter(line => line.trim() !== "")
    : [];

  return (
    <>
      {added && (
        <div className="pd-toast" role="status" aria-live="polite">
          Added to cart — {product.name} · Size: {selectedSize} · Qty: {quantity}
        </div>
      )}

      <div className="productdisplay" role="main">
        {/* LEFT: Images */}
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {(product.gallery && product.gallery.length
              ? product.gallery
              : [product.image, product.image, product.image, product.image]
            ).map((src, idx) => (
              <button
                key={idx}
                className={`thumb-btn ${mainImage === src ? "active" : ""}`}
                onClick={() => setMainImage(src)}
              >
                <img src={src} alt={`${product.name} thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>

          <div className="productdisplay-img">
            <button
              className="main-img-btn"
              onClick={() => setZoomOpen(true)}
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

        {/* RIGHT: Details */}
        <div className="productdisplay-right">
          <h1 className="pd-title">{product.name}</h1>

          <div className="productdisplay-right-stars">
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

          {/* 🔥 DYNAMIC DESCRIPTION */}
          <div className="productdisplay-right-description">
            {descriptionLines.length > 0 ? (
              <ul>
                {descriptionLines.map((line, index) => (
                  <li key={index}>
                    {line.endsWith(".") ? line : `${line}.`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Premium quality product designed for everyday comfort.</p>
            )}
          </div>

          {/* SIZE SELECTOR */}
          <div className="size-block">
            <div className="size-heading">Select Size</div>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${
                    selectedSize === size ? "active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY + ADD */}
          <div className="cart-controls">
            <div className="quantity-controls">
              <button className="qty-btn" onClick={dec}>−</button>
              <div className="qty-display">{quantity}</div>
              <button className="qty-btn" onClick={inc}>+</button>
            </div>

            <button className="add-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>

          {/* META */}
          <p className="productdisplay-right-category">
            <span>Category:</span> {product.category}
          </p>

          <p className="productdisplay-right-category">
            <span>Season:</span> {product.season} | <span>Style:</span> {product.style}
          </p>

          <p className="productdisplay-right-category">
            <span>Occasion:</span> {product.occasion}
          </p>
        </div>
      </div>

      {/* IMAGE ZOOM */}
      {zoomOpen && (
        <div className="pd-zoom-backdrop" onClick={() => setZoomOpen(false)}>
          <div className="pd-zoom" onClick={(e) => e.stopPropagation()}>
            <button className="pd-zoom-close" onClick={() => setZoomOpen(false)}>
              ✕
            </button>
            <img src={mainImage} alt={`${product.name} large`} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
