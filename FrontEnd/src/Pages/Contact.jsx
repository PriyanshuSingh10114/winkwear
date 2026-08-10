import React from "react";
import "../Pages/CSS/Contact.css";
import SEO from "../Components/SEO/SEO";
import { PAGE_SEO } from "../config/seoConfig";

const Contact = () => {
  return (
    <div className="contact-container">
      <SEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        canonical={PAGE_SEO.contact.canonical}
      />
      <h1>Contact Us</h1>


      <p className="contact-subtitle">
        We’d love to hear from you. Whether you have a question, feedback, or
        need support, our team is here to help.
      </p>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Customer Support</h2>
          <p>Email: <strong>support@winkandwear.com</strong></p>
          <p>Phone: <strong>+91 9XXXXXXXXX</strong></p>
          <p>Working Hours: Mon – Sat | 10:00 AM – 6:00 PM</p>

          <h2>Office Address</h2>
          <p>
            Wink & Wear<br />
            India
          </p>
        </div>

        <form className="contact-form">
          <h2>Send Us a Message</h2>

          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
