import "./ItemModal.css";

function ItemModal({ activeModal, item, closeModal, onDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={closeModal} type="button" className="modal__close">
          {/* Close */}
        </button>
        <img src={item.imageUrl} alt={item.name} className="modal__image" />
        <div className="modal__context">
          <h2 className="modal__caption">{item.name}</h2>
          <p className="modal__weather">Weather: {item.weather}</p>
        </div>
        <button
          className="modal__delete-btn"
          type="button"
          onClick={() => onDeleteItem(item._id)}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
