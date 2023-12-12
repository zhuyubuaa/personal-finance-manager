import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <div className="side-menu">
      <ul>
        <li>
          <Link to="/home"> Home</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
