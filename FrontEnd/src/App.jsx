import React, { lazy, Suspense } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';

// Route-level Code Splitting for ultra-fast initial page bundle
const ShopCategory = lazy(() => import('./Pages/ShopCategory'));
const Products = lazy(() => import('./Pages/Products'));
const LoginSignup = lazy(() => import('./Pages/LoginSignup'));
const Product = lazy(() => import('./Pages/Product'));
const Cart = lazy(() => import('./Pages/Cart'));
const PlaceOrder = lazy(() => import('./Pages/PlaceOrder'));
const PaymentSuccess = lazy(() => import('./Pages/PaymentSuccess'));
const Orders = lazy(() => import('./Pages/Orders'));
const OrderDetails = lazy(() => import('./Pages/OrderDetails'));
const About = lazy(() => import('./Pages/About'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const ReturnExchange = lazy(() => import('./Pages/ReturnExchange'));
const Contact = lazy(() => import('./Pages/Contact'));
const Profile = lazy(() => import('./Pages/Profile'));
const Wishlist = lazy(() => import('./Pages/Wishlist'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const Chatbot = lazy(() => import('./Components/Chatbot/Chatbot'));

const PageLoader = () => (
  <div className="page-loader-container">
    <div className="page-loader-spinner" />
  </div>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* INDEXABLE PUBLIC ROUTES */}
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory category="men" />} />
            <Route path='/mens/:subcategory' element={<ShopCategory category="men" />} />
            <Route path='/womens' element={<ShopCategory category="women" />} />
            <Route path='/womens/:subcategory' element={<ShopCategory category="women" />} />
            <Route path='/kids' element={<ShopCategory category="kid" />} />
            <Route path='/kids/:subcategory' element={<ShopCategory category="kid" />} />
            <Route path='/products' element={<Products />} />
            <Route path='/about' element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-exchange" element={<ReturnExchange />} />
            <Route path="/contact" element={<Contact />} />

            {/* PRODUCT DETAILS ROUTES */}
            <Route path="/product" element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>

            {/* PRIVATE / TRANSACTIONAL ROUTES */}
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />

            {/* LEGACY REDIRECTS */}
            <Route path='/kidss' element={<Navigate to="/kids" replace />} />

            {/* 404 CATCH-ALL */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
