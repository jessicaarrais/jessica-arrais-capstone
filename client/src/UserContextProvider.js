import { useState, useMemo } from "react";
import UserContext from "./UserContext";

export default function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const contextValue = useMemo(
    () => ({
      user,
      login: (user) => {
        setUser(user);
      },
      signup: (user) => {
        setUser(user);
      },
      logout: () => {
        setUser(null);
      },
    }),
    [user]
  );
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
