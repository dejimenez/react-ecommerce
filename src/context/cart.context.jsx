import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPE = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_CART: "TOGGLE_CART",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }

    case CART_ACTION_TYPE.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    default:
      throw new Error(`Unhandled type ${type} on cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};

export function CartProvicer({ children }) {
  const [{ isCartOpen, cartItems, cartCount, totalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newTotalPrice = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.product.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        totalPrice: newTotalPrice,
      })
    );
  };

  const setIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPE.TOGGLE_CART));
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItem);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItem);
    updateCartItemsReducer(newCartItems);
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
