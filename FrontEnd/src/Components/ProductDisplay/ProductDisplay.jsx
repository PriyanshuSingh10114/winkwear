import React, { useContext, useState, useEffect, useRef } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Item from "../Item/Item";
import { FaHeart, FaRegHeart, FaRulerHorizontal, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const sizes = ["S", "M", "L", "XL", "XXL"];
const MAX_QTY_PER_PRODUCT = 10;

const ProductDisplay = ({ product }) => {
  const navigate = useNavigate();

  const { addToCart, getTotalCartItems, all_product } = useContext(ShopContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const [limitPopup, setLimitPopup] = useState(false);
  const [mainImage, setMainImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  /* Real Rating & Review State */
  const [ratingData, setRatingData] = useState({ avgRating: 0, count: 0 });
  const [ratingLoading, setRatingLoading] = useState(true);

  /* Size Guide Modal State */
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [unit, setUnit] = useState("inches");

  /* Sticky Bar State */
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mainBtnRef = useRef(null);

  /* Mobile Touch Swipe State */
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const galleryImages = product?.gallery && product.gallery.length
    ? product.gallery
    : [product?.image, product?.image, product?.image];

  const currentImageIdx = galleryImages.indexOf(mainImage) !== -1 ? galleryImages.indexOf(mainImage) : 0;
  const isWishlisted = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedSize("");
      setQuantity(1);

      /* Fetch Live Rating Stats */
      axios
        .get(`${import.meta.env.VITE_API_BACKEND_URL}/rating/${product.id}`)
        .then((res) => {
          setRatingData({
            avgRating: res.data?.avgRating || 0,
            count: res.data?.count || 0,
          });
        })
        .catch(() => {
          setRatingData({ avgRating: 0, count: 0 });
        })
        .finally(() => setRatingLoading(false));
    }
  }, [product]);

  /* IntersectionObserver for Mobile Sticky CTA */
  useEffect(() => {
    const target = mainBtnRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when main button is NOT intersecting (scrolled past)
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [product]);

  if (!product) {
    return (
      <div className="productdisplay-loading">
        <h2>Loading product...</h2>
      </div>
    );
  }

  /* POPUP HANDLER */
  const showLimitPopup = () => {
    setLimitPopup(true);
    setTimeout(() => setLimitPopup(false), 2000);
  };

  /* ADD TO CART */
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    if (quantity >= MAX_QTY_PER_PRODUCT) {
      showLimitPopup();
      return;
    }

    addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const inc = () => {
    if (quantity >= MAX_QTY_PER_PRODUCT) {
      showLimitPopup();
      return;
    }
    setQuantity((q) => q + 1);
  };

  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  /* TOUCH SWIPE HANDLERS FOR MOBILE GALLERY */
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next image
      const nextIdx = (currentImageIdx + 1) % galleryImages.length;
      setMainImage(galleryImages[nextIdx]);
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev image
      const prevIdx = (currentImageIdx - 1 + galleryImages.length) % galleryImages.length;
      setMainImage(galleryImages[prevIdx]);
    }
  };

  /* RECOMMENDATIONS FILTERING */
  const recommendations = all_product
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category || item.style === product.style)
    )
    .slice(0, 4);

  const descriptionLines = product.description
    ? product.description.split(". ").filter((line) => line.trim() !== "")
    : [];

  return (
    <>
      {/* MAX LIMIT POPUP */}
      {limitPopup && (
        <div className="pd-toast error" role="alert">
          Maximum order quantity for this product is 10
        </div>
      )}

      {/* ADDED POPUP WITH RICH DETAILS */}
      {added && (
        <div className="pd-toast success" role="status" aria-live="polite">
          <div className="toast-content">
            <img src={product.image} alt={product.name} className="toast-img" />
            <div>
              <p className="toast-title">Added to Cart!</p>
              <p className="toast-sub">{product.name} (Size: {selectedSize}) · {formatPrice(product.new_price)}</p>
            </div>
            <button className="toast-cart-btn" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          </div>
        </div>
      )}

      <div className="productdisplay" role="main">
        {/* LEFT */}
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {galleryImages.map((src, idx) => (
              <button
                key={idx}
                className={`thumb-btn ${mainImage === src ? "active" : ""}`}
                onClick={() => setMainImage(src)}
              >
                <img src={src} alt={`${product.name} thumbnail ${idx + 1}`} />
              </button>
            ))}
          </div>

          <div
            className="productdisplay-img"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button className="main-img-btn" onClick={() => setZoomOpen(true)}>
              <img
                className="productdisplay-main-img"
                src={mainImage}
                alt={product.name}
                fetchPriority="high"
                decoding="async"
                draggable="false"
              />
            </button>

            {/* Wishlist Floating Heart */}
            <button
              className={`pd-wishlist-toggle ${isWishlisted ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle Wishlist"
            >
              {isWishlisted ? <FaHeart color="#e63946" /> : <FaRegHeart color="#fff" />}
            </button>

            {/* Mobile Touch Swipe Indicator Dots */}
            {galleryImages.length > 1 && (
              <div className="pd-mobile-dots">
                {galleryImages.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${currentImageIdx === i ? "active" : ""}`}
                    onClick={() => setMainImage(galleryImages[i])}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="productdisplay-right">
          <h1 className="pd-title">{product.name}</h1>

          {/* DYNAMIC REAL RATING */}
          <div className="productdisplay-right-stars">
            {ratingLoading ? (
              <span style={{ fontSize: "0.85rem", color: "#888" }}>Loading rating...</span>
            ) : ratingData.count > 0 ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.round(ratingData.avgRating) ? star_icon : star_dull_icon}
                    alt="star"
                  />
                ))}
                <p>
                  <strong>{ratingData.avgRating.toFixed(1)}</strong> ({ratingData.count} review
                  {ratingData.count > 1 ? "s" : ""})
                </p>
              </>
            ) : (
              <p className="no-rating">⭐ No reviews yet (Be the first to review!)</p>
            )}
          </div>

          {/* PRICES IN INR */}
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">
              {formatPrice(product.new_price)}
            </div>
            {product.old_price && (
              <div className="productdisplay-right-price-old">
                {formatPrice(product.old_price)}
              </div>
            )}
          </div>

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
              <p>Premium quality fashion product designed for everyday style and comfort.</p>
            )}
          </div>

          {/* SIZE SELECTION & SIZE GUIDE BUTTON */}
          <div className="size-block">
            <div className="size-header-row">
              <div className="size-heading">Select Size</div>
              <button
                className="size-guide-btn"
                onClick={() => setSizeGuideOpen(true)}
                type="button"
              >
                <FaRulerHorizontal /> Size Guide
              </button>
            </div>

            <div className="size-options">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY + ADD TO CART */}
          <div className="cart-controls">
            <div className="quantity-controls">
              <button className="qty-btn" onClick={dec}>−</button>
              <div className="qty-display">{quantity}</div>
              <button
                className="qty-btn"
                onClick={inc}
                disabled={quantity >= MAX_QTY_PER_PRODUCT}
              >
                +
              </button>
            </div>

            <button
              ref={mainBtnRef}
              className="add-cart-btn"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>

          {/* QUICK BUY ACTIONS */}
          <div className="cart-quick-actions">
            <button
              className="buy-now-btn"
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select a size first.");
                  return;
                }
                addToCart(product.id, quantity);
                navigate("/place-order");
              }}
            >
              BUY NOW
            </button>

            <button
              className={`pd-wishlist-action-btn ${isWishlisted ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted ? <FaHeart color="#e63946" /> : <FaRegHeart />}
              {isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}
            </button>
          </div>

          {/* META */}
          <div className="pd-meta-info">
            <p className="productdisplay-right-category">
              <span>Category:</span> {product.category?.toUpperCase()}
            </p>
            <p className="productdisplay-right-category">
              <span>Season:</span> {product.season} | <span>Style:</span> {product.style}
            </p>
            <p className="productdisplay-right-category">
              <span>Occasion:</span> {product.occasion}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY ADD TO CART BAR */}
      {showStickyBar && (
        <div className="pd-mobile-sticky-bar">
          <div className="sticky-info">
            <img src={product.image} alt={product.name} />
            <div>
              <p className="sticky-title">{product.name}</p>
              <p className="sticky-price">{formatPrice(product.new_price)}</p>
            </div>
          </div>

          <button className="sticky-add-btn" onClick={handleAddToCart}>
            {selectedSize ? `ADD (${selectedSize})` : "SELECT SIZE"}
          </button>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div
          className="size-guide-overlay"
          onClick={() => setSizeGuideOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="size-guide-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sg-header">
              <h3>📏 Apparel Size Guide & Measurements</h3>
              <button className="sg-close" onClick={() => setSizeGuideOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="unit-toggle">
              <button
                className={`unit-btn ${unit === "inches" ? "active" : ""}`}
                onClick={() => setUnit("inches")}
              >
                Inches (in)
              </button>
              <button
                className={`unit-btn ${unit === "cm" ? "active" : ""}`}
                onClick={() => setUnit("cm")}
              >
                Centimeters (cm)
              </button>
            </div>

            <table className="size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Waist</th>
                  <th>Length</th>
                  <th>Shoulder</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>S</strong></td>
                  <td>{unit === "inches" ? "36 - 38\"" : "91 - 96 cm"}</td>
                  <td>{unit === "inches" ? "30 - 32\"" : "76 - 81 cm"}</td>
                  <td>{unit === "inches" ? "27\"" : "68 cm"}</td>
                  <td>{unit === "inches" ? "16.5\"" : "42 cm"}</td>
                </tr>
                <tr>
                  <td><strong>M</strong></td>
                  <td>{unit === "inches" ? "38 - 40\"" : "96 - 101 cm"}</td>
                  <td>{unit === "inches" ? "32 - 34\"" : "81 - 86 cm"}</td>
                  <td>{unit === "inches" ? "28\"" : "71 cm"}</td>
                  <td>{unit === "inches" ? "17.5\"" : "44 cm"}</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>{unit === "inches" ? "40 - 42\"" : "101 - 106 cm"}</td>
                  <td>{unit === "inches" ? "34 - 36\"" : "86 - 91 cm"}</td>
                  <td>{unit === "inches" ? "29\"" : "73 cm"}</td>
                  <td>{unit === "inches" ? "18.5\"" : "47 cm"}</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>{unit === "inches" ? "42 - 44\"" : "106 - 111 cm"}</td>
                  <td>{unit === "inches" ? "36 - 38\"" : "91 - 96 cm"}</td>
                  <td>{unit === "inches" ? "30\"" : "76 cm"}</td>
                  <td>{unit === "inches" ? "19.5\"" : "49 cm"}</td>
                </tr>
                <tr>
                  <td><strong>XXL</strong></td>
                  <td>{unit === "inches" ? "44 - 46\"" : "111 - 116 cm"}</td>
                  <td>{unit === "inches" ? "38 - 40\"" : "96 - 101 cm"}</td>
                  <td>{unit === "inches" ? "31\"" : "78 cm"}</td>
                  <td>{unit === "inches" ? "20.5\"" : "52 cm"}</td>
                </tr>
              </tbody>
            </table>

            <div className="sg-tip">
              💡 <strong>Fitting Tip:</strong> For oversized style fits, choose your standard size. For a tailored slim fit, consider sizing down.
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT RECOMMENDATIONS ("STYLE IT WITH") */}
      {recommendations.length > 0 && (
        <div className="pd-recommendations-section">
          <h2>Style It With</h2>
          <hr />
          <div className="pd-recommendations-grid">
            {recommendations.map((rec) => (
              <Item key={rec.id} {...rec} />
            ))}
          </div>
        </div>
      )}

      {/* ZOOM MODAL */}
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
