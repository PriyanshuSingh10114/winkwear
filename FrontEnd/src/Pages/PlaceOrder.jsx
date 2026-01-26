import React, { useContext, useState } from "react";
import "./CSS/PlaceOrder.css";
import CartTotal from "../Components/CartTotal/CartTotal";
import razor_pay from "../Components/Assets/razorpay_logo.png";
import stripe_logo from "../Components/Assets/stripe_logo.png";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
    clearCart,
    cartItems,
    getOrderSummary,
    all_product, // ✅ CORRECT NAME
  } = useContext(ShopContext);

  const orderSummary = getOrderSummary();

  const [method, setMethod] = useState("cod");
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
  });

  /* ================= PINCODE HANDLER ================= */
  const handlePincodeChange = async (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, zipCode: value }));

    if (!/^\d{6}$/.test(value)) return;

    try {
      setPincodeLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/pincode/${value}`
      );

      if (res.data.success) {
        setFormData((prev) => ({
          ...prev,
          city: res.data.city || prev.city,
          state: res.data.state || prev.state,
          country: res.data.country || "India",
        }));
      }
    } catch {
      toast.error("Invalid or unsupported pincode", {
        position: "top-center",
      });
    } finally {
      setPincodeLoading(false);
    }
  };

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ================= VALIDATION ================= */
  const isFormValid = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "street",
      "phone",
      "zipCode",
    ];

    return required.every((f) => formData[f]?.trim() !== "");
  };

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      toast.error("Please fill all required fields.", {
        position: "top-center",
      });
      return;
    }

    // ✅ SAFE PRODUCT LIST
    const productList = Array.isArray(all_product) ? all_product : [];

    // ✅ BUILD FULL PRODUCT SNAPSHOT
    const items = Object.keys(cartItems || {})
      .filter((id) => cartItems[id] > 0)
      .map((id) => {
        const product = productList.find(
          (p) => String(p.id) === String(id)
        );

        if (!product) return null;

        return {
          productId: product.id,
          name: product.name,
          price: Number(product.new_price),
          image: product.images || "",
          quantity: cartItems[id],

        };
      })
      .filter(Boolean);

    if (!items.length) {
      toast.error("Products not loaded yet. Please try again.", {
        position: "top-center",
      });
      return;
    }

    if (orderSummary.total <= 0) {
      toast.error("Invalid order amount.", {
        position: "top-center",
      });
      return;
    }

    if (method !== "cod") {
      toast.error("Payment gateway not enabled yet.", {
        position: "top-center",
      });
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/orders/placeorder`,
        {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          items,
          order: {
            subtotal: orderSummary.subtotal,
            shipping: orderSummary.shipping,
            total: orderSummary.total,
            paymentMethod: method,
          },
          address: {
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.zipCode,
            country: formData.country,
          },
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      toast.success("Order placed successfully!", {
        position: "top-center",
        autoClose: 1500,
      });

      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Order failed. Please try again.",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="place-order-container">
      <ToastContainer />

      {/* LEFT */}
      <div className="left-side">
        <h2>Delivery Information</h2>

        <div className="input-group">
          <input
            className="input-box"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            className="input-box"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <input
          className="input-box"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="input-box"
          placeholder="Street Address"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />

        <div className="input-group">
          <input
            className="input-box"
            placeholder={pincodeLoading ? "Detecting city..." : "City"}
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            className="input-box"
            placeholder={pincodeLoading ? "Detecting state..." : "State"}
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            className="input-box"
            placeholder="Pincode"
            value={formData.zipCode}
            onChange={handlePincodeChange}
            maxLength={6}
          />
          <input
            className="input-box"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <input
          className="input-box"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* RIGHT */}
      <div className="right-side">
        <h2>Order Summary</h2>

        <div className="summary-card">
          <CartTotal />
        </div>

        <div className="payment-method">
          <h4>Payment Method</h4>

          <div className="payment-method-selection">
            <div
              className={`payment-option ${
                method === "cod" ? "selected" : ""
              }`}
              onClick={() => setMethod("cod")}
            >
              <span>Cash on Delivery</span>
            </div>

            <div className="payment-option disabled">
              <img src={stripe_logo} alt="Stripe" />
              <span>Stripe (Coming Soon)</span>
            </div>

            <div className="payment-option disabled">
              <img src={razor_pay} alt="Razorpay" />
              <span>Razorpay (Coming Soon)</span>
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
