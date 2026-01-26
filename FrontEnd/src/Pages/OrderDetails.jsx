import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./CSS/OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  /* ================= FETCH ORDER ================= */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BACKEND_URL}/api/orders/${orderId}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setOrder(res.data);
      } catch (err) {
        toast.error("Unable to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  /* ================= CANCEL ORDER ================= */
  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancelLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/orders/cancel/${orderId}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      toast.success("Order cancelled successfully");
      navigate("/orders");
    } catch {
      toast.error("Order cannot be cancelled");
    } finally {
      setCancelLoading(false);
    }
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return <div className="order-details">Loading order...</div>;
  }

  if (!order) {
    return <div className="order-details">Order not found</div>;
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>

      {/* ================= META ================= */}
      <div className="order-meta">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p>
          <strong>Placed On:</strong>{" "}
          {new Date(order.createdAt).toDateString()}
        </p>
      </div>

      {/* ================= TRACKING ================= */}
      <h3>Order Tracking</h3>
      <div className="tracking">
        {order.tracking.map((step, index) => (
          <div key={index} className="step done">
            <span>{step.step}</span>
            <small>{new Date(step.date).toLocaleString()}</small>
          </div>
        ))}
      </div>

      {/* ================= ITEMS ================= */}
      <h3>Items Ordered</h3>
      <div className="order-items">
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <p className="item-name">{item.name}</p>
            <p className="item-meta">
              Qty: {item.quantity} • ${item.price}
            </p>
          </div>
        ))}
      </div>


      {/* ================= ADDRESS ================= */}
      <h3>Delivery Address</h3>
      <div className="address-box">
        <p>{order.address.name}</p>
        <p>{order.address.street}</p>
        <p>
          {order.address.city}, {order.address.state} –{" "}
          {order.address.pincode}
        </p>
        <p>{order.address.country}</p>
        <p>📞 {order.address.phone}</p>
      </div>

      {/* ================= TOTAL ================= */}
      <div className="order-total">
        <strong>Total Amount:</strong> ${order.total}
      </div>

      {/* ================= CANCEL ================= */}
      {order.status !== "Delivered" && order.status !== "Cancelled" && (
        <button
          className="cancel-btn"
          onClick={handleCancelOrder}
          disabled={cancelLoading}
        >
          ❌ {cancelLoading ? "Cancelling..." : "Cancel Order"}
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
