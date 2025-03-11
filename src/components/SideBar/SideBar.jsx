import Avatar from "../Avatar/Avatar";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        {/* added ? */}
        <Avatar avatar={currentUser.avatar} name={currentUser.name} />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <div className="sidebar__profile">
        <button
          type="button"
          onClick={handleProfileClick}
          className="sidebar__editprofile-btn"
        >
          Change profile data
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="sidebar__logout"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
