import { createContext, useEffect, useState } from "react";
import all_product_local from "../Components/Assets/all_product";
import "./ShopContext.css";

export const ShopContext = createContext(null);

/* ================= CONFIG ================= */
const MAX_QTY_PER_PRODUCT = 10;

/* ================= PROMO CONFIG ================= */
const PROMO_CODES = {
  SAVE15: { type: "percent", value: 15, min: 100 },
  SAVE25: { type: "percent", value: 25, min: 200 },
  FLAT50: { type: "flat", value: 50, min: 350 },
  FREESHIP: { type: "shipping", value: 15 },
  BLACKFRIDAY: { type: "percent", value: 50, fridayOnly: true },
};

const isFriday = () => new Date().getDay() === 5;

/* ================= HELPERS ================= */
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

/* ================= CONTEXT PROVIDER ================= */
const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [appliedCode, setAppliedCode] = useState("");

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BACKEND_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => {
        const merged = mergeProducts(all_product_local, data);
        setAll_Product(merged);

        const initialCart = {};
        merged.forEach((item) => {
          initialCart[item.id] = 0;
        });
        setCartItems(initialCart);
      })
      .catch(() => {
        // fallback to local products
        setAll_Product(all_product_local);

        const fallbackCart = {};
        all_product_local.forEach((item) => {
          fallbackCart[item.id] = 0;
        });
        setCartItems(fallbackCart);
      });
  }, []);

  /* ================= CART OPERATIONS ================= */

  // ✅ ADD TO CART (MERGE + MAX 10)
  const addToCart = (id, qty = 1) => {
    setCartItems((prev) => {
      const currentQty = prev[id] || 0;
      const mergedQty = Math.min(
        currentQty + qty,
        MAX_QTY_PER_PRODUCT
      );

      return {
        ...prev,
        [id]: mergedQty,
      };
    });
  };

  // ✅ INCREMENT (CART PAGE)
  const incrementQuantity = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: Math.min(
        (prev[id] || 0) + 1,
        MAX_QTY_PER_PRODUCT
      ),
    }));
  };

  // ✅ DECREMENT (CART PAGE)
  const decrementQuantity = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  // ✅ REMOVE ITEM COMPLETELY
  const removeFromCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  // ✅ CLEAR CART
  const clearCart = () => {
    const empty = {};
    all_product.forEach((p) => {
      empty[p.id] = 0;
    });
    setCartItems(empty);
  };

  /* ================= TOTAL CART AMOUNT ================= */
  const getTotalCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const product = all_product.find(
          (p) => String(p.id) === String(id)
        );
        if (product) {
          total += product.new_price * cartItems[id];
        }
      }
    }

    return total;
  };

  /* ================= ORDER SUMMARY ================= */
  const getOrderSummary = () => {
    const subtotal = Number(getTotalCartAmount()) || 0;
    let discount = 0;
    let shipping = subtotal > 300 ? 0 : 15;

    if (appliedCode && PROMO_CODES[appliedCode]) {
      const promo = PROMO_CODES[appliedCode];

      if (promo.fridayOnly && !isFriday()) {
        return {
          subtotal,
          discount: 0,
          shipping,
          total: subtotal + shipping,
        };
      }

      if (promo.min && subtotal < promo.min) {
        return {
          subtotal,
          discount: 0,
          shipping,
          total: subtotal + shipping,
        };
      }

      if (promo.type === "percent") {
        discount = (subtotal * promo.value) / 100;
      }

      if (promo.type === "flat") {
        discount = promo.value;
      }

      if (promo.type === "shipping") {
        shipping = 0;
      }
    }

    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      total,
      appliedCode,
    };
  };

  /* ================= TOTAL ITEM COUNT ================= */
  const getTotalCartItems = () => {
    let count = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        count += cartItems[id];
      }
    }
    return count;
  };

  /* ================= CONTEXT VALUE ================= */
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    getOrderSummary,
    getTotalCartItems,
    appliedCode,
    setAppliedCode,
    promoRules: PROMO_CODES,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
