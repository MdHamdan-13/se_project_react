import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);
  // const itemLikeButtonClassName = `card__liked-btn ${
  //   isLiked ? "" : "card__like-btn"
  // }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      <button
        className={`card__like-btn ${isLiked ? "liked" : ""}`}
        onClick={handleLike}
      ></button>
    </li>
  );
}

export default ItemCard;
