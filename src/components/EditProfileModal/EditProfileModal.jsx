import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, closeModal, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  const [profileData, setProfileData] = useState({
    name: currentUser?.name,
    avatar: currentUser?.avatar,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(profileData);
    handleEditProfile(profileData);
  };

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser?.name,
        avatar: currentUser?.avatar,
      });
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={"Save changes"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeModal={closeModal}
    >
      <label htmlFor="name-2" className="modal__label">
        Name*{" "}
        <input
          type="text"
          id="name-2"
          name="name"
          className="modal__input"
          value={profileData.name || ""}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>

      <label htmlFor="avatar-2" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          id="avatar-2"
          name="avatar"
          className="modal__input"
          value={profileData.avatar || ""}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
