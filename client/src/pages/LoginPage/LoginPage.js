import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import placeholderAvatar from "../../assets/images/placeholder-avatar.png";
import FormInput from "../../components/FormInput/FormInput";
import UserContext from "../../contexts/UserContext";
import "./LoginPage.scss";
import { validateUser } from "../../utils/validateUser";

export default function LoginPage() {
  const { registerUser, registerProperties } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await axios.post(
        `http://localhost:8080/api/users/login`,
        inputValues
      );

      if (!user.data.token) return alert("Invalid user");

      sessionStorage.setItem("token", user.data.token);

      const fulfilled = await validateUser(registerUser, registerProperties);
      if (!fulfilled) return alert("Login failed. Try again");

      navigate("/listings");
    } catch (err) {
      console.error(`Could not find user. Error: ${err}`);
    }
  };

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleOnSubmit}>
        <div className="login__image-box">
          <img
            className="login__image"
            src={placeholderAvatar}
            alt="user avatar"
          />
        </div>
        <h2 className="login__page-header">Welcome to your place!</h2>
        <FormInput
          label="Email:"
          name="email"
          type="email"
          value={inputValues.email}
          handleOnChange={handleOnChange}
        />
        <FormInput
          label="Password:"
          name="password"
          type="password"
          value={inputValues.password}
          handleOnChange={handleOnChange}
        />
        <Button emphasis="high-emphasis" text="LOGIN" type="submit" />
      </form>
    </main>
  );
}
