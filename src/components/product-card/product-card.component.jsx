import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCartContainer,
  Footer,
  Price,
  Name,
} from "./product-card.styles.jsx";

export default function ProductCard({ product }) {
  const { addItemToCart } = useContext(CartContext);

  const { name, price, imageUrl } = product;

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => addItemToCart(product)}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
}
