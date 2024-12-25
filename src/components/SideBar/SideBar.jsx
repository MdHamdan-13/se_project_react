import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Profile Picture" className="sidebar__image" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}

export default SideBar;
