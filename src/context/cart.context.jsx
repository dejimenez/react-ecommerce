import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  clearItemFromCart: () => {},
});

const addCartItem = (cartItems, product) => {
  const cartItem = cartItems.find((item) => item.product.id === product.id);

  if (cartItem) {
    return cartItems.map((item) =>
      item === cartItem
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { product, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItem) => {
  if (cartItem.quantity > 1) {
    return cartItems.map((item) =>
      item === cartItem
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : item
    );
  }

  return cartItems.filter((item) => item.product.id !== cartItem.product.id);
};

const clearCartItem = (cartItems, cartItem) => {
  return cartItems.filter((item) => item.product.id !== cartItem.product.id);
};

export function CartProvicer({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.product.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    setCartItems(newCartItems);
  };

  const removeItemFromCart = (cartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItem);
    setCartItems(newCartItems);
  };

  const clearItemFromCart = (cartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItem);
    setCartItems(newCartItems);
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    totalPrice,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
