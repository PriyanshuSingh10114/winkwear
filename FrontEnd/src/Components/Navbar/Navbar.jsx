import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/new_logo3.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [open, setOpen] = useState(false);

  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  return (
    <div className="navbar">
      {/* ---------------- LOGO ---------------- */}
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Wink & Wear Logo" />
        <p>Wιɳƙ&Wҽαɾ</p>
      </Link>

      {/* ---------------- MENU ---------------- */}
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link className="nav-link" to="/">Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link className="nav-link" to="/mens">Men's Fashion</Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link className="nav-link" to="/womens">Women's Fashion</Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link className="nav-link" to="/kids">Kids' Fashion</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>


      {/* ---------------- RIGHT SIDE ---------------- */}
      <div className="nav-login-cart">
        {!user ? (
          <Link to="/login">
            <button className="nav-login-btn">Login</button>
          </Link>
        ) : (
          <div className="user-box" ref={dropdownRef}>
            {/* USER CHIP */}
            <div
              className="user-chip"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            >
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.name}</span>
            </div>

            {/* DROPDOWN */}
            {open && (
              <div className="profile-dropdown">
                <p
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    setOpen(false);
                    navigate("/orders");
                  }}
                >
                  My Orders
                </p>
                <p onClick={logout}>Logout</p>
              </div>
            )}
          </div>
        )}

        {/* CART */}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
