import React, { lazy, Suspense } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Shop from './Pages/Shop';

// Route-level Code Splitting for ultra-fast initial page bundle
const ShopCategory = lazy(() => import('./Pages/ShopCategory'));
const LoginSignup = lazy(() => import('./Pages/LoginSignup'));
const Product = lazy(() => import('./Pages/Product'));
const Cart = lazy(() => import('./Pages/Cart'));
const PlaceOrder = lazy(() => import('./Pages/PlaceOrder'));
const Orders = lazy(() => import('./Pages/Orders'));
const OrderDetails = lazy(() => import('./Pages/OrderDetails'));
const About = lazy(() => import('./Pages/About'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const ReturnExchange = lazy(() => import('./Pages/ReturnExchange'));
const Contact = lazy(() => import('./Pages/Contact'));
const Profile = lazy(() => import('./Pages/Profile'));
const Wishlist = lazy(() => import('./Pages/Wishlist'));
const Chatbot = lazy(() => import('./Components/Chatbot/Chatbot'));

// Banners
import men_banner from './Components/Assets/banner_1.webp';
import women_banner from './Components/Assets/banner_4.webp';
import kid_banner from './Components/Assets/banner_6.webp';

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
            <Route path='/' element={<Shop />} />
            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path='/kidss' element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path='/about' element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-exchange" element={<ReturnExchange />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/product" element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          </Routes>
          <Chatbot />
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
