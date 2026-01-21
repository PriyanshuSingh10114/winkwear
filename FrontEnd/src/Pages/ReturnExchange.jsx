import React from "react";
import "../Pages/CSS/Policy.css";

const ReturnExchange = () => {
  return (
    <div className="policy-container">
      <h1>Return & Exchange Policy</h1>

      <p>
        At <strong>Wink & Wear</strong>, we strive to ensure complete customer
        satisfaction. If you’re not fully satisfied with your purchase, we’re
        here to help.
      </p>

      <h2>1. Return Eligibility</h2>
      <ul>
        <li>Returns are accepted within <strong>7 days</strong> of delivery</li>
        <li>Items must be unused, unwashed, and in original packaging</li>
        <li>Tags and labels must remain intact</li>
      </ul>

      <h2>2. Non-Returnable Items</h2>
      <ul>
        <li>Items purchased during clearance or sale</li>
        <li>Innerwear, accessories, or customized products</li>
      </ul>

      <h2>3. Exchange Policy</h2>
      <p>
        Exchanges are allowed for size or defective items only, subject to stock
        availability.
      </p>

      <h2>4. Refund Process</h2>
      <p>
        Once the returned item passes quality inspection, refunds will be
        processed within <strong>5–7 business days</strong> to the original
        payment method.
      </p>

      <h2>5. How to Initiate a Return</h2>
      <p>
        Please contact our support team with your order ID and reason for return.
      </p>

      <p className="policy-footer">
        For assistance, email us at <strong>support@winkandwear.com</strong>
      </p>
    </div>
  );
};

export default ReturnExchange;
