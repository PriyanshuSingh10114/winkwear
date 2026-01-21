import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MAX_QTY_PER_PRODUCT = 10;

const CartItems = () => {
  const navigate = useNavigate();

  const {
    all_product,
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    appliedCode,
    setAppliedCode,
    getOrderSummary,
    promoRules,
  } = useContext(ShopContext);

  const [promoCodeInput, setPromoCodeInput] = useState("");

  const { subtotal, discount, shipping, total } = getOrderSummary();

  /* ================= APPLY PROMO ================= */
  const handlePromoSubmit = () => {
    const code = promoCodeInput.trim().toUpperCase();

    if (!code) {
      toast.warn("Please enter a promo code.");
      return;
    }

    if (appliedCode) {
      toast.info(`Promo '${appliedCode}' already applied.`);
      return;
    }

    const promo = promoRules?.[code];

    if (!promo) {
      toast.error("Invalid promo code.");
      return;
    }

    if (promo.min && subtotal < promo.min) {
      toast.warn(
        `Order value must be at least $${promo.min} to use ${code}.`
      );
      return;
    }

    if (promo.fridayOnly && new Date().getDay() !== 5) {
      toast.warn(`${code} is valid only on Fridays.`);
      return;
    }

    setAppliedCode(code);
    toast.success(`Promo ${code} applied successfully!`);
    setPromoCodeInput("");
  };

  /* ================= REMOVE PROMO ================= */
  const handleRemovePromo = () => {
    setAppliedCode("");
    toast.info("Promo code removed.");
  };

  return (
    <div className="cartitems">
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
                <img
                  src={e.image}
                  alt={e.name}
                  className="carticon-product-icon"
                />

                <p>{e.name}</p>
                <p>${e.new_price}</p>

                {/* ===== QUANTITY CONTROLS ===== */}
                <div className="cartitems-quantity-controls">
                  <button onClick={() => decrementQuantity(e.id)}>
                    −
                  </button>

                  <span>{cartItems[e.id]}</span>

                  <button
                    onClick={() => {
                      if (cartItems[e.id] >= MAX_QTY_PER_PRODUCT) {
                        toast.error(
                          "Maximum order quantity for this product is 10"
                        );
                        return;
                      }
                      incrementQuantity(e.id);
                    }}
                    disabled={cartItems[e.id] >= MAX_QTY_PER_PRODUCT}
                  >
                    +
                  </button>
                </div>

                <p>
                  $
                  {(e.new_price * cartItems[e.id]).toFixed(2)}
                </p>

                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove"
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

            {appliedCode && (
              <div className="discount-badge normal">
                🎉 Promo Applied: <strong>{appliedCode}</strong>
              </div>
            )}

            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            {discount > 0 && (
              <div className="cartitems-total-item">
                <p>Discount</p>
                <p>- ${discount.toFixed(2)}</p>
              </div>
            )}

            <hr />

            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{shipping === 0 ? "Free" : `$${shipping}`}</p>
            </div>

            <hr />

            <div className="cartitems-total-item total-highlight">
              <h3>Total</h3>
              <h3>${total.toFixed(2)}</h3>
            </div>

            <button onClick={() => navigate("/place-order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        ) : (
          <div className="cartitems-total">
            <h2>Your cart is empty.</h2>
          </div>
        )}

        {/* ===== PROMO CODE ===== */}
        <div className="cartitems-promocode">
          <p>If you have a Promo Code, enter it here</p>

          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder="Promo Code"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              disabled={!!appliedCode}
            />
            <button
              onClick={handlePromoSubmit}
              disabled={!!appliedCode}
            >
              Submit
            </button>
          </div>

          {appliedCode && (
            <button
              className="remove-promo-btn"
              onClick={handleRemovePromo}
            >
              Remove Promo Code
            </button>
          )}
        </div>

        {/* ===== AVAILABLE OFFERS ===== */}
        <div className="available-offers-box">
          <h3>Available Offers</h3>
          <ul>
            <li>
              ✨ <strong>SAVE15</strong> — 15% OFF above <strong>$100</strong>
            </li>
            <li>
              ⭐ <strong>SAVE25</strong> — 25% OFF above <strong>$200</strong>
            </li>
            <li>
              💎 <strong>FLAT50</strong> — $50 OFF above <strong>$350</strong>
            </li>
            <li>
              🚚 <strong>FREESHIP</strong> — Free Shipping
            </li>
            <li>
              🔥 <strong>BLACKFRIDAY</strong> — 50% OFF (Friday only)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
