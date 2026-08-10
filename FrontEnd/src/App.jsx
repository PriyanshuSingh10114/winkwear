import React, { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_1.webp'
import women_banner from './Components/Assets/banner_4.webp'
import kid_banner from './Components/Assets/banner_6.webp'
import Chatbot from './Components/Chatbot/Chatbot';

// Lazy-loaded page components for Code Splitting & Performance Optimization
const Shop = lazy(() => import('./Pages/Shop'));
const ShopCategory = lazy(() => import('./Pages/ShopCategory'));
const Product = lazy(() => import('./Pages/Product'));
const Cart = lazy(() => import('./Pages/Cart'));
const LoginSignup = lazy(() => import('./Pages/LoginSignup'));
const PlaceOrder = lazy(() => import('./Pages/PlaceOrder'));
const Orders = lazy(() => import('./Pages/Orders'));
const About = lazy(() => import('./Pages/About.jsx'));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const ReturnExchange = lazy(() => import("./Pages/ReturnExchange"));
const OrderDetails = lazy(() => import("./Pages/OrderDetails.jsx"));
const Contact = lazy(() => import("./Pages/Contact"));
const Profile = lazy(() => import("./Pages/Profile"));
const NotFound = lazy(() => import('./Pages/NotFound'));

function PageLoader() {
  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4a045' }}>
      <p style={{ fontSize: '1.2rem' }}>Loading Wink & Wear...</p>
    </div>
  );
}

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
            <Route path='/about' element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-exchange" element={<ReturnExchange />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/product" element={<Product />}>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />

            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Chatbot />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

