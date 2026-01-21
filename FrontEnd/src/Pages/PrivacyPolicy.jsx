import React from "react";
import "../Pages/CSS/Policy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>

      <p>
        At <strong>Wink & Wear</strong>, your privacy is important to us. This
        Privacy Policy explains how we collect, use, and protect your personal
        information when you use our website.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal details such as your name, email address, phone
        number, shipping address, and payment-related information when you make
        a purchase or create an account.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process and deliver your orders</li>
        <li>To communicate order updates and support requests</li>
        <li>To improve our products, services, and website experience</li>
        <li>To comply with legal and regulatory obligations</li>
      </ul>

      <h2>3. Data Protection</h2>
      <p>
        We use secure technologies and industry-standard practices to protect
        your personal data. Your information is never sold or shared with
        unauthorized third parties.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Our website uses cookies to enhance your browsing experience. You may
        disable cookies in your browser settings if you prefer.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, update, or request deletion of your
        personal information by contacting us.
      </p>

      <h2>6. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Any changes will be
        reflected on this page.
      </p>

      <p className="policy-footer">
        Last updated: January 2026
      </p>
    </div>
  );
};

export default PrivacyPolicy;
