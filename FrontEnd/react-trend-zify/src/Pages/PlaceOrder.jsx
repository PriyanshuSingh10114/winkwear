import React, { useContext, useState } from 'react';
import './CSS/PlaceOrder.css';
import CartTotal from '../Components/CartTotal/CartTotal';
import razor_pay from '../Components/Assets/razorpay_logo.png';
import stripe_logo from '../Components/Assets/stripe_logo.png';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { clearCart, cartItems } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = () => Object.values(formData).every(field => field.trim() !== '');
  const cartHasItems = Object.keys(cartItems || {}).some(key => cartItems[key] > 0);

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      toast.error('Please fill in all the required fields.', { position: 'top-center', autoClose: 2500 });
      return;
    }

    if (!cartHasItems) {
      toast.error('Your cart is empty. Add at least one item to place an order.', { position: 'top-center', autoClose: 2500 });
      return;
    }

    if (method === 'stripe' || method === 'razor-pay') {
      toast.error(`${method === 'stripe' ? 'Stripe' : 'Razorpay'} payment is currently unavailable.`, {
        position: 'top-center',
        autoClose: 3000,
      });
    } else {
      toast.success('Order placed successfully with Cash on Delivery!', {
        position: 'top-center',
        autoClose: 2000,
        onClose: async () => {
          try {
            const orderSummary = `Name: ${formData.firstName} ${formData.lastName}\nAddress: ${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}\nPhone: ${formData.phone}`;
            await axios.post('http://localhost:4000/placeorder', {
              email: formData.email,
              name: `${formData.firstName} ${formData.lastName}`,
              orderSummary,
            });
          } catch (error) {
            toast.error('Order placed but failed to send email');
            console.error(error);
          } finally {
            clearCart?.();
            navigate('/');
          }
        },
      });
    }
  };

  return (
    <div className="place-order-container">
      <ToastContainer />

      {/* Left Section - Form */}
      <div className="left-side">
        <h2>Delivery Information</h2>
        <div className="input-group">
          <input className="input-box" type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <input className="input-box" type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <input className="input-box" type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} />
        <input className="input-box" type="text" placeholder="Street" name="street" value={formData.street} onChange={handleChange} />
        <div className="input-group">
          <input className="input-box" type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} />
          <input className="input-box" type="text" placeholder="State" name="state" value={formData.state} onChange={handleChange} />
        </div>
        <div className="input-group">
          <input className="input-box" type="number" placeholder="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
          <input className="input-box" type="text" placeholder="Country" name="country" value={formData.country} onChange={handleChange} />
        </div>
        <input className="input-box" type="number" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      {/* Right Section - Summary */}
      <div className="right-side">
        <h2 className="order-summary-title">Order Summary</h2>

        <CartTotal />

        <div className="payment-method">
          <h4>Payment Methods</h4>
          <div className="payment-method-selection">
            <div onClick={() => setMethod('stripe')} className={`payment-option ${method === 'stripe' ? 'selected' : ''}`}>
              <div className="payment-content">
                <img src={stripe_logo} alt="Stripe" />
                <span className="payment-text">Pay with Stripe</span>
              </div>
            </div>

            <div onClick={() => setMethod('razor-pay')} className={`payment-option ${method === 'razor-pay' ? 'selected' : ''}`}>
              <div className="payment-content">
                <img src={razor_pay} alt="Razorpay" />
                <span className="payment-text">Pay with Razorpay</span>
              </div>
            </div>

            <div onClick={() => setMethod('cod')} className={`payment-option ${method === 'cod' ? 'selected' : ''}`}>
              <div className="payment-content">
                <span className="payment-text">Cash on Delivery</span>
              </div>
            </div>
          </div>

          <div className="place-order">
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
