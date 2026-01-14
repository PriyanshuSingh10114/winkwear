import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './CartTotal.css';

const CartTotal = () => {
  const { getOrderSummary } = useContext(ShopContext);

  const {
    subtotal,
    discount,
    shipping,
    total
  } = getOrderSummary();

  return (
    <div className="cartitems-total">
      <h1>Cart Total</h1>

      <div className="cartitems-total-item">
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>

      {discount > 0 && (
        <>
          <hr />
          <div className="cartitems-total-item">
            <p>Discount</p>
            <p>- ${discount.toFixed(2)}</p>
          </div>
        </>
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
    </div>
  );
};

export default CartTotal;
