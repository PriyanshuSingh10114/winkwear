import { createContext, useEffect, useState } from 'react';
import all_product_local from '../Components/Assets/all_product';
import './ShopContext.css';

export const ShopContext = createContext(null);

// Merge DB + local products by unique ID
const mergeProducts = (local, remote) => {
  const seen = new Set();
  const merged = [];

  [...local, ...remote].forEach((product) => {
    if (!seen.has(product.id)) {
      merged.push(product);
      seen.add(product.id);
    }
  });

  return merged;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');

  // Fetch product list and initialize cart
  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        const merged = mergeProducts(all_product_local, data);
        setAll_Product(merged);

        const initialCart = {};
        merged.forEach((item) => {
          initialCart[item.id] = 0;
        });
        setCartItems(initialCart);
      })
      .catch((err) => {
        console.error("Failed to fetch from DB, using local only", err);
        setAll_Product(all_product_local);

        const fallbackCart = {};
        all_product_local.forEach((item) => {
          fallbackCart[item.id] = 0;
        });
        setCartItems(fallbackCart);
      });

    // Fetch user's saved cart from backend
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  // Add product to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // Remove one quantity from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // Clear entire cart
  const clearCart = () => {
    const emptyCart = {};
    all_product.forEach((item) => {
      emptyCart[item.id] = 0;
    });
    setCartItems(emptyCart);

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/clearcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => console.log('Cart cleared:', data))
        .catch((err) => console.error('Error clearing cart:', err));
    }
  };

  // Quantity control
  const incrementQuantity = (productId) => addToCart(productId);
  const decrementQuantity = (productId) => removeFromCart(productId);

  // Total amount logic
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => String(product.id) === String(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Total item count logic
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalCartItems,
    getTotalCartAmount,
    discount,
    setDiscount,
    appliedCode,
    setAppliedCode,
    clearCart, // ✅ Added to context
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;


