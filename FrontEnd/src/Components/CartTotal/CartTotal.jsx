import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './CartTotal.css'

const CartTotal = () => {
    // Get subtotal, discount, and appliedCode from context
    const { getTotalCartAmount, discount = 0, appliedCode = '' } = useContext(ShopContext);
    const subtotal = Number(getTotalCartAmount()) || 0;
    const discountAmount = Number(discount) || 0;

    // Shipping is free if subtotal > 300 or FREESHIP code is applied
    const shipping = (subtotal > 300 || appliedCode === 'FREESHIP') ? 0 : 15;

    // Calculate total (discount is subtracted only once)
    const total = subtotal - discountAmount + shipping;

    return (
        <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Discount</p>
                    <p>- ${discountAmount.toFixed(2)}</p>
                </div>
                <hr />
                <div className='cartitems-total-item'>
                    <p>Shipping Fee</p>
                    <p>{shipping === 0 ? "Free" : "$15"}</p>
                </div>
                <hr />
                <div className='cartitems-total-item'>
                    <h3>Total</h3>
                    <h3>${total.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    )
}

export default CartTotal