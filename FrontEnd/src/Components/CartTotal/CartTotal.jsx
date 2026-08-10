import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { formatPrice } from '../../utils/formatPrice';
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
        <p>{formatPrice(subtotal)}</p>
      </div>

      {discount > 0 && (
        <>
          <hr />
          <div className="cartitems-total-item">
            <p>Discount</p>
            <p>- {formatPrice(discount)}</p>
          </div>
        </>
      )}

      <hr />

      <div className="cartitems-total-item">
        <p>Shipping Fee</p>
        <p>{shipping === 0 ? "Free" : formatPrice(shipping)}</p>
      </div>

      <hr />

      <div className="cartitems-total-item total-highlight">
        <h3>Total</h3>
        <h3>{formatPrice(total)}</h3>
      </div>
    </div>
  );
};

export default CartTotal;
