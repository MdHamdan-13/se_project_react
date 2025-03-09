import Avatar from "../Avatar/Avatar";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleProfileClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <Avatar avatar={currentUser.avatar} name={currentUser.name} />
      <p className="sidebar__username">{currentUser?.name}</p>

      <div className="sidebar__profile">
        <button
          type="button"
          onClick={handleProfileClick}
          className="sidebar__editprofile-btn"
        >
          Change profile data
        </button>

        <button className="sidebar__logout" type="button">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
