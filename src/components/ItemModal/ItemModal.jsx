import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, item, closeModal, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = item.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <img src={item.imageUrl} alt={item.name} className="modal__image" />
        <div className="modal__context">
          <h2 className="modal__caption">{item.name}</h2>
          <p className="modal__weather">Weather: {item.weather}</p>
        </div>

        {isOwn && (
          <button
            className="modal__delete-btn"
            type="button"
            onClick={() => onDeleteItem(item._id)}
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
