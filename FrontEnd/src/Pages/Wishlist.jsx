import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import Item from "../Components/Item/Item";
import SEO from "../Components/SEO/SEO";
import { Link } from "react-router-dom";
import "./CSS/Wishlist.css";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const { wishlistItems } = useContext(WishlistContext);

  return (
    <div className="wishlist-page">
      <SEO title="My Wishlist | Wink & Wear" robots="noindex, nofollow" />

      <div className="wishlist-header">
        <h1>
          <FaHeart color="#e63946" style={{ marginRight: "10px" }} />
          My Wishlist ({wishlistItems.length})
        </h1>
        <p>Your curated collection of favorite Wink & Wear styles.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <FaHeart size={48} color="#444" />
          <h2>Your Wishlist is Empty</h2>
          <p>Explore our latest apparel collections and save your favorite outfits here.</p>
          <Link to="/" className="explore-btn">
            Explore Collection →
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
