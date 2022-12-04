import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.style";
import { useNavigate } from "react-router-dom"

export default function DirectoryItem({ id, title, imageUrl, route }) {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
