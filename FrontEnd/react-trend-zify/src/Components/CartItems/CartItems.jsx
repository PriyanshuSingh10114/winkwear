import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom';

const PROMO_CODES = {
  SAVE15: { type: 'percent', value: 15 },
  SAVE25: { type: 'percent', value: 25 },
  FLAT50: { type: 'flat', value: 50 },
  FREESHIP: { type: 'shipping', value: 15 }
};

const CartItems = () => {
  const navigate = useNavigate();

  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    discount,
    appliedCode,
    setDiscount,
    setAppliedCode
  } = useContext(ShopContext);

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  // Always use numbers for calculations
  const subtotal = Number(getTotalCartAmount()) || 0;
  const discountAmount = Number(discount) || 0;
  let shippingFee = subtotal > 300 ? 0 : 15;

  // If FREESHIP code is applied, shipping is free
  if (appliedCode && PROMO_CODES[appliedCode]?.type === 'shipping') {
    shippingFee = 0;
  }

  // Calculate total safely
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Handle promo code submission
  const handlePromoSubmit = () => {
    const code = promoCodeInput.trim().toUpperCase();

    if (appliedCode) {
      setPromoMessage(`Only one promo code allowed. '${appliedCode}' is already applied.`);
      return;
    }

    if (PROMO_CODES.hasOwnProperty(code)) {
      setAppliedCode(code);
      const promo = PROMO_CODES[code];
      if (promo.type === 'percent') {
        setDiscount((subtotal * promo.value) / 100);
      } else if (promo.type === 'flat') {
        setDiscount(promo.value);
      } else if (promo.type === 'shipping') {
        setDiscount(0);
      }
      setPromoMessage(`Promo code '${code}' applied!`);
    } else {
      setPromoMessage('Invalid promo code.');
    }

    setPromoCodeInput('');
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
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          )
        }
        return null;
      })}

      <div className="cartitems-down">
        {subtotal > 0 ? (
          <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              {discountAmount > 0 && (
                <div className="cartitems-total-item">
                  <p>Discount</p>
                  <p>−${discountAmount.toFixed(2)}</p>
                </div>
              )}
              <hr />
              <div className='cartitems-total-item'>
                <p>Shipping Fee</p>
                <p>{shippingFee === 0 ? "Free" : `$${shippingFee}`}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <h3>Total</h3>
                <h3>${total.toFixed(2)}</h3>
              </div>
            </div>
            <button onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
          </div>
        ) : (
          <div className="cartitems-total">
            <h2>Your cart is Empty.</h2>
          </div>
        )}

        <div className="cartitems-promocode">
          <p>If you have a Promo Code, Enter it Here</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder='Promo Code'
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              disabled={!!appliedCode}
            />
            <button onClick={handlePromoSubmit} disabled={!!appliedCode}>Submit</button>
          </div>
          {promoMessage && (
            <p style={{ color: promoMessage.includes('applied') ? 'green' : 'red' }}>{promoMessage}</p>
          )}
          {appliedCode && (
            <div className="applied-codes">
              <p>Applied Promo Code: <strong>{appliedCode}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartItems;