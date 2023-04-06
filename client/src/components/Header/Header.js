import {
  NavLink,
  useNavigate,
  createSearchParams,
  useParams,
} from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import logo from "../../assets/logos/logo.png";
import aptIcon from "../../assets/icons/apt-icon.png";
import houseIcon from "../../assets/icons/house-icon.png";
import petIcon from "../../assets/icons/pet-icon.png";
import userAvatar from "../../assets/images/placeholder-avatar.png";
import "./Header.scss";
import { useEffect, useState } from "react";

export default function Header({ username }) {
  const navigate = useNavigate();
  const [params, setParams] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const searchResult = await axios.get(
        `http://localhost:8080/api/properties/filter?${params}`
      );
    };

    fetch();
  }, [params]);

  const handleOnClick = (query, value) => {
    const searchParams = createSearchParams(params);

    if (params.includes(query)) searchParams.delete(query);
    else searchParams.append(query, value);

    setParams(searchParams.toString());

    navigate({
      pathname: "listings",
      search: searchParams.toString(),
    });
  };

  return (
    <header className="header">
      <div className="header__box">
        <NavLink to="/listings">
          <img className="header__logo" src={logo} alt="instahome logo" />
        </NavLink>
        <nav className="navbar">
          <Button
            icon={houseIcon}
            emphasis="low-emphasis"
            handleOnClick={() => handleOnClick("type1", "house")}
          />
          <Button
            icon={aptIcon}
            emphasis="low-emphasis"
            handleOnClick={() => handleOnClick("type2", "apartment")}
          />
          <Button
            icon={petIcon}
            emphasis="low-emphasis"
            handleOnClick={() => handleOnClick("pets", "allowed")}
          />
          <Button
            emphasis="low-emphasis"
            text="Clear"
            handleOnClick={() => navigate("/listings")}
          />
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
      </div>
    </header>
  );
}
