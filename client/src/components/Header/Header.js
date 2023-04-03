import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import aptIcon from "../../assets/icons/apt-icon.png";
import houseIcon from "../../assets/icons/house-icon.png";
import petIcon from "../../assets/icons/pet-icon.png";
import userAvatar from "../../assets/images/placeholder-avatar.png";
import "./Header.scss";

export default function Header({ username }) {
  return (
    <header className="header">
      <div className="header__box">
        <NavLink to="/listings">
          <h1 className="header__subheader">InstaHome</h1>
        </NavLink>
        <nav className="navbar">
          <Button icon={houseIcon} emphasis="low-emphasis" />
          <Button icon={aptIcon} emphasis="low-emphasis" />
          <Button icon={petIcon} emphasis="low-emphasis" />
        </nav>
        {username ? (
          <NavLink className="header__profile-link" to="/profile">
            <img
              className="header__avatar"
              src={userAvatar}
              alt="user avatar"
            />
            <h3 className="header__body-large">{username}</h3>
          </NavLink>
        ) : (
          <div className="header__sign-buttons-box">
            <Button text="Login" emphasis="high-emphasis" />
            <Button text="Signup" emphasis="low-emphasis" />
          </div>
        )}
      </div>
    </header>
  );
}
