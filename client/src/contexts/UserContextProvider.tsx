import { useState, useMemo } from "react";
import UserContext, { User, Property, UserContextType } from "./UserContext";

export default function UserContextProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [properties, setProperties] = useState<Property[] | null>(null);

  const contextValue: UserContextType = useMemo(
    () => ({
      user,
      registerUser: (user: User) => {
        setUser(user);
      },
      unregisterUser: () => {
        setUser(null);
      },
      properties,
      registerProperties: (properties: Property[]) => {
        setProperties(properties);
      },
      unregisterProperties: () => {
        setProperties(null);
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
