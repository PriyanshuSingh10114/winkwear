import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './Context/ShopContext.jsx'
import WishlistContextProvider from './Context/WishlistContext.jsx'
import ThemeProvider from './Context/ThemeContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <ThemeProvider>
      <ShopContextProvider>
        <WishlistContextProvider>
          <App />
        </WishlistContextProvider>
      </ShopContextProvider>
    </ThemeProvider>
  </HelmetProvider>
)

