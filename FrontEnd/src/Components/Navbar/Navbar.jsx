import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/new_logo3.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { formatPrice } from "../../utils/formatPrice";
import { createProductSlug } from "../../utils/slugify";
import {
  FaSearch,
  FaHeart,
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingBag,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const MEGA_MENU_DATA = {
  women: {
    title: "Women's Collection",
    categories: [
      { name: "Dresses & Gowns", path: "/womens" },
      { name: "Tops & Blouses", path: "/womens" },
      { name: "Jackets & Coats", path: "/womens" },
      { name: "Knitwear & Sweaters", path: "/womens" },
      { name: "Blazers & Suits", path: "/womens" },
    ],
    featured: [
      { name: "Winter Streetwear Edit", badge: "NEW" },
      { name: "Luxury Silk Series", badge: "TRENDING" },
      { name: "Partywear Elegance", badge: "HOT" },
    ],
    sampleProductId: 13, // Blouse
  },
  men: {
    title: "Men's Apparel",
    categories: [
      { name: "Oversized T-Shirts", path: "/mens" },
      { name: "Casual & Formal Shirts", path: "/mens" },
      { name: "Jackets & Outerwear", path: "/mens" },
      { name: "Hoodies & Sweatshirts", path: "/mens" },
      { name: "Tailored Blazers & Suits", path: "/mens" },
    ],
    featured: [
      { name: "Urban Streetwear '26", badge: "NEW" },
      { name: "Heavyweight Cotton Tops", badge: "POPULAR" },
      { name: "Winter Tech Jackets", badge: "FEATURED" },
    ],
    sampleProductId: 44, // Men Jacket
  },
  kids: {
    title: "Kids' Fashion",
    categories: [
      { name: "Boys T-Shirts & Tops", path: "/kids" },
      { name: "Girls Dresses & Skirts", path: "/kids" },
      { name: "Cozy Hoodies & Jackets", path: "/kids" },
      { name: "Play & Casual Wear", path: "/kids" },
    ],
    featured: [
      { name: "Soft Cotton Daily Wear", badge: "ESSENTIAL" },
      { name: "Colorful Outerwear", badge: "NEW" },
    ],
    sampleProductId: 25,
  },
  collections: {
    title: "Curated Collections",
    categories: [
      { name: "New Season Arrivals", path: "/mens" },
      { name: "Minimalist Luxury Basics", path: "/womens" },
      { name: "Wink & Wear Signature", path: "/" },
      { name: "End of Season Sale", path: "/womens" },
    ],
    featured: [
      { name: "Gemini AI Styled Edits", badge: "AI POWERED" },
      { name: "Eco Cotton Capsule", badge: "SUSTAINABLE" },
    ],
    sampleProductId: 14,
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { getTotalCartItems, all_product } = useContext(ShopContext);
  const { getWishlistCount } = useContext(WishlistContext);

  /* Scroll State */
  const [isScrolled, setIsScrolled] = useState(false);

  /* Active Mega Menu State */
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  /* Mobile Drawer & Accordion State */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  /* Search Overlay State */
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /* User Profile Dropdown State */
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ---------------- SCROLL LISTENER ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- DEBOUNCED SEARCH ---------------- */
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      const q = searchQuery.toLowerCase().trim();
      const filtered = all_product.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.style?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q)
      );
      setSearchResults(filtered.slice(0, 6));
    }, 200);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery, all_product]);

  /* ---------------- OUTSIDE CLICK & ESCAPE LISTENERS ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchActive(false);
        setDrawerOpen(false);
        setUserDropdownOpen(false);
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ---------------- LOCK BODY SCROLL WHEN DRAWER OR SEARCH ACTIVE ---------------- */
  useEffect(() => {
    if (drawerOpen || searchActive) {
      document.body.style.overflow = "hidden";
      if (searchActive && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    } else {
      document.body.style.overflow = "auto";
    }
  }, [drawerOpen, searchActive]);

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const handleSelectProduct = (product) => {
    setSearchQuery("");
    setSearchActive(false);
    navigate(createProductSlug(product.name, product.id));
  };

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/mens") return "men";
    if (path === "/womens") return "women";
    if (path === "/kids") return "kids";
    if (path === "/wishlist") return "wishlist";
    if (path === "/cart") return "cart";
    return "shop";
  };

  const activeTab = getActiveTab();

  /* ---------------- USER DISPLAY NAME & INITIAL HELPER ---------------- */
  const getUserDisplayName = () => {
    if (!user) return "";
    if (user.name && user.name !== "User" && user.name.trim() !== "") {
      return user.name;
    }
    if (user.email) {
      const prefix = user.email.split("@")[0];
      if (prefix) {
        return prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }
    }
    return user.name || "Member";
  };

  const displayName = getUserDisplayName();
  const userInitial = displayName ? displayName.charAt(0).toUpperCase() : "M";

  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar-container" aria-label="Main Navigation">
        {/* ================= 1. LEFT: LOGO ================= */}
        <div className="nav-left">
          <button
            className="nav-mobile-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={drawerOpen}
          >
            <FaBars />
          </button>

          <Link to="/" className="nav-brand" onClick={() => window.scrollTo(0, 0)}>
            <img src={logo} alt="Wink & Wear Logo" className="nav-brand-logo" />
            <span className="nav-brand-text">Wιɳƙ&Wҽαɾ</span>
          </Link>
        </div>

        {/* ================= 2. CENTER: MAIN NAV LINKS ================= */}
        <ul className="nav-center-menu">
          <li className="nav-item">
            <Link
              to="/mens"
              className={`nav-link ${activeTab === "mens" ? "active" : ""}`}
            >
              New Arrivals
            </Link>
          </li>

          {["women", "men", "kids", "collections"].map((key) => (
            <li
              key={key}
              className="nav-item mega-trigger"
              onMouseEnter={() => setActiveMegaMenu(key)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to={key === "collections" ? "/" : `/${key}s`}
                className={`nav-link ${activeTab === key ? "active" : ""}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>

              {/* DESKTOP MEGA MENU PANEL */}
              {activeMegaMenu === key && (
                <div className="mega-menu-panel">
                  <div className="mega-menu-container">
                    {/* COL 1: Categories */}
                    <div className="mega-col">
                      <h4>{MEGA_MENU_DATA[key].title}</h4>
                      <ul>
                        {MEGA_MENU_DATA[key].categories.map((cat, idx) => (
                          <li key={idx}>
                            <Link
                              to={cat.path}
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* COL 2: Featured Edits */}
                    <div className="mega-col">
                      <h4>Featured Trends</h4>
                      <ul className="mega-featured-list">
                        {MEGA_MENU_DATA[key].featured.map((feat, idx) => (
                          <li key={idx}>
                            <Link
                              to={key === "collections" ? "/" : `/${key}s`}
                              onClick={() => setActiveMegaMenu(null)}
                            >
                              <span>{feat.name}</span>
                              <span className="mega-badge">{feat.badge}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* COL 3: Trending Preview Card */}
                    <div className="mega-col mega-preview-col">
                      <h4>Trending Now</h4>
                      {(() => {
                        const sample = all_product.find(
                          (p) => p.id === MEGA_MENU_DATA[key].sampleProductId
                        ) || all_product[0];
                        if (!sample) return null;
                        return (
                          <Link
                            to={createProductSlug(sample.name, sample.id)}
                            className="mega-preview-card"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            <img src={sample.image} alt={sample.name} />
                            <div className="mega-preview-info">
                              <p className="mp-name">{sample.name}</p>
                              <p className="mp-price">{formatPrice(sample.new_price)}</p>
                            </div>
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* ================= 3. RIGHT: ACTION ICONS ================= */}
        <div className="nav-right-actions">
          {/* SEARCH BUTTON */}
          <button
            className="nav-action-btn search-trigger-btn"
            onClick={() => setSearchActive(true)}
            aria-label="Open Search"
          >
            <FaSearch />
            <span className="action-label desktop-only">Search</span>
          </button>

          {/* WISHLIST LINK */}
          <Link
            to="/wishlist"
            className="nav-action-btn wishlist-btn"
            aria-label="My Wishlist"
          >
            <div className="icon-badge-wrapper">
              <FaHeart color="#e63946" />
              {getWishlistCount() > 0 && (
                <span className="nav-badge-pill">{getWishlistCount()}</span>
              )}
            </div>
            <span className="action-label desktop-only">
              Wishlist {getWishlistCount() > 0 ? `[${getWishlistCount()}]` : ""}
            </span>
          </Link>

          {/* ACCOUNT / LOGIN */}
          {!user ? (
            <Link to="/login" className="nav-action-btn account-btn">
              <FaUser />
              <span className="action-label desktop-only">Account</span>
            </Link>
          ) : (
            <div className="user-dropdown-container" ref={dropdownRef}>
              <button
                className="nav-action-btn user-btn"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                aria-expanded={userDropdownOpen}
                aria-label="User Account Menu"
              >
                <div className="nav-user-avatar">
                  {userInitial}
                </div>
                <span className="action-label desktop-only">{displayName}</span>
                <FaChevronDown className={`user-profile-chevron ${userDropdownOpen ? 'open' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="user-profile-dropdown">
                  <div className="upd-header">
                    <div className="upd-avatar-large">
                      {userInitial}
                    </div>
                    <div className="upd-user-info">
                      <p className="upd-name">{displayName}</p>
                      <p className="upd-email">{user.email || 'Verified Customer'}</p>
                    </div>
                  </div>

                  <div className="upd-divider" />

                  <div
                    className="upd-item"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    <span>My Profile</span>
                  </div>

                  <div
                    className="upd-item"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate("/orders");
                    }}
                  >
                    <span>My Orders</span>
                  </div>

                  <div
                    className="upd-item"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate("/wishlist");
                    }}
                  >
                    <span>My Wishlist ({getWishlistCount()})</span>
                  </div>

                  <div className="upd-divider" />

                  <div className="upd-item upd-logout" onClick={logout}>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SHOPPING BAG / CART */}
          <Link
            to="/cart"
            className="nav-action-btn bag-btn"
            aria-label="Shopping Bag"
          >
            <div className="icon-badge-wrapper">
              <FaShoppingBag />
              {getTotalCartItems() > 0 && (
                <span className="nav-badge-pill gold">{getTotalCartItems()}</span>
              )}
            </div>
            <span className="action-label desktop-only">
              Bag {getTotalCartItems() > 0 ? `[${getTotalCartItems()}]` : ""}
            </span>
          </Link>
        </div>
      </nav>

      {/* ================= SEARCH OVERLAY ================= */}
      {searchActive && (
        <div
          className="search-overlay"
          onClick={() => setSearchActive(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="search-overlay-box" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-header">
              <FaSearch className="so-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Wink & Wear fashion, jackets, dresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="so-close-btn"
                onClick={() => setSearchActive(false)}
                aria-label="Close Search"
              >
                <FaTimes />
              </button>
            </div>

            <div className="search-results-area">
              {searchQuery.trim() === "" ? (
                <div className="search-suggestions-tags">
                  <p>Popular Searches:</p>
                  <div className="tags-row">
                    <span onClick={() => setSearchQuery("Oversized T-Shirt")}>
                      Oversized T-Shirt
                    </span>
                    <span onClick={() => setSearchQuery("Jacket")}>Jackets</span>
                    <span onClick={() => setSearchQuery("Dress")}>Dresses</span>
                    <span onClick={() => setSearchQuery("Hoodie")}>Hoodies</span>
                    <span onClick={() => setSearchQuery("Blazer")}>Blazers</span>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="search-no-results">
                  No fashion items found for "{searchQuery}"
                </div>
              ) : (
                <div className="search-results-grid">
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      className="search-result-card"
                      onClick={() => handleSelectProduct(prod)}
                    >
                      <img src={prod.image} alt={prod.name} />
                      <div className="sr-info">
                        <p className="sr-title">{prod.name}</p>
                        <span className="sr-cat">{prod.category?.toUpperCase()}</span>
                        <span className="sr-price">{formatPrice(prod.new_price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE SLIDE-OUT DRAWER ================= */}
      {drawerOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
        >
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top-bar">
              <div className="drawer-brand">
                <img src={logo} alt="Wink & Wear" />
                <span>Wιɳƙ&Wҽαɾ</span>
              </div>
              <button
                className="drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="drawer-body">
              <ul className="drawer-main-nav">
                <li>
                  <Link to="/mens" onClick={() => setDrawerOpen(false)}>
                    New Arrivals 🔥
                  </Link>
                </li>

                {/* ACCORDION SECTIONS */}
                {["women", "men", "kids"].map((category) => (
                  <li key={category} className="drawer-accordion-item">
                    <button
                      className="drawer-accordion-btn"
                      onClick={() =>
                        setMobileAccordion(
                          mobileAccordion === category ? null : category
                        )
                      }
                    >
                      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      {mobileAccordion === category ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </button>

                    {mobileAccordion === category && (
                      <ul className="drawer-sub-menu">
                        <li>
                          <Link
                            to={`/${category}s`}
                            onClick={() => setDrawerOpen(false)}
                          >
                            Explore All {category.toUpperCase()}
                          </Link>
                        </li>
                        {MEGA_MENU_DATA[category]?.categories.map((sub, idx) => (
                          <li key={idx}>
                            <Link
                              to={sub.path}
                              onClick={() => setDrawerOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}

                <li>
                  <Link to="/wishlist" onClick={() => setDrawerOpen(false)}>
                    My Wishlist ({getWishlistCount()})
                  </Link>
                </li>

                <li>
                  <Link to="/cart" onClick={() => setDrawerOpen(false)}>
                    Shopping Bag ({getTotalCartItems()})
                  </Link>
                </li>

                <li>
                  <Link to="/about" onClick={() => setDrawerOpen(false)}>
                    About Wink & Wear
                  </Link>
                </li>

                <li>
                  <Link to="/contact" onClick={() => setDrawerOpen(false)}>
                    Customer Support
                  </Link>
                </li>
              </ul>

              <div className="drawer-bottom-user">
                {user ? (
                  <div className="drawer-logged-user">
                    <div className="dlu-header-row">
                      <div className="dlu-avatar">
                        {userInitial}
                      </div>
                      <div className="dlu-details">
                        <p className="dlu-name">{displayName}</p>
                        <p className="dlu-email">{user.email || 'Verified Customer'}</p>
                      </div>
                    </div>
                    <div className="dlu-actions-row">
                      <button
                        className="dlu-profile-btn"
                        onClick={() => {
                          setDrawerOpen(false);
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </button>
                      <button
                        className="dlu-profile-btn"
                        onClick={() => {
                          setDrawerOpen(false);
                          navigate("/orders");
                        }}
                      >
                        Orders
                      </button>
                      <button className="dlu-logout-btn" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="drawer-login-cta"
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate("/login");
                    }}
                  >
                    Login / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
