import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const PROMO_CODES = {
  SAVE15: { type: 'percent', value: 15 },
  SAVE25: { type: 'percent', value: 25 },
  FLAT50: { type: 'flat', value: 50 },
  FREESHIP: { type: 'shipping', value: 15 },
  BLACKFRIDAY: { type: 'percent', value: 50 } // Friday only
};

// Detect Friday
const isFriday = () => new Date().getDay() === 5;

const CartItems = () => {
  const navigate = useNavigate();

  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    setDiscount,
    setAppliedCode,
    appliedCode,
    discount
  } = useContext(ShopContext);

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  // Subtotal
  const subtotal = Number(getTotalCartAmount()) || 0;

  // --------------------------------------------------
  // DISCOUNT LOGIC BASED ON PROMO CODE ONLY
  // --------------------------------------------------
  let discountAmount = 0;

  if (appliedCode) {
    const promo = PROMO_CODES[appliedCode];

    if (promo.type === 'percent') {
      // Friday BLACKFRIDAY validation
      if (appliedCode === "BLACKFRIDAY" && !isFriday()) {
        discountAmount = 0;
        setPromoMessage("BLACKFRIDAY code is valid only on Fridays.");
      } else {
        discountAmount = (subtotal * promo.value) / 100;
      }
    }

    if (promo.type === 'flat') {
      discountAmount = promo.value;
    }
  }

  // --------------------------------------------------
  // SHIPPING LOGIC
  // --------------------------------------------------
  let shippingFee = subtotal > 300 ? 0 : 15;

  if (appliedCode === "FREESHIP") {
    shippingFee = 0;
  }

  // --------------------------------------------------
  // FINAL TOTAL
  // --------------------------------------------------
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // --------------------------------------------------
  // APPLY PROMO CODE
  // --------------------------------------------------
  const handlePromoSubmit = () => {
    const code = promoCodeInput.trim().toUpperCase();

    if (appliedCode) {
      setPromoMessage(`Promo '${appliedCode}' already applied.`);
      return;
    }

    if (!PROMO_CODES.hasOwnProperty(code)) {
      setPromoMessage("Invalid promo code.");
      setPromoCodeInput('');
      return;
    }

    // BLACKFRIDAY validation
    if (code === "BLACKFRIDAY" && !isFriday()) {
      setPromoMessage("BLACKFRIDAY is valid only on Fridays.");
      setPromoCodeInput('');
      return;
    }

    // Apply code
    setAppliedCode(code);
    setPromoMessage(`Promo '${code}' applied successfully!`);
    setPromoCodeInput('');
  };

  // --------------------------------------------------
  // REMOVE PROMO CODE
  // --------------------------------------------------
  const handleRemovePromo = () => {
    setAppliedCode(null);
    setDiscount(0);
    setPromoMessage("Promo code removed.");
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Titles</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>${e.new_price}</p>

                <div className="cartitems-quantity-controls">
                  <button onClick={() => decrementQuantity(e.id)}>-</button>
                  <span>{cartItems[e.id]}</span>
                  <button onClick={() => incrementQuantity(e.id)}>+</button>
                </div>

                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>

                <img
                  className='cartitems-remove-icon'
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">

        {subtotal > 0 ? (
          <div className="cartitems-total">
            <h1>Cart Total</h1>

            {/* DISCOUNT BADGE */}
            {appliedCode && (
              <div className={`discount-badge ${appliedCode === "BLACKFRIDAY" ? "friday" : "normal"}`}>
                {appliedCode === "BLACKFRIDAY" ? (
                  <>🔥 BLACK FRIDAY: <strong>50% OFF Applied</strong></>
                ) : appliedCode === "SAVE15" ? (
                  <>✨ SAVE15: <strong>15% OFF</strong></>
                ) : appliedCode === "SAVE25" ? (
                  <>⭐ SAVE25: <strong>25% OFF</strong></>
                ) : appliedCode === "FLAT50" ? (
                  <>💎 FLAT50: <strong>$50 OFF</strong></>
                ) : appliedCode === "FREESHIP" ? (
                  <>🚚 FREESHIP: <strong>Free Shipping</strong></>
                ) : null}
              </div>
            )}

            {/* Subtotal */}
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            {/* Discount */}
            {discountAmount > 0 && (
              <div className="cartitems-total-item">
                <p>Discount</p>
                <p>- ${discountAmount.toFixed(2)}</p>
              </div>
            )}

            <hr />

            {/* Shipping */}
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{shippingFee === 0 ? "Free" : `$${shippingFee}`}</p>
            </div>

            <hr />

            {/* Total */}
            <div className={`cartitems-total-item total-highlight ${discountAmount > 0 ? 'glow' : ''}`}>
              <h3>Total</h3>
              <h3>${total.toFixed(2)}</h3>
            </div>

            <button onClick={() => navigate('/place-order')}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        ) : (
          <div className="cartitems-total">
            <h2>Your cart is Empty.</h2>
          </div>
        )}

        {/* Promo Code Area */}
        <div className="cartitems-promocode">
          <p>If you have a Promo Code, Enter it Here</p>

          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              disabled={!!appliedCode}
            />
            <button onClick={handlePromoSubmit} disabled={!!appliedCode}>
              Submit
            </button>
          </div>

          {promoMessage && (
            <p style={{ color: promoMessage.includes("applied") ? "green" : "red" }}>
              {promoMessage}
            </p>
          )}

          {/* Remove Promo */}
          {appliedCode && (
            <button className="remove-promo-btn" onClick={handleRemovePromo}>
              Remove Promo Code
            </button>
          )}

          {/* AVAILABLE OFFERS */}
          <div className="available-offers-box">
            <h3>Available Offers</h3>

            <ul>
              <li>✨ <strong>SAVE15</strong> — 15% OFF on orders above <strong>$100</strong></li>
              <li>⭐ <strong>SAVE25</strong> — 25% OFF on orders above <strong>$200</strong></li>
              <li>💎 <strong>FLAT50</strong> — Flat <strong>$50 OFF</strong> on orders above <strong>$350</strong></li>
              <li>🚚 <strong>FREESHIP</strong> — Free Shipping on any order</li>

              {isFriday() ? (
                <li className="friday-offer">
                  🔥 <strong>BLACKFRIDAY</strong> — 50% OFF (Valid Today Only!)
                </li>
              ) : (
                <li className="friday-offer-dim">
                  🔥 <strong>BLACKFRIDAY</strong> — 50% OFF (Only valid on Fridays)
                </li>
              )}
            </ul>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CartItems;
