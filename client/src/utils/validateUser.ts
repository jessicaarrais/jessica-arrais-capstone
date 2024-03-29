import axios from "axios";
import { Property, User } from "../contexts/UserContext";

export const validateUser = async (registerUser: (user: User) => void, registerProperties: (properties: Property[]) => void) => {
  try {
    const currentUser = await axios.get(
      `http://localhost:8080/api/users/currentUser`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    const user = await axios.get(
      `http://localhost:8080/api/users/${currentUser.data.id}`
    );

    /* user.data = [{ user }, { property if any }] */
    registerUser(user.data[0]);
    if (user.data.length > 1) {
      registerProperties(user.data.slice(1));
    }
    return true;
  } catch (err) {
    console.error("Invalid user or no user logged");
  }
};
