import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/new_logo3.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className='navbar'>
      <div className="nav-logo"
        onClick={() => {
          window.location.href = "/";   // redirects to home
        }}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Logo" />
        <p>Wιɳƙ&Wҽαɾ</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link className="nav-link" to="/">Shop</Link>
          {menu === 'shop' && <hr />}
        </li>

        <li onClick={() => setMenu("mens")}>
          <Link className="nav-link" to="/mens">Men</Link>
          {menu === 'mens' && <hr />}
        </li>

        <li onClick={() => setMenu("womens")}>
          <Link className="nav-link" to="/womens">Women</Link>
          {menu === 'womens' && <hr />}
        </li>

        <li onClick={() => setMenu("kids")}>
          <Link className="nav-link" to="/kids">Kids</Link>
          {menu === 'kids' && <hr />}
        </li>

        <li onClick={() => setMenu("about")}>
          <Link className="nav-link" to="/about">About</Link>
          {menu === 'about' && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">

        {localStorage.getItem("auth-token") ? (
          <button
            className="nav-login-btn"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="nav-login-btn">Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>

        <div className="nav-cart-count">
          {getTotalCartItems()}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
