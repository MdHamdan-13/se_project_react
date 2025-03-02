import "./ModalWithForm.css";
import { Link } from "react-router-dom";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  closeModal,
  onSubmit,
  hasLink,
  linkContent,
  linkHref,
  onClick,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          <div>
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            {hasLink && (
              <button
                type="button"
                onClick={onClick}
                className="modal__secondary-btn"
              >
                {linkContent}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
