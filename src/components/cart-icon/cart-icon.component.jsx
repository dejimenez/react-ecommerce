import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import { CartIconContainer, ShopinIcon, ItemCount } from "./cart-icon.styles";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShopinIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}
