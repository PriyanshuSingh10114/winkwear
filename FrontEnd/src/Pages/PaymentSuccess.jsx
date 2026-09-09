import React, { useEffect, useState, useContext, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { formatPrice } from "../utils/formatPrice";
import SEO from "../Components/SEO/SEO";
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaShoppingBag, FaBoxOpen } from "react-icons/fa";
import "./CSS/PaymentSuccess.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get("order_id");
  const sessionId = searchParams.get("session_id");

  const { clearCart } = useContext(ShopContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pollCount, setPollCount] = useState(0);
  const cartClearedRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!orderId) {
      setLoading(false);
      setError("No order ID was provided in the payment callback.");
      return;
    }

    let isMounted = true;
    let timerId = null;

    const fetchPaymentStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BACKEND_URL}/api/orders/${orderId}/payment-status`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        if (!isMounted) return;

        if (res.data?.success) {
          const orderData = res.data;
          setOrder(orderData);

          if (orderData.paymentStatus === "paid") {
            setLoading(false);
            if (!cartClearedRef.current) {
              clearCart();
              cartClearedRef.current = true;
            }
          } else if (orderData.paymentStatus === "failed") {
            setLoading(false);
          } else if (pollCount < 6) {
            // Poll for webhook completion if still pending
            timerId = setTimeout(() => {
              setPollCount((prev) => prev + 1);
            }, 2500);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
          setError(res.data?.message || "Unable to retrieve order details.");
        }
      } catch (err) {
        if (!isMounted) return;
        setLoading(false);
        setError(err.response?.data?.message || "Failed to verify payment status.");
      }
    };

    fetchPaymentStatus();

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [orderId, pollCount, navigate, clearCart]);

  return (
    <div className="payment-success-wrapper">
      <SEO title="Payment Status | Wink & Wear" robots="noindex, nofollow" />

      <div className="payment-success-card">
        {loading ? (
          <div className="status-container processing">
            <FaSpinner className="spinner-icon" />
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your transaction with Stripe.</p>
          </div>
        ) : error ? (
          <div className="status-container error">
            <FaTimesCircle className="error-icon" />
            <h2>Payment Verification Error</h2>
            <p>{error}</p>
            <div className="action-buttons">
              <Link to="/cart" className="btn-primary">
                Return to Cart
              </Link>
            </div>
          </div>
        ) : order?.paymentStatus === "failed" ? (
          <div className="status-container error">
            <FaTimesCircle className="error-icon" />
            <h2>Payment Failed</h2>
            <p>Your transaction was unsuccessful or cancelled by your financial institution.</p>
            <div className="action-buttons">
              <Link to="/place-order" className="btn-primary">
                Retry Checkout
              </Link>
              <Link to="/cart" className="btn-secondary">
                View Cart
              </Link>
            </div>
          </div>
        ) : order?.paymentStatus === "paid" ? (
          <div className="status-container success">
            <FaCheckCircle className="success-icon" />
            <h2>Thank You For Your Order!</h2>
            <p className="order-subtitle">
              Your payment has been successfully processed and verified via Stripe.
            </p>

            <div className="receipt-box">
              <div className="receipt-row">
                <span className="receipt-label">Order Number</span>
                <span className="receipt-value gold-text">{order.orderId}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Payment Method</span>
                <span className="receipt-value">Credit / Debit Card (Stripe)</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Order Status</span>
                <span className="receipt-value status-tag">{order.status || "Processing"}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Date</span>
                <span className="receipt-value">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="receipt-row">
                  <span className="receipt-label">Discount Applied</span>
                  <span className="receipt-value discount-val">- {formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="receipt-row total-row">
                <span className="receipt-label">Total Paid</span>
                <span className="receipt-value total-val">{formatPrice(order.total)}</span>
              </div>
            </div>

            {order.address && (
              <div className="delivery-info">
                <h4>Shipping Address</h4>
                <p>
                  <strong>{order.address.name}</strong>
                  <br />
                  {order.address.street}
                  <br />
                  {order.address.city}, {order.address.state} — {order.address.pincode}
                  <br />
                  📞 {order.address.phone}
                </p>
              </div>
            )}

            <div className="action-buttons">
              <Link to="/orders" className="btn-primary">
                <FaBoxOpen /> View My Orders
              </Link>
              <Link to="/" className="btn-secondary">
                <FaShoppingBag /> Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="status-container processing">
            <FaSpinner className="spinner-icon" />
            <h2>Payment Pending Confirmation</h2>
            <p>
              Your payment is still being processed by the payment provider. We will update your order status as soon as the confirmation arrives.
            </p>
            <div className="action-buttons">
              <Link to="/orders" className="btn-primary">
                Check My Orders
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
