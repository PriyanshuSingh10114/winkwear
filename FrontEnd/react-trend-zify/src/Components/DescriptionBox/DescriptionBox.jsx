import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description'); // default tab

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : 'fade'}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </div>
      </div>

      <div className="descriptionbox-content">
        {activeTab === 'description' ? (
          <div className="descriptionbox-description">
            <p>
              <strong>Wink & Wear</strong> is an e-commerce platform that offers a curated online storefront where customers can browse stylish collections, view detailed product information, and shop with ease through secure integrated payment gateways.
            </p>
            <p>
              <strong>Key Features:</strong><br />
              • Homepage: Promotions, featured products, and quick category access.<br />
              • Product Pages: Showcase item images, prices, variants, availability, and reviews.<br />
              • Smart Filters & Search: Narrow down choices by price, brand, or category.<br />
              • User Accounts: Enable users to register, view orders, and manage addresses.<br />
              • Cart & Checkout: Apply discounts and complete transactions.<br />
              • Admin Panel: Manage inventory, orders, analytics, and content updates.
            </p>
            <p>
              At <strong>Wink & Wear</strong>, clothing is more than just fashion—it’s a reflection of you. Our pieces blend bold trends with comfort, empowering every individual to wear their confidence with style.
            </p>
            <p>
              From everyday essentials to standout statement pieces, our collections are crafted to help you own every moment.
            </p>
          </div>
        ) : (
          <div className="descriptionbox-reviews">
            <h3>User Reviews</h3>
            <p>⭐️⭐️⭐️⭐️⭐️ — "Amazing quality and fast delivery!"</p>
            <p>⭐️⭐️⭐️⭐️ — "Loved the fabric and style. Definitely buying again."</p>
            <p>⭐️⭐️⭐️ — "Good, but could improve on packaging."</p>
            {/* Add a review form or dynamic data later if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
