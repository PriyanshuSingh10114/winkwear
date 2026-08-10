import React, { useContext, useState, memo } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { createProductSlug } from '../../utils/slugify';
import { formatPrice } from '../../utils/formatPrice';
import { WishlistContext } from '../../Context/WishlistContext';
import { FaHeart, FaRegHeart, FaEye } from 'react-icons/fa';
import QuickViewModal from '../QuickView/QuickViewModal';

const Item = (props) => {
  const productUrl = createProductSlug(props.name, props.id);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const productData = {
    id: props.id,
    name: props.name,
    image: props.image,
    new_price: props.new_price,
    old_price: props.old_price,
    category: props.category || '',
    description: props.description || `High-quality ${props.name} from Wink & Wear.`
  };

  const isWishlisted = isInWishlist(props.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productData);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div className="item">
        <div className="item-img-container">
          <Link to={productUrl} onClick={() => window.scrollTo(0, 0)}>
            <img
              src={props.image}
              alt={props.name || "Wink & Wear Fashion Item"}
              loading={props.priority ? "eager" : "lazy"}
              fetchPriority={props.priority ? "high" : "auto"}
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              className={`item-product-img ${isLoaded ? "loaded" : "loading"}`}
            />
          </Link>
          
          {/* Wishlist Heart Icon Button */}
          <button 
            className={`item-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistClick}
            aria-label="Add to Wishlist"
          >
            {isWishlisted ? <FaHeart color="#e63946" /> : <FaRegHeart color="#fff" />}
          </button>

          {/* Quick View Button */}
          <button className="item-quickview-btn" onClick={handleQuickViewClick}>
            <FaEye /> Quick View
          </button>
        </div>

        <p>
          <Link to={productUrl} onClick={() => window.scrollTo(0, 0)}>
            {props.name}
          </Link>
        </p>
        
        <div className="item-prices">
          <div className="item-price-new">
            {formatPrice(props.new_price)}
          </div>
          {props.old_price && (
            <div className="item-price-old">
              {formatPrice(props.old_price)}
            </div>
          )}
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal product={productData} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
};

// Memoize Item component to prevent unnecessary React DOM re-renders during parent scrolling
export default memo(Item, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.name === nextProps.name &&
    prevProps.image === nextProps.image &&
    prevProps.new_price === nextProps.new_price &&
    prevProps.old_price === nextProps.old_price &&
    prevProps.priority === nextProps.priority
  );
});