import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import placeholderAvatar from "../../assets/images/placeholder-avatar.png";
import FormInput from "../../components/FormInput/FormInput";
import UserContext from "../../UserContext";
import "./SignupPage.scss";

export default function LoginPage() {
  const { signup } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    has_privileges: false, //TODO: apply option on form
  });
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToken = await axios.post(
        `http://localhost:8080/api/users/signup`,
        inputValues
      );

      if (!userToken.data.token) return alert("Invalid user");

      sessionStorage.setItem("token", userToken.data.token);
      const currentUser = await axios.get(
        `http://localhost:8080/api/users/currentUser`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const userData = await axios.get(
        `http://localhost:8080/api/users/${currentUser.data.id}`
      );

      /* userData.data = [{ user }, { property if any }] */
      signup(userData.data[0]);
      navigate("/");
    } catch (err) {
      console.error(`Could not find user. Error: ${err}`);
    }
  };

  return (
    <main className="signup">
      <form className="signup__form" onSubmit={handleOnSubmit}>
        <h2 className="signup__page-header">Create an account!</h2>
        <FormInput
          label="Username:"
          name="username"
          type="text"
          value={inputValues.username}
          handleOnChange={handleOnChange}
        />
        <FormInput
          label="First Name:"
          name="first_name"
          type="text"
          value={inputValues.first_name}
          handleOnChange={handleOnChange}
        />
        <FormInput
          label="Last Name:"
          name="last_name"
          type="text"
          value={inputValues.last_name}
          handleOnChange={handleOnChange}
        />
        <FormInput
          label="Phone Number:"
          name="phone"
          type="tel"
          value={inputValues.phone}
          handleOnChange={handleOnChange}
        />
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
        <FormInput
          label="Confirm Password:"
          name="confirm_password"
          type="password"
          // value={confirmPassword}
          // handleOnChange={handleOnChange}
        />
        {/* <input type="radio" /> */}
        <Button emphasis="high-emphasis" text="LOGIN" type="submit" />
      </form>
    </main>
  );
}
