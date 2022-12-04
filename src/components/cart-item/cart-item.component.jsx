import {
  CartItemContainer,
  ItemDetails,
  Name,
  Image,
} from "./cart-item.styles";

export default function CartItem({ cartItem }) {
  const {
    product: { name, imageUrl, price },
    quantity,
  } = cartItem;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}
