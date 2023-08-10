import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Button from "../Button/Button";
import logo from "../../assets/logos/logo.png";
import userAvatar from "../../assets/images/placeholder-avatar.png";
import "./Header.scss";

export default function Header({ username }: { username: string | undefined}) {
  const currentUserContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    currentUserContext?.unregisterUser();
    currentUserContext?.unregisterProperties();
    navigate("/listings");
  };

  return (
    <header className="header">
      <nav className="header__box">
        <NavLink to="/listings">
          <img className="header__logo" src={logo} alt="instahome logo" />
        </NavLink>
        {username ? (
          <div className="header__user-info">
            <NavLink className="header__profile-link" to="/profile">
              <img
                className="header__avatar"
                src={userAvatar}
                alt="user avatar"
              />
              <h3 className="header__body-large">{username}</h3>
            </NavLink>
            <Button
              text="Logout"
              emphasis="link-emphasis"
              handleOnClick={handleLogout}
            />
          </div>
        ) : (
          <div className="header__sign-buttons-box">
            <Button
              text="Login"
              emphasis="high-emphasis"
              handleOnClick={() => navigate("/login")}
            />
            <Button
              text="Signup"
              emphasis="low-emphasis"
              handleOnClick={() => navigate("/signup")}
            />
          </div>
        )}
      </nav>
    </header>
  );
}
