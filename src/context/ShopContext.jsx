import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.product.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.product.stock) }
            : item
        );
      }
      return [...state, { product: action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM': {
      return state.filter((item) => item.product.id !== action.payload);
    }
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return state.filter((item) => item.product.id !== action.payload.id);
      }
      return state.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, quantity: Math.min(action.payload.qty, item.product.stock) }
          : item
      );
    }
    case 'CLEAR_CART': {
      return [];
    }
    case 'LOAD_CART': {
      return action.payload;
    }
    default:
      return state;
  }
}

const ShopContext = createContext(undefined);

export function ShopProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const saved = localStorage.getItem('campus_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedIds, setSavedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_store_saved');
      return saved ? JSON.parse(saved) : [1, 4];
    } catch {
      return [1, 4];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_store_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('campus_store_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_store_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_store_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const toggleSaved = useCallback((id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const placeOrder = useCallback((newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        savedIds,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleSaved,
        placeOrder,
        cartCount,
        cartSubtotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }
  return context;
}
