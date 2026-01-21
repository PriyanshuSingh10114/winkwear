import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ShopCategory from './Pages/ShopCategory'
import LoginSignup from './Pages/LoginSignup'
import Shop from './Pages/Shop';
import Product from './Pages/Product'
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/banner_1.png'
import women_banner from './Components/Assets/banner_4.png'
import kid_banner from './Components/Assets/banner_6.png'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import About from './Pages/About.jsx'
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ReturnExchange from "./Pages/ReturnExchange";
import Contact from "./Pages/Contact";



function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/> 
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens'element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-exchange" element={<ReturnExchange />} />
        <Route path="/contact" element={<Contact />} /> 
        
        <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/Orders" element={<Orders />} />     

      </Routes>
      <Footer/>
      </BrowserRouter>
      
    </div>
  )
}

export default App
