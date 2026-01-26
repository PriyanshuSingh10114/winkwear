import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CSS/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BACKEND_URL}/api/orders/myorders`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="orders-page">Loading...</div>;

  if (!orders.length)
    return <div className="orders-page">No orders found</div>;

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-top">
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p>{new Date(order.createdAt).toDateString()}</p>
            </div>

            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          {/* ITEMS PREVIEW */}
          <div className="order-items-preview">
            {order.items.slice(0, 3).map((item, i) => (
              <div key={i} className="item-preview">
                <p className="preview-name">{item.name}</p>
                <p className="preview-qty">Qty: {item.quantity}</p>
              </div>
            ))}

            {order.items.length > 3 && (
              <p className="more-items">
                +{order.items.length - 3} more items
              </p>
            )}
          </div>


          <div className="order-footer">
            <p className="total">${order.total}</p>
            <Link to={`/orders/${order._id}`} className="view-btn">
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
