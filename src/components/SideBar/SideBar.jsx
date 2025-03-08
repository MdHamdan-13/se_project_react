import avatar from "../../assets/avatar.png";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleProfileClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        src={currentUser?.avatar}
        alt={currentUser?.name}
        className="sidebar__image"
      />
      <p className="sidebar__username">{currentUser?.name}</p>

      <div className="sidebar__profile">
        {/* need to design the button */}
        <button
          type="button"
          onClick={handleProfileClick}
          className="sidebar__editprofile-btn"
        >
          Change profile data
        </button>
      </div>
    </div>
  );
}

export default SideBar;
