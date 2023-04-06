import { useState, useMemo } from "react";
import PropertiesContext from "./PropertiesContext";

export default function PropertiesContextProvider(props) {
  const [allProperties, setAllProperties] = useState(null);

  const contextValue = useMemo(
    () => ({
      allProperties,
      registerAllProperties: (properties) => {
        setAllProperties(properties);
      },
      unregisterAllProperties: () => {
        setAllProperties(null);
      },
    }),
    [allProperties]
  );

  return (
    <PropertiesContext.Provider value={contextValue}>
      {props.children}
    </PropertiesContext.Provider>
  );
}
