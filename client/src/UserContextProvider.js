import { useState, useMemo } from "react";
import UserContext from "./UserContext";

export default function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState(null);

  const contextValue = useMemo(
    () => ({
      user,
      registerUser: (user) => {
        setUser(user);
      },
      unregisterUser: () => {
        setUser(null);
      },
      properties,
      registerProperties: (properties) => {
        setProperties(properties);
      },
      unregisterProperties: (properties) => {
        setProperties(properties);
      },
    }),
    [user, properties]
  );
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}
