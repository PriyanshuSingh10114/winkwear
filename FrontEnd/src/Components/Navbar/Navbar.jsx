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
      <div
        className="nav-logo"
        onClick={() => (window.location.href = "/")}
      >
        <img src={logo} alt="Logo" />
        <p>Wιɳƙ&Wҽαɾ</p>
      </div>

      {/* ---------------- MENU ---------------- */}
      <ul className="nav-menu">
        {["shop", "mens", "womens", "kids"].map((item) => (
          <li key={item} onClick={() => setMenu(item)}>
            <Link
              className="nav-link"
              to={item === "shop" ? "/" : `/${item}`}
            >
              {item === "shop"
                ? "Shop"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
            {menu === item && <hr />}
          </li>
        ))}
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
