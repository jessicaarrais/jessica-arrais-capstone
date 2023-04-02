import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header({ username }) {
  console.log(username);
  return (
    <header className="header">
      <div className="header__box">
        <NavLink to="/listings">
          <h1>InstaHome</h1>
        </NavLink>
        <nav>I am a navbar</nav>
        <NavLink to="/profile">
          <h3>{username}</h3>
        </NavLink>
      </div>
    </header>
  );
}
