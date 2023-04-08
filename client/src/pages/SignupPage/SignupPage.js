import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../utils/validateUser";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import UserContext from "../../contexts/UserContext";
import "./SignupPage.scss";

export default function LoginPage() {
  const { registerUser, registerProperties } = useContext(UserContext);
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
    let userToken;
    e.preventDefault();
    try {
      userToken = await axios.post(
        `http://localhost:8080/api/users/signup`,
        inputValues
      );

      sessionStorage.setItem("token", userToken.data.token);

      await validateUser(registerUser, registerProperties);

      navigate("/");
    } catch (err) {
      if (!userToken?.data?.token) return alert("Failed signing up");
      console.error(`Failed signing up. Error: ${err}`);
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
        {/* <FormInput
          label="Confirm Password:"
          name="confirm_password"
          type="password"
          value={confirmPassword}
          handleOnChange={handleOnChange}
        /> */}
        <Button emphasis="high-emphasis" text="LOGIN" type="submit" />
      </form>
    </main>
  );
}
